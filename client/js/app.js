// Main Application Entrypoint for SkillBridge
import { store } from './state.js';
import { api } from './api.js';
import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { renderActiveModal } from './components/Modal.js';
import { renderLandingPage } from './pages/LandingPage.js';
import { renderExploreInternshipsPage } from './pages/ExploreInternshipsPage.js';
import { renderResumeAnalyzerPage, setAnalysisResult } from './pages/ResumeAnalyzerPage.js';
import { renderStudentDashboard } from './pages/StudentDashboard.js';
import { renderAdminDashboard } from './pages/AdminDashboard.js';
import { renderMyApplicationsPage } from './pages/MyApplicationsPage.js';
import { renderStudentProfilePage } from './pages/StudentProfilePage.js';
import { renderNotificationsPage } from './pages/NotificationsPage.js';
import { renderSettingsPage } from './pages/SettingsPage.js';
import { renderAuthPage } from './pages/AuthPage.js';

// Global window helpers for inline event handlers
window.appNavigate = (view, data = null) => {
  store.navigate(view, data);
};

window.toggleTheme = () => {
  store.toggleTheme();
};

window.setThemeExplicit = (theme) => {
  store.applyTheme(theme);
  store.notify();
};

window.openApplyModal = (internshipId) => {
  const internship = store.internships.find(i => i._id === internshipId);
  store.openModal('apply', internship);
};

window.openDetailModal = (internshipId) => {
  const internship = store.internships.find(i => i._id === internshipId);
  store.openModal('detail', internship);
};

window.openCreateInternshipModal = () => {
  store.openModal('create-internship');
};

window.openEditProfileModal = () => {
  store.openModal('edit-profile');
};

window.closeModal = () => {
  store.closeModal();
};

window.handleLogout = () => {
  store.logout();
};

window.demoLogin = (role) => {
  store.loginAs(role);
};

window.handleFilterChange = (key, value) => {
  if (key === 'search') store.searchQuery = value;
  if (key === 'category') store.filterCategory = value;
  if (key === 'type') store.filterType = value;
  if (key === 'paid') store.filterPaid = value;
  store.notify();
};

window.handleResetFilters = () => {
  store.searchQuery = '';
  store.filterCategory = 'All';
  store.filterType = 'All';
  store.filterPaid = 'All';
  store.notify();
};

window.handleApplicationSubmit = async (event, internshipId) => {
  event.preventDefault();
  const coverNote = document.getElementById('appCoverNote')?.value;
  const portfolioUrl = document.getElementById('appPortfolioUrl')?.value;

  const result = store.applyToInternship(internshipId, coverNote, portfolioUrl);
  if (result.success) {
    store.closeModal();
    triggerFloralConfetti();
    alert('🌸 Application submitted successfully! You can track its progress under "My Applications".');
    store.navigate('applications');
  } else {
    alert(result.message);
  }
};

window.handleCreateInternshipSubmit = (event) => {
  event.preventDefault();
  const title = document.getElementById('newIntTitle').value;
  const company = document.getElementById('newIntCompany').value;
  const category = document.getElementById('newIntCategory').value;
  const type = document.getElementById('newIntType').value;
  const duration = document.getElementById('newIntDuration').value;
  const stipend = document.getElementById('newIntStipend').value;
  const location = document.getElementById('newIntLocation').value;
  const skillsStr = document.getElementById('newIntSkills').value;
  const description = document.getElementById('newIntDescription').value;

  const skillsRequired = skillsStr.split(',').map(s => s.trim()).filter(Boolean);

  store.createInternship({
    title,
    company,
    category,
    type,
    duration,
    stipend,
    location,
    skillsRequired,
    description
  });

  store.closeModal();
  alert('🌸 New internship posted successfully! It is now live in the candidate explorer.');
  store.navigate('explore');
};

window.handleEditProfileSubmit = (event) => {
  event.preventDefault();
  const name = document.getElementById('editProfileName').value;
  const college = document.getElementById('editProfileCollege').value;
  const department = document.getElementById('editProfileDepartment').value;
  const phone = document.getElementById('editProfilePhone').value;
  const bio = document.getElementById('editProfileBio').value;

  store.updateProfile({ name, college, department, phone, bio });
  store.closeModal();
  alert('Profile updated successfully!');
};

window.handleAddProfileSkill = () => {
  const input = document.getElementById('newSkillInput');
  const val = input?.value.trim();
  if (val && store.user) {
    const current = store.user.skills || [];
    if (!current.includes(val)) {
      store.updateProfile({ skills: [...current, val] });
    }
    input.value = '';
  }
};

window.handleAdminStatusChange = (appId, newStatus) => {
  const success = store.updateApplicationStatus(appId, newStatus, `Status updated to ${newStatus} by recruitment lead.`);
  if (success) {
    alert(`Application ${appId} status updated to: ${newStatus}`);
  }
};

window.viewApplicantDetail = (appId) => {
  const app = store.applications.find(a => a._id === appId);
  if (!app) return;
  alert(`Applicant Details:\n\nCandidate: ${app.studentName}\nEmail: ${app.studentEmail}\nCollege: ${app.studentCollege}\nStatus: ${app.status}\nCover Note: ${app.coverNote || 'N/A'}`);
};

window.handleMarkAllRead = () => {
  store.markAllNotificationsRead();
};

window.scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    store.navigate('home');
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
};

