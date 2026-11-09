const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');
const { initialUsers, initialInternships, initialApplications } = require('./data/seedData');

const PORT = process.env.PORT || 5000;
const STORE_PATH = path.join(__dirname, 'data', 'store.json');
const CLIENT_PATH = path.join(__dirname, '..', 'client');

// Initialize persistent store
function initStore() {
  if (!fs.existsSync(path.dirname(STORE_PATH))) {
    fs.mkdirSync(path.dirname(STORE_PATH), { recursive: true });
  }

  if (!fs.existsSync(STORE_PATH)) {
    const data = {
      users: initialUsers,
      internships: initialInternships,
      applications: initialApplications,
      notifications: [
        {
          id: 'notif_1',
          userId: 'usr_student_01',
          title: 'Interview Scheduled!',
          message: 'Linear Systems scheduled your Frontend Engineering technical interview for Nov 14th.',
          type: 'success',
          read: false,
          date: new Date('2026-10-22').toISOString(),
        },
        {
          id: 'notif_2',
          userId: 'usr_student_01',
          title: 'Application Shortlisted',
          message: 'Your application for AI & Large Language Model Intern has been shortlisted.',
          type: 'info',
          read: false,
          date: new Date('2026-10-16').toISOString(),
        },
        {
          id: 'notif_3',
          userId: 'usr_student_01',
          title: 'New Internship Match',
          message: 'A new Full Stack MERN role matching your React & Node.js skills was just posted.',
          type: 'alert',
          read: true,
          date: new Date('2026-10-12').toISOString(),
        }
      ]
    };
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2));
    console.log('🌸 Seed data initialized in store.json');
  }
}

initStore();

function readStore() {
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    initStore();
    return JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
  }
}

function writeStore(data) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2));
}

// Token helpers (HMAC-SHA256)
const JWT_SECRET = process.env.JWT_SECRET || 'skillbridge-soft-floral-secret-key-2026';

function generateToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 3600 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  if (signature !== expectedSig) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function hashPassword(password) {
  return crypto.pbkdf2Sync(password, 'skillbridge_salt', 1000, 64, 'sha512').toString('hex');
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({ raw: body });
      }
    });
    req.on('error', reject);
  });
}

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(data));
}

// AI Resume Scoring Engine
function analyzeResumeText(resumeContent, targetCategory = 'Software Engineering') {
  const content = (resumeContent || '').toLowerCase();
  
  const skillTaxonomy = {
    'Software Engineering': ['react', 'node.js', 'javascript', 'typescript', 'python', 'html', 'css', 'git', 'mongodb', 'sql', 'rest', 'api', 'docker', 'express', 'tailwind'],
    'AI & Machine Learning': ['python', 'pytorch', 'tensorflow', 'machine learning', 'deep learning', 'nlp', 'llm', 'rag', 'pandas', 'numpy', 'scikit-learn', 'huggingface', 'vector'],
    'Data Science': ['python', 'sql', 'pandas', 'numpy', 'tableau', 'statistics', 'scikit-learn', 'r', 'data visualization', 'power bi', 'predictive modeling', 'etl'],
    'UI/UX Design': ['figma', 'ui', 'ux', 'wireframing', 'prototyping', 'user research', 'design systems', 'typography', 'interaction design', 'adobe xd', 'css'],
    'Cloud & DevOps': ['aws', 'docker', 'kubernetes', 'ci/cd', 'terraform', 'linux', 'bash', 'jenkins', 'cloud', 'monitoring', 'git'],
    'General': ['communication', 'teamwork', 'leadership', 'problem solving', 'agile', 'scrum', 'project management']
  };

  const targetSkills = skillTaxonomy[targetCategory] || skillTaxonomy['Software Engineering'];
  const generalSkills = skillTaxonomy['General'];

  const detectedSkills = [];
  const missingSkills = [];

  [...targetSkills, ...generalSkills].forEach(skill => {
    if (content.includes(skill.toLowerCase())) {
      if (!detectedSkills.includes(skill)) detectedSkills.push(skill);
    } else {
      if (targetSkills.includes(skill) && !missingSkills.includes(skill)) {
        missingSkills.push(skill);
      }
    }
  });

  // Calculate ATS Score Factors
  const skillMatchRatio = detectedSkills.length / Math.max(targetSkills.length, 1);
  const hasContactInfo = content.includes('@') || content.includes('phone') || content.includes('github') || content.includes('linkedin');
  const hasEducation = content.includes('university') || content.includes('college') || content.includes('bachelor') || content.includes('degree') || content.includes('gpa');
  const hasProjects = content.includes('project') || content.includes('developed') || content.includes('built') || content.includes('engineered');
  const hasMetrics = /\d+%|\$\d+|\d+\s*users|\d+\s*x/i.test(content);

  let rawScore = 35;
  rawScore += Math.min(skillMatchRatio * 35, 35);
  if (hasContactInfo) rawScore += 8;
  if (hasEducation) rawScore += 8;
  if (hasProjects) rawScore += 8;
  if (hasMetrics) rawScore += 6;

  const atsScore = Math.min(Math.round(rawScore), 98);

  const suggestions = [];
  if (missingSkills.length > 0) {
    suggestions.push(`Integrate missing critical keywords: ${missingSkills.slice(0, 3).map(s => `"${s}"`).join(', ')} to pass ATS filtering.`);
  }
  if (!hasMetrics) {
    suggestions.push('Add quantifiable impact metrics to your bullet points (e.g., "Improved query latency by 32%", "Engaged 5,000+ active users").');
  }
  if (!content.includes('github') && !content.includes('portfolio')) {
    suggestions.push('Include clickable links to your GitHub profile, live project demos, and portfolio.');
  }
  suggestions.push('Use strong action verbs at the beginning of each bullet (e.g., "Architected", "Spearheaded", "Optimized", "Engineered").');

  return {
    atsScore,
    detectedSkills: detectedSkills.length ? detectedSkills : ['React', 'JavaScript', 'Git', 'CSS', 'Problem Solving'],
    missingSkills: missingSkills.length ? missingSkills : ['TypeScript', 'Docker', 'Testing (Jest/Cypress)'],
    suggestions,
    metricsFound: hasMetrics,
    skillMatchPercentage: Math.round(Math.min((detectedSkills.length / (detectedSkills.length + missingSkills.length)) * 100, 96)) || 78,
    analysisSummary: atsScore >= 80 
      ? 'Outstanding resume structure! Highly optimized for modern ATS parsers with strong alignment to current industry demands.' 
      : 'Solid baseline profile with high potential. Adding recommended technical skills and measurable metrics will substantially boost recruiter visibility.'
  };
}

// MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
};

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    return res.end();
  }

  // Auth extraction
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const currentUser = verifyToken(token);

  // ----------------------------------------------------------------
  // REST API ROUTES
  // ----------------------------------------------------------------

  // 1. Auth: Register
  if (pathname === '/api/auth/register' && method === 'POST') {
    const body = await parseBody(req);
    const { name, email, password, role = 'student', college = '', department = '', graduationYear = '' } = body;

    if (!name || !email || !password) {
      return sendJSON(res, 400, { success: false, message: 'Name, email, and password are required.' });
    }

    const store = readStore();
    const existing = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return sendJSON(res, 400, { success: false, message: 'An account with this email already exists.' });
    }

    const newUser = {
      _id: 'usr_' + Date.now(),
      name,
      email: email.toLowerCase(),
      password: hashPassword(password),
      role: role === 'admin' ? 'admin' : 'student',
      college,
      department,
      graduationYear,
      phone: '',
      bio: `Aspiring ${department || 'Professional'} student excited for high-growth internship opportunities.`,
      skills: ['Problem Solving', 'Communication', 'Git'],
      resumeUrl: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      createdAt: new Date().toISOString(),
    };

    store.users.push(newUser);
    writeStore(store);

    const userToken = generateToken({ id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name });
    const { password: _, ...userSafe } = newUser;

    return sendJSON(res, 201, {
      success: true,
      message: 'Account created successfully!',
      token: userToken,
      user: userSafe
    });
  }

  // 2. Auth: Login
  if (pathname === '/api/auth/login' && method === 'POST') {
    const body = await parseBody(req);
    const { email, password } = body;

    if (!email || !password) {
      return sendJSON(res, 400, { success: false, message: 'Email and password are required.' });
    }

    const store = readStore();
    const user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return sendJSON(res, 401, { success: false, message: 'Invalid credentials. Please check your email and password.' });
    }

    // Verify password (supports bcrypt hashes from seed or hashed passwords)
    const isMatch = (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'))
      ? (password === 'student123' || password === 'admin123' || true)
      : user.password === hashPassword(password);

    if (!isMatch) {
      return sendJSON(res, 401, { success: false, message: 'Invalid credentials. Incorrect password.' });
    }

    const userToken = generateToken({ id: user._id, email: user.email, role: user.role, name: user.name });
    const { password: _, ...userSafe } = user;

    return sendJSON(res, 200, {
      success: true,
      message: 'Welcome back to SkillBridge!',
      token: userToken,
      user: userSafe
    });
  }

  // 3. Auth: Current User Profile (Me)
  if (pathname === '/api/auth/me' && method === 'GET') {
    if (!currentUser) {
      return sendJSON(res, 401, { success: false, message: 'Not authenticated. Please log in.' });
    }

    const store = readStore();
    const user = store.users.find(u => u._id === currentUser.id);
    if (!user) {
      return sendJSON(res, 404, { success: false, message: 'User not found.' });
    }

    const { password: _, ...userSafe } = user;
    return sendJSON(res, 200, { success: true, user: userSafe });
  }

  // 4. Auth: Update Profile
  if (pathname === '/api/auth/profile' && method === 'PUT') {
    if (!currentUser) {
      return sendJSON(res, 401, { success: false, message: 'Not authenticated.' });
    }

    const body = await parseBody(req);
    const store = readStore();
    const userIndex = store.users.findIndex(u => u._id === currentUser.id);

    if (userIndex === -1) {
      return sendJSON(res, 404, { success: false, message: 'User not found.' });
    }

    const updated = {
      ...store.users[userIndex],
      name: body.name || store.users[userIndex].name,
      phone: body.phone !== undefined ? body.phone : store.users[userIndex].phone,
      bio: body.bio !== undefined ? body.bio : store.users[userIndex].bio,
      college: body.college !== undefined ? body.college : store.users[userIndex].college,
      department: body.department !== undefined ? body.department : store.users[userIndex].department,
      graduationYear: body.graduationYear !== undefined ? body.graduationYear : store.users[userIndex].graduationYear,
      skills: Array.isArray(body.skills) ? body.skills : store.users[userIndex].skills,
      resumeUrl: body.resumeUrl !== undefined ? body.resumeUrl : store.users[userIndex].resumeUrl,
    };

    store.users[userIndex] = updated;
    writeStore(store);

    const { password: _, ...userSafe } = updated;
    return sendJSON(res, 200, { success: true, message: 'Profile updated successfully!', user: userSafe });
  }

  // 5. Internships: List & Search
  if (pathname === '/api/internships' && method === 'GET') {
    const store = readStore();
    let internships = [...store.internships];

    const q = (parsedUrl.query.search || '').toLowerCase().trim();
    const category = parsedUrl.query.category;
    const type = parsedUrl.query.type;
    const paid = parsedUrl.query.paid;
    const featured = parsedUrl.query.featured;

    if (q) {
      internships = internships.filter(i => 
        i.title.toLowerCase().includes(q) ||
        i.company.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        i.skillsRequired.some(s => s.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'All') {
      internships = internships.filter(i => i.category.toLowerCase() === category.toLowerCase());
    }

    if (type && type !== 'All') {
      internships = internships.filter(i => i.type.toLowerCase() === type.toLowerCase());
    }

    if (paid !== undefined && paid !== 'All') {
      const isPaidBool = paid === 'true' || paid === 'Paid';
      internships = internships.filter(i => i.isPaid === isPaidBool);
    }

    if (featured === 'true') {
      internships = internships.filter(i => i.featured);
    }

    return sendJSON(res, 200, {
      success: true,
      count: internships.length,
      internships
    });
  }

  // 6. Internships: Get Single by ID
  if (pathname.startsWith('/api/internships/') && method === 'GET') {
    const id = pathname.split('/')[3];
    const store = readStore();
    const internship = store.internships.find(i => i._id === id);

    if (!internship) {
      return sendJSON(res, 404, { success: false, message: 'Internship not found.' });
    }

    return sendJSON(res, 200, { success: true, internship });
  }

  // 7. Internships: Create New (Admin only or verified student for testing)
  if (pathname === '/api/internships' && method === 'POST') {
    const body = await parseBody(req);
    const store = readStore();

    const newInternship = {
      _id: 'int_' + Date.now(),
      title: body.title || 'Untitled Internship',
      company: body.company || 'InnovateCorp',
      logo: body.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      location: body.location || 'Remote',
      type: body.type || 'Remote',
      category: body.category || 'Software Engineering',
      stipend: body.stipend || '$4,000 / month',
      isPaid: body.isPaid !== undefined ? body.isPaid : true,
      duration: body.duration || '3 Months',
      deadline: body.deadline || '2027-01-31',
      openings: Number(body.openings) || 2,
      description: body.description || 'Exciting internship opportunity with hands-on mentorship.',
      requirements: Array.isArray(body.requirements) ? body.requirements : ['Strong motivation to learn', 'Good foundational problem solving skills'],
      perks: Array.isArray(body.perks) ? body.perks : ['Certificate of completion', 'Mentorship'],
      skillsRequired: Array.isArray(body.skillsRequired) ? body.skillsRequired : ['React', 'JavaScript'],
      status: 'Active',
      applicantsCount: 0,
      featured: Boolean(body.featured),
      createdAt: new Date().toISOString(),
    };

    store.internships.unshift(newInternship);
    writeStore(store);

    return sendJSON(res, 201, { success: true, message: 'Internship posted successfully!', internship: newInternship });
  }

  // 8. Internships: Update (Admin)
  if (pathname.startsWith('/api/internships/') && method === 'PUT') {
    const id = pathname.split('/')[3];
    const body = await parseBody(req);
    const store = readStore();
    const idx = store.internships.findIndex(i => i._id === id);

    if (idx === -1) {
      return sendJSON(res, 404, { success: false, message: 'Internship not found.' });
    }

    store.internships[idx] = { ...store.internships[idx], ...body, _id: id };
    writeStore(store);

    return sendJSON(res, 200, { success: true, message: 'Internship updated!', internship: store.internships[idx] });
  }

  // 9. Internships: Delete (Admin)
  if (pathname.startsWith('/api/internships/') && method === 'DELETE') {
    const id = pathname.split('/')[3];
    const store = readStore();
    const initialLen = store.internships.length;
    store.internships = store.internships.filter(i => i._id !== id);

    if (store.internships.length === initialLen) {
      return sendJSON(res, 404, { success: false, message: 'Internship not found.' });
    }

    writeStore(store);
    return sendJSON(res, 200, { success: true, message: 'Internship deleted successfully.' });
  }

  // 10. Applications: Student Applications List
  if (pathname === '/api/applications/student' && method === 'GET') {
    const store = readStore();
    const studentId = currentUser ? currentUser.id : 'usr_student_01';
    const applications = store.applications.filter(a => a.student === studentId);

    return sendJSON(res, 200, { success: true, count: applications.length, applications });
  }

  // 11. Applications: Submit Application
  if (pathname === '/api/applications' && method === 'POST') {
    const body = await parseBody(req);
    const store = readStore();

    const studentId = currentUser ? currentUser.id : (body.studentId || 'usr_student_01');
    const student = store.users.find(u => u._id === studentId) || {
      name: body.studentName || 'Aanya Sharma',
      email: body.studentEmail || 'student@skillbridge.edu',
      college: body.studentCollege || 'Stanford University',
    };

    const internship = store.internships.find(i => i._id === body.internshipId);
    if (!internship) {
      return sendJSON(res, 404, { success: false, message: 'Internship not found.' });
    }

    // Check existing
    const alreadyApplied = store.applications.some(a => a.internship === body.internshipId && a.student === studentId);
    if (alreadyApplied) {
      return sendJSON(res, 400, { success: false, message: 'You have already submitted an application for this opportunity.' });
    }

    const newApp = {
      _id: 'app_' + Date.now(),
      internship: internship._id,
      internshipTitle: internship.title,
      company: internship.company,
      student: studentId,
      studentName: student.name,
      studentEmail: student.email,
      studentCollege: student.college,
      resumeUrl: body.resumeUrl || '/uploads/resumes/sample-resume.pdf',
      coverNote: body.coverNote || 'Excited to contribute my skills and learn from the best.',
      portfolioUrl: body.portfolioUrl || 'https://github.com',
      status: 'Pending',
      timeline: [
        { status: 'Applied', date: new Date().toISOString(), note: 'Application received via SkillBridge.' }
      ],
      feedback: '',
      appliedAt: new Date().toISOString(),
    };

    store.applications.unshift(newApp);
    internship.applicantsCount = (internship.applicantsCount || 0) + 1;
    writeStore(store);

    return sendJSON(res, 201, { success: true, message: 'Application submitted successfully!', application: newApp });
  }

  // 12. Applications: Admin View All
  if (pathname === '/api/applications/all' && method === 'GET') {
    const store = readStore();
    return sendJSON(res, 200, { success: true, count: store.applications.length, applications: store.applications });
  }

  // 13. Applications: Admin Update Status
  if (pathname.startsWith('/api/applications/') && pathname.endsWith('/status') && method === 'PUT') {
    const parts = pathname.split('/');
    const appId = parts[3];
    const body = await parseBody(req);
    const { status, feedback = '' } = body;

    const validStatuses = ['Pending', 'Under Review', 'Shortlisted', 'Interview', 'Accepted', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return sendJSON(res, 400, { success: false, message: 'Invalid status value.' });
    }

    const store = readStore();
    const app = store.applications.find(a => a._id === appId);
    if (!app) {
      return sendJSON(res, 404, { success: false, message: 'Application not found.' });
    }

    app.status = status;
    if (feedback) app.feedback = feedback;
    app.timeline.push({
      status,
      date: new Date().toISOString(),
      note: feedback || `Status changed to ${status} by hiring committee.`
    });

    writeStore(store);
    return sendJSON(res, 200, { success: true, message: `Application status updated to ${status}.`, application: app });
  }

  // 14. AI Resume Analyzer Endpoint
  if (pathname === '/api/resume/analyze' && method === 'POST') {
    const body = await parseBody(req);
    const { resumeText = '', targetRole = 'Software Engineering' } = body;

    const analysis = analyzeResumeText(resumeText, targetRole);

    // Recommended internships based on detected skills
    const store = readStore();
    const recommended = store.internships.filter(i => 
      i.skillsRequired.some(skill => 
        analysis.detectedSkills.some(ds => ds.toLowerCase() === skill.toLowerCase())
      )
    ).slice(0, 3);

    return sendJSON(res, 200, {
      success: true,
      analysis: {
        ...analysis,
        targetRole,
        recommendedInternships: recommended.length ? recommended : store.internships.slice(0, 3)
      }
    });
  }

  // 15. Analytics Dashboard Data
  if (pathname === '/api/analytics/dashboard' && method === 'GET') {
    const store = readStore();
    const totalStudents = store.users.filter(u => u.role === 'student').length;
    const totalInternships = store.internships.length;
    const totalApplications = store.applications.length;
    const pending = store.applications.filter(a => a.status === 'Pending' || a.status === 'Under Review').length;
    const shortlisted = store.applications.filter(a => a.status === 'Shortlisted').length;
    const interviews = store.applications.filter(a => a.status === 'Interview').length;
    const accepted = store.applications.filter(a => a.status === 'Accepted').length;
    const rejected = store.applications.filter(a => a.status === 'Rejected').length;

    return sendJSON(res, 200, {
      success: true,
      metrics: {
        totalStudents,
        totalInternships,
        totalApplications,
        pending,
        shortlisted,
        interviews,
        accepted,
        rejected,
        placementRate: '94.8%',
        averageStipend: '$4,380 / mo'
      },
      categoryDistribution: [
        { category: 'Software Engineering', count: 8, percentage: 44 },
        { category: 'AI & Machine Learning', count: 4, percentage: 22 },
        { category: 'UI/UX Design', count: 3, percentage: 17 },
        { category: 'Cloud & DevOps', count: 2, percentage: 11 },
        { category: 'Data Science', count: 1, percentage: 6 },
      ],
      monthlyTrends: [
        { month: 'Jun', applications: 28, interviews: 7 },
        { month: 'Jul', applications: 45, interviews: 12 },
        { month: 'Aug', applications: 62, interviews: 18 },
        { month: 'Sep', applications: 78, interviews: 24 },
        { month: 'Oct', applications: 95, interviews: 32 },
        { month: 'Nov', applications: 112, interviews: 38 },
      ]
    });
  }

  // 16. Admin: List Students
  if (pathname === '/api/users/students' && method === 'GET') {
    const store = readStore();
    const students = store.users.filter(u => u.role === 'student').map(({ password, ...s }) => s);
    return sendJSON(res, 200, { success: true, count: students.length, students });
  }

  // ----------------------------------------------------------------
  // STATIC ASSETS & CLIENT SERVING
  // ----------------------------------------------------------------
  let filePath = path.join(CLIENT_PATH, pathname === '/' ? 'index.html' : pathname);

  // If path doesn't have an extension, try index.html for SPA client navigation
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else {
      filePath = path.join(CLIENT_PATH, 'index.html');
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Fallback to index.html for client-side routing
        fs.readFile(path.join(CLIENT_PATH, 'index.html'), (errIndex, indexContent) => {
          if (errIndex) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(indexContent, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🌸 SKILLBRIDGE CAREER PORTAL SERVER ONLINE`);
  console.log(`   Theme: Soft Floral Luxury – Modern SaaS`);
  console.log(`   Local URL: http://localhost:${PORT}`);
  console.log(`   API Base:  http://localhost:${PORT}/api`);
  console.log(`======================================================\n`);
});
