// Global Reactive Store for SkillBridge

const LOCAL_STORAGE_KEY = 'skillbridge_state_v1';
const THEME_STORAGE_KEY = 'skillbridge_theme';

const initialInternshipsData = [
  {
    _id: 'int_01',
    title: 'Frontend Engineering Intern',
    company: 'Linear Systems',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    location: 'San Francisco, CA',
    type: 'Hybrid',
    category: 'Software Engineering',
    stipend: '$4,500 / month',
    isPaid: true,
    duration: '6 Months',
    deadline: '2026-12-15',
    openings: 3,
    description: 'Join our design-focused engineering team to architect hyper-responsive user interfaces with React, TypeScript, and micro-interactions.',
    requirements: [
      'Strong proficiency in modern React (Hooks, Context, Concurrent Mode)',
      'Solid command of TypeScript and CSS architecture (Tailwind CSS, CSS-in-JS)',
      'Understanding of component accessibility (WCAG 2.1 AA standards)',
      'Experience with REST APIs and state management libraries'
    ],
    perks: [
      'Full equipment stipend ($1,500)',
      '1-on-1 mentorship from Senior Principal Engineers',
      'Flexible remote/hybrid scheduling',
      'Certificate of Excellence & PPO consideration'
    ],
    skillsRequired: ['React', 'TypeScript', 'Tailwind CSS', 'Git', 'REST APIs'],
    status: 'Active',
    applicantsCount: 28,
    featured: true,
    createdAt: '2026-10-01'
  },
  {
    _id: 'int_02',
    title: 'AI & Large Language Model Intern',
    company: 'CognitiveCore AI',
    logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=150&q=80',
    location: 'Remote (Global)',
    type: 'Remote',
    category: 'AI & Machine Learning',
    stipend: '$5,200 / month',
    isPaid: true,
    duration: '4 Months',
    deadline: '2026-12-20',
    openings: 2,
    description: 'Work on cutting-edge agentic workflows, prompt distillation, and fine-tuning open-weights models for high-throughput enterprise pipelines.',
    requirements: [
      'Proficiency in Python and deep learning frameworks (PyTorch, HuggingFace)',
      'Hands-on experience with Retrieval-Augmented Generation (RAG) and vector stores',
      'Familiarity with LangChain, LlamaIndex, or native agentic SDKs',
      'Strong mathematical foundation in linear algebra and probability'
    ],
    perks: [
      'Cloud compute budget ($5,000 GPU credits)',
      'Co-authorship on research publications',
      'High-impact real-world production deployments'
    ],
    skillsRequired: ['Python', 'PyTorch', 'HuggingFace', 'LLMs', 'Vector DBs'],
    status: 'Active',
    applicantsCount: 45,
    featured: true,
    createdAt: '2026-10-05'
  },
  {
    _id: 'int_03',
    title: 'Full Stack MERN Developer Intern',
    company: 'Verve Technologies',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&q=80',
    location: 'New York, NY',
    type: 'On-site',
    category: 'Software Engineering',
    stipend: '$4,200 / month',
    isPaid: true,
    duration: '6 Months',
    deadline: '2026-12-30',
    openings: 4,
    description: 'Build scalable full-stack features from end to end using MongoDB, Express, React, and Node.js with secure JWT auth and real-time WebSockets.',
    requirements: [
      'Strong knowledge of Node.js, Express, and RESTful API architecture',
      'Solid understanding of MongoDB, Mongoose schemas, and indexing',
      'Proficiency in React.js, Tailwind CSS, and frontend state flows',
      'Basic knowledge of containerization with Docker'
    ],
    perks: [
      'Relocation assistance & metro transit pass',
      'Catered gourmet lunches & wellness stipend',
      'Fast-track interview for permanent graduate roles'
    ],
    skillsRequired: ['Node.js', 'Express', 'React', 'MongoDB', 'JavaScript'],
    status: 'Active',
    applicantsCount: 34,
    featured: true,
    createdAt: '2026-10-10'
  },
  {
    _id: 'int_04',
    title: 'Product UI/UX & Design Systems Intern',
    company: 'Aura Studio Design',
    logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=150&q=80',
    location: 'Remote (US & Canada)',
    type: 'Remote',
    category: 'UI/UX Design',
    stipend: '$3,800 / month',
    isPaid: true,
    duration: '3 Months',
    deadline: '2027-01-05',
    openings: 2,
    description: 'Design breathtaking pastel interfaces, design tokens, micro-interactions, and accessible typography systems in Figma.',
    requirements: [
      'A curated portfolio showcasing refined UI/UX thinking and typography',
      'Mastery of Figma components, autolayout, variables, and design tokens',
      'Understanding of interaction design and user journey mapping',
      'Basic familiarity with HTML/CSS box models'
    ],
    perks: [
      'Figma Organization license & Creative Cloud subscription',
      'Portfolio review workshops with industry leaders',
      'Flexible 30-hour work week'
    ],
    skillsRequired: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'User Research'],
    status: 'Active',
    applicantsCount: 19,
    featured: false,
    createdAt: '2026-10-12'
  },
  {
    _id: 'int_05',
    title: 'Cloud DevOps & Infrastructure Intern',
    company: 'Skyline Cloud Systems',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=150&q=80',
    location: 'Seattle, WA',
    type: 'Hybrid',
    category: 'Cloud & DevOps',
    stipend: '$4,600 / month',
    isPaid: true,
    duration: '6 Months',
    deadline: '2027-01-15',
    openings: 3,
    description: 'Automate CI/CD pipelines, configure Kubernetes clusters, and optimize cloud infrastructure on AWS and Google Cloud.',
    requirements: [
      'Familiarity with Linux command line and bash/shell scripting',
      'Experience with Docker containerization and CI/CD tools (GitHub Actions)',
      'Basic knowledge of AWS services (EC2, S3, RDS, Lambda)',
      'Interest in Infrastructure as Code (Terraform)'
    ],
    perks: [
      'AWS / GCP Certification voucher sponsored',
      'Modern M3 MacBook Pro provided',
      'Direct exposure to production infrastructure'
    ],
    skillsRequired: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    status: 'Active',
    applicantsCount: 22,
    featured: false,
    createdAt: '2026-10-14'
  },
  {
    _id: 'int_06',
    title: 'Data Science & Predictive Analytics Intern',
    company: 'Nexis Data Labs',
    logo: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=150&q=80',
    location: 'Chicago, IL',
    type: 'Hybrid',
    category: 'Data Science',
    stipend: '$4,000 / month',
    isPaid: true,
    duration: '4 Months',
    deadline: '2027-01-20',
    openings: 2,
    description: 'Transform petabytes of user engagement telemetry into predictive insights, cohort behavior models, and business intelligence dashboards.',
    requirements: [
      'Proficiency in SQL, Pandas, NumPy, and Scikit-Learn',
      'Experience crafting interactive dashboards in Tableau, PowerBI, or Streamlit',
      'Strong intuition for statistical hypothesis testing and A/B experiments',
      'Clear written and verbal storytelling skills'
    ],
    perks: [
      'Dedicated data analytics mentor',
      'Access to Snowflake enterprise instances',
      'Competitive stipend and housing stipend'
    ],
    skillsRequired: ['Python', 'SQL', 'Pandas', 'Data Visualization', 'Machine Learning'],
    status: 'Active',
    applicantsCount: 31,
    featured: true,
    createdAt: '2026-10-18'
  }
];

