const crypto = require('crypto');

function hashPwd(pwd) {
  try {
    const bcrypt = require('bcryptjs');
    return bcrypt.hashSync(pwd, 10);
  } catch (e) {
    return crypto.createHash('sha256').update(pwd + 'skillbridge_salt').digest('hex');
  }
}

const initialUsers = [
  {
    _id: 'usr_student_01',
    name: 'Aanya Sharma',
    email: 'student@skillbridge.edu',
    password: hashPwd('student123'),
    role: 'student',
    college: 'Stanford University (CS Department)',
    department: 'Computer Science & AI',
    graduationYear: '2026',
    phone: '+1 (555) 382-9014',
    bio: 'Passionate frontend & full-stack developer with an eye for minimalist design systems and performant React applications.',
    skills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'MongoDB', 'Python', 'Git', 'Figma'],
    resumeUrl: '/uploads/resumes/sample-resume.pdf',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    createdAt: new Date('2026-09-15'),
  },
  {
    _id: 'usr_admin_01',
    name: 'Dr. Evelyn Montgomery',
    email: 'admin@skillbridge.edu',
    password: hashPwd('admin123'),
    role: 'admin',
    college: 'SkillBridge Academic & Industry Council',
    department: 'Career & Industry Partnerships',
    graduationYear: 'Faculty',
    phone: '+1 (555) 720-4100',
    bio: 'Lead Career Director orchestrating premier internship pipelines across Silicon Valley and international tech hubs.',
    skills: ['Talent Acquisition', 'Curriculum Mapping', 'Career Mentorship', 'Enterprise Outreach'],
    resumeUrl: '',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    createdAt: new Date('2026-08-01'),
  }
];

const initialInternships = [
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
    createdAt: new Date('2026-10-01'),
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
    createdAt: new Date('2026-10-05'),
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
    createdAt: new Date('2026-10-10'),
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
    createdAt: new Date('2026-10-12'),
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
    createdAt: new Date('2026-10-14'),
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
    createdAt: new Date('2026-10-18'),
  }
];

const initialApplications = [
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
      { status: 'Applied', date: new Date('2026-10-05'), note: 'Application submitted successfully.' },
      { status: 'Under Review', date: new Date('2026-10-09'), note: 'Resume screened by hiring committee.' },
      { status: 'Shortlisted', date: new Date('2026-10-16'), note: 'Selected for technical interview round!' }
    ],
    feedback: 'Impressive component portfolio and strong semantic React knowledge.',
    appliedAt: new Date('2026-10-05'),
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
      { status: 'Applied', date: new Date('2026-10-12'), note: 'Application submitted successfully.' },
      { status: 'Under Review', date: new Date('2026-10-18'), note: 'In review with AI research team.' }
    ],
    feedback: '',
    appliedAt: new Date('2026-10-12'),
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
      { status: 'Applied', date: new Date('2026-10-08'), note: 'Application received.' },
      { status: 'Under Review', date: new Date('2026-10-11'), note: 'Code samples reviewed.' },
      { status: 'Shortlisted', date: new Date('2026-10-15'), note: 'Advanced to interview.' },
      { status: 'Interview', date: new Date('2026-10-22'), note: 'Virtual System Design interview scheduled for Nov 14th.' }
    ],
    feedback: 'Strong API design knowledge.',
    appliedAt: new Date('2026-10-08'),
  }
];

module.exports = {
  initialUsers,
  initialInternships,
  initialApplications,
};