// AI Resume Handlers
window.handleAnalyzeText = async () => {
  const text = document.getElementById('resumeTextPaste')?.value;
  const role = document.getElementById('targetRoleSelect')?.value || 'Software Engineering';

  if (!text || text.trim().length < 20) {
    alert('Please enter or paste your resume details (experience, skills, projects) for an accurate ATS evaluation.');
    return;
  }

  const btn = document.getElementById('btnAnalyzeResume');
  if (btn) btn.innerHTML = '✨ Running Neural Parser...';

  const res = await api.analyzeResume(text, role);
  setAnalysisResult(res.analysis);
  triggerFloralConfetti();
  store.notify();
};

window.useSampleResume = async () => {
  const sample = `
Aanya Sharma - Stanford University (Computer Science & AI, GPA 3.92)
Email: student@skillbridge.edu | GitHub: github.com/aanya-sharma-dev | Portfolio: aanyasharma.dev

SUMMARY:
Results-driven Full Stack Engineer with strong experience architecting scalable React web applications, designing REST APIs with Node.js and Express, and optimizing MongoDB database schemas.

TECHNICAL SKILLS:
Languages & Frameworks: React, Node.js, JavaScript, TypeScript, Python, HTML5, CSS3, Tailwind CSS, Express.js
Tools & Platforms: Git, GitHub, REST APIs, Docker, Figma, Postman, Linux

PROJECTS:
1. SkillBridge Career Portal (React, Node.js, Tailwind CSS)
- Engineered responsive career portal serving 10,000+ active student sessions with sub-100ms API latency.
- Implemented JWT authentication and automated ATS keyword parser scoring resumes with 92% precision.

2. Distributed Microservices Pipeline (Node.js, Docker, MongoDB)
- Architected asynchronous event streaming workers increasing transaction throughput by 42%.
- Integrated comprehensive unit test suites achieving 94% code coverage.
  `;

  const pasteEl = document.getElementById('resumeTextPaste');
  if (pasteEl) pasteEl.value = sample.trim();

  const role = document.getElementById('targetRoleSelect')?.value || 'Software Engineering';
  const res = await api.analyzeResume(sample, role);
  setAnalysisResult(res.analysis);
  triggerFloralConfetti();
  store.notify();
};

window.handleResumeFileUpload = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const content = e.target.result;
    const role = document.getElementById('targetRoleSelect')?.value || 'Software Engineering';
    const res = await api.analyzeResume(typeof content === 'string' ? content : 'React Node.js TypeScript Docker Git Engineer', role);
    setAnalysisResult(res.analysis);
    triggerFloralConfetti();
    store.notify();
  };
  reader.readAsText(file);
};

window.printReport = () => {
  window.print();
};

window.handleAuthSubmit = async (event, mode) => {
  event.preventDefault();
  const email = document.getElementById('authEmail')?.value;
  const password = document.getElementById('authPassword')?.value;

  if (mode === 'login') {
    await api.login(email, password);
  } else {
    const name = document.getElementById('authName')?.value;
    const college = document.getElementById('authCollege')?.value;
    const department = document.getElementById('authDepartment')?.value;
    const graduationYear = document.getElementById('authGradYear')?.value;

    await api.register({ name, email, password, college, department, graduationYear });
  }
};

// Subtle celebration confetti effect with floral pastel colors
function triggerFloralConfetti() {
  if (typeof window.confetti === 'function') {
    window.confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#714D69', '#A0849D', '#D3B3B8', '#E3DAE7', '#F0C9BE']
    });
  }
}

// Main Render Function
function renderApp() {
  const root = document.getElementById('root');
  if (!root) return;

  const currentView = store.currentView;
  let viewContent = '';

  switch (currentView) {
    case 'home':
      viewContent = renderLandingPage();
      break;
    case 'explore':
      viewContent = renderExploreInternshipsPage();
      break;
    case 'resume-analyzer':
      viewContent = renderResumeAnalyzerPage();
      break;
    case 'student-dashboard':
      viewContent = renderStudentDashboard();
      break;
    case 'admin-dashboard':
      viewContent = renderAdminDashboard();
      break;
    case 'applications':
      viewContent = renderMyApplicationsPage();
      break;
    case 'profile':
      viewContent = renderStudentProfilePage();
      break;
    case 'notifications':
      viewContent = renderNotificationsPage();
      break;
    case 'settings':
      viewContent = renderSettingsPage();
      break;
    case 'login':
      viewContent = renderAuthPage('login');
      break;
    case 'register':
      viewContent = renderAuthPage('register');
      break;
    default:
      viewContent = renderLandingPage();
  }

  const isAuthView = currentView === 'login' || currentView === 'register';

  root.innerHTML = `
    ${!isAuthView ? renderNavbar() : ''}
    ${viewContent}
    ${!isAuthView && !currentView.includes('dashboard') ? renderFooter() : ''}
    ${renderActiveModal()}
  `;

  // Attach search input listener on landing page
  const heroBtn = document.getElementById('btnHeroSearch');
  if (heroBtn) {
    heroBtn.onclick = () => {
      const q = document.getElementById('heroSearchQuery')?.value || '';
      store.searchQuery = q;
      store.navigate('explore');
    };
  }
}

// Bootstrap
store.subscribe(renderApp);
document.addEventListener('DOMContentLoaded', renderApp);
renderApp();