const initialApplicationsData = [
  {
    _id: 'app_01',
    internship: 'int_01',
    internshipTitle: 'Frontend Engineering Intern',
    company: 'Linear Systems',
    student: 'usr_student_01',
    studentName: 'Aanya Sharma',
    studentEmail: 'student@skillbridge.edu',
    studentCollege: 'Stanford University (CS Department)',
    resumeUrl: '/uploads/resumes/sample-resume.pdf',
    coverNote: 'I am deeply enthusiastic about design-centric frontend architectures and have crafted responsive web apps with React and Tailwind CSS.',
    portfolioUrl: 'https://github.com/aanya-sharma-dev',
    status: 'Shortlisted',
    timeline: [
      { status: 'Applied', date: '2026-10-05', note: 'Application submitted successfully.' },
      { status: 'Under Review', date: '2026-10-09', note: 'Resume screened by hiring committee.' },
      { status: 'Shortlisted', date: '2026-10-16', note: 'Selected for technical interview round!' }
    ],
    feedback: 'Impressive component portfolio and strong semantic React knowledge.',
    appliedAt: '2026-10-05'
  },
  {
    _id: 'app_02',
    internship: 'int_02',
    internshipTitle: 'AI & Large Language Model Intern',
    company: 'CognitiveCore AI',
    student: 'usr_student_01',
    studentName: 'Aanya Sharma',
    studentEmail: 'student@skillbridge.edu',
    studentCollege: 'Stanford University (CS Department)',
    resumeUrl: '/uploads/resumes/sample-resume.pdf',
    coverNote: 'Extensive coursework in deep learning and PyTorch with projects in RAG workflows and semantic embeddings.',
    portfolioUrl: 'https://github.com/aanya-sharma-dev',
    status: 'Under Review',
    timeline: [
      { status: 'Applied', date: '2026-10-12', note: 'Application submitted successfully.' },
      { status: 'Under Review', date: '2026-10-18', note: 'In review with AI research team.' }
    ],
    feedback: '',
    appliedAt: '2026-10-12'
  },
  {
    _id: 'app_03',
    internship: 'int_03',
    internshipTitle: 'Full Stack MERN Developer Intern',
    company: 'Verve Technologies',
    student: 'usr_student_01',
    studentName: 'Aanya Sharma',
    studentEmail: 'student@skillbridge.edu',
    studentCollege: 'Stanford University (CS Department)',
    resumeUrl: '/uploads/resumes/sample-resume.pdf',
    coverNote: 'Built multiple MERN projects with JWT authentication, custom middleware, and responsive React UIs.',
    portfolioUrl: 'https://github.com/aanya-sharma-dev',
    status: 'Interview',
    timeline: [
      { status: 'Applied', date: '2026-10-08', note: 'Application received.' },
      { status: 'Under Review', date: '2026-10-11', note: 'Code samples reviewed.' },
      { status: 'Shortlisted', date: '2026-10-15', note: 'Advanced to interview.' },
      { status: 'Interview', date: '2026-10-22', note: 'Virtual System Design interview scheduled for Nov 14th.' }
    ],
    feedback: 'Strong API design knowledge.',
    appliedAt: '2026-10-08'
  }
];

const initialNotifications = [
  {
    id: 'notif_1',
    title: 'Interview Scheduled!',
    message: 'Linear Systems scheduled your Frontend Engineering technical interview for Nov 14th.',
    type: 'success',
    read: false,
    date: '2 hours ago'
  },
  {
    id: 'notif_2',
    title: 'Application Shortlisted',
    message: 'Your application for AI & Large Language Model Intern has been shortlisted.',
    type: 'info',
    read: false,
    date: '1 day ago'
  },
  {
    id: 'notif_3',
    title: 'New Internship Match',
    message: 'A new Full Stack MERN role matching your React & Node.js skills was just posted.',
    type: 'alert',
    read: true,
    date: '3 days ago'
  }
];

const defaultStudentUser = {
  _id: 'usr_student_01',
  name: 'Aanya Sharma',
  email: 'student@skillbridge.edu',
  role: 'student',
  college: 'Stanford University (CS Department)',
  department: 'Computer Science & AI',
  graduationYear: '2026',
  phone: '+1 (555) 382-9014',
  bio: 'Passionate frontend & full-stack developer with an eye for minimalist design systems and performant React applications.',
  skills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'MongoDB', 'Python', 'Git', 'Figma'],
  resumeUrl: '/uploads/resumes/sample-resume.pdf',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
};

const defaultAdminUser = {
  _id: 'usr_admin_01',
  name: 'Dr. Evelyn Montgomery',
  email: 'admin@skillbridge.edu',
  role: 'admin',
  college: 'SkillBridge Academic & Industry Council',
  department: 'Career & Industry Partnerships',
  graduationYear: 'Faculty',
  phone: '+1 (555) 720-4100',
  bio: 'Lead Career Director orchestrating premier internship pipelines across Silicon Valley and international tech hubs.',
  skills: ['Talent Acquisition', 'Curriculum Mapping', 'Career Mentorship', 'Enterprise Outreach'],
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
};

class Store {
  constructor() {
    this.listeners = [];
    this.theme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    this.applyTheme(this.theme);

    // Load saved state or defaults
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.user = parsed.user || defaultStudentUser;
        this.token = parsed.token || 'demo-jwt-token-active';
        this.internships = parsed.internships || initialInternshipsData;
        this.applications = parsed.applications || initialApplicationsData;
        this.notifications = parsed.notifications || initialNotifications;
      } catch (e) {
        this.loadDefaults();
      }
    } else {
      this.loadDefaults();
    }

    this.currentView = 'home';
    this.selectedInternship = null;
    this.activeModal = null; // 'apply', 'detail', 'create-internship', 'edit-profile'
    this.modalData = null;

    // Filters
    this.searchQuery = '';
    this.filterCategory = 'All';
    this.filterType = 'All';
    this.filterPaid = 'All';
  }

  loadDefaults() {
    this.user = defaultStudentUser;
    this.token = 'demo-jwt-token-active';
    this.internships = initialInternshipsData;
    this.applications = initialApplicationsData;
    this.notifications = initialNotifications;
    this.saveState();
  }

  saveState() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      user: this.user,
      token: this.token,
      internships: this.internships,
      applications: this.applications,
      notifications: this.notifications
    }));
  }

  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  toggleTheme() {
    const nextTheme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme);
    this.notify();
  }

  loginAs(role) {
    if (role === 'admin') {
      this.user = defaultAdminUser;
      this.currentView = 'admin-dashboard';
    } else {
      this.user = defaultStudentUser;
      this.currentView = 'student-dashboard';
    }
    this.token = 'demo-jwt-token-' + role;
    this.saveState();
    this.notify();
  }

  login(user, token) {
    this.user = user;
    this.token = token;
    this.currentView = user.role === 'admin' ? 'admin-dashboard' : 'student-dashboard';
    this.saveState();
    this.notify();
  }

  logout() {
    this.user = null;
    this.token = null;
    this.currentView = 'home';
    this.saveState();
    this.notify();
  }

  navigate(view, data = null) {
    this.currentView = view;
    if (data) {
      if (view === 'internship-detail') this.selectedInternship = data;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.notify();
  }

  openModal(name, data = null) {
    this.activeModal = name;
    this.modalData = data;
    this.notify();
  }

  closeModal() {
    this.activeModal = null;
    this.modalData = null;
    this.notify();
  }

  applyToInternship(internshipId, coverNote, portfolioUrl) {
    const internship = this.internships.find(i => i._id === internshipId);
    if (!internship) return { success: false, message: 'Internship not found' };

    const alreadyApplied = this.applications.some(a => a.internship === internshipId && a.student === (this.user?._id || 'usr_student_01'));
    if (alreadyApplied) {
      return { success: false, message: 'You have already applied for this opportunity.' };
    }

    const newApp = {
      _id: 'app_' + Date.now(),
      internship: internship._id,
      internshipTitle: internship.title,
      company: internship.company,
      student: this.user?._id || 'usr_student_01',
      studentName: this.user?.name || 'Aanya Sharma',
      studentEmail: this.user?.email || 'student@skillbridge.edu',
      studentCollege: this.user?.college || 'Stanford University',
      resumeUrl: this.user?.resumeUrl || '/uploads/resumes/sample-resume.pdf',
      coverNote: coverNote || 'Deeply motivated to excel in this role.',
      portfolioUrl: portfolioUrl || 'https://github.com',
      status: 'Pending',
      timeline: [
        { status: 'Applied', date: new Date().toISOString().split('T')[0], note: 'Application submitted successfully.' }
      ],
      feedback: '',
      appliedAt: new Date().toISOString().split('T')[0]
    };

    this.applications.unshift(newApp);
    internship.applicantsCount = (internship.applicantsCount || 0) + 1;
    this.notifications.unshift({
      id: 'notif_' + Date.now(),
      title: 'Application Submitted!',
      message: `Your application for ${internship.title} at ${internship.company} was submitted.`,
      type: 'success',
      read: false,
      date: 'Just now'
    });

    this.saveState();
    this.notify();
    return { success: true, message: 'Application submitted successfully!', application: newApp };
  }

  updateApplicationStatus(appId, newStatus, feedback = '') {
    const app = this.applications.find(a => a._id === appId);
    if (!app) return false;

    app.status = newStatus;
    if (feedback) app.feedback = feedback;
    app.timeline.push({
      status: newStatus,
      date: new Date().toISOString().split('T')[0],
      note: feedback || `Status updated to ${newStatus}.`
    });

    this.saveState();
    this.notify();
    return true;
  }

  createInternship(data) {
    const newInternship = {
      _id: 'int_' + Date.now(),
      title: data.title || 'Software Engineering Intern',
      company: data.company || 'TechVentures',
      logo: data.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      location: data.location || 'Remote',
      type: data.type || 'Remote',
      category: data.category || 'Software Engineering',
      stipend: data.stipend || '$4,000 / month',
      isPaid: data.isPaid !== undefined ? data.isPaid : true,
      duration: data.duration || '3 Months',
      deadline: data.deadline || '2027-02-15',
      openings: Number(data.openings) || 2,
      description: data.description || 'Exciting internship opportunity.',
      requirements: data.requirements || ['Solid technical foundation'],
      perks: data.perks || ['Mentorship & Certificate'],
      skillsRequired: data.skillsRequired || ['JavaScript', 'React'],
      status: 'Active',
      applicantsCount: 0,
      featured: Boolean(data.featured),
      createdAt: new Date().toISOString().split('T')[0]
    };

    this.internships.unshift(newInternship);
    this.saveState();
    this.notify();
    return newInternship;
  }

  deleteInternship(id) {
    this.internships = this.internships.filter(i => i._id !== id);
    this.saveState();
    this.notify();
  }

  updateProfile(profileData) {
    if (!this.user) return;
    this.user = {
      ...this.user,
      ...profileData,
    };
    this.saveState();
    this.notify();
  }

  markAllNotificationsRead() {
    this.notifications.forEach(n => n.read = true);
    this.saveState();
    this.notify();
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this);
    }
  }
}

export const store = new Store();
