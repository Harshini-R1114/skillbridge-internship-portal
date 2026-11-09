import { store } from '../state.js';
import { renderIcon } from '../icons.js';

export function renderNavbar() {
  const user = store.user;
  const currentView = store.currentView;
  const isDark = store.theme === 'dark';

  return `
    <nav class="navbar">
      <div class="container nav-container">
        <!-- Logo -->
        <a href="#" onclick="window.appNavigate('home'); return false;" class="brand-logo">
          <div class="brand-icon-wrapper">
            ${renderIcon('flower', '', 22)}
          </div>
          <span>SkillBridge</span>
        </a>

        <!-- Main Nav Links -->
        <ul class="nav-links">
          <li class="nav-item ${currentView === 'home' ? 'active' : ''}" onclick="window.appNavigate('home')">
            Home
          </li>
          <li class="nav-item ${currentView === 'explore' ? 'active' : ''}" onclick="window.appNavigate('explore')">
            Explore Internships
          </li>
          <li class="nav-item ${currentView === 'resume-analyzer' ? 'active' : ''}" onclick="window.appNavigate('resume-analyzer')">
            AI Resume Analyzer
          </li>
          ${user ? `
            <li class="nav-item ${currentView.includes('dashboard') ? 'active' : ''}" onclick="window.appNavigate(user.role === 'admin' ? 'admin-dashboard' : 'student-dashboard')">
              ${user.role === 'admin' ? 'Admin Portal' : 'My Dashboard'}
            </li>
          ` : `
            <li class="nav-item" onclick="window.scrollToSection('whyChooseSection')">
              Features
            </li>
            <li class="nav-item" onclick="window.scrollToSection('howItWorksSection')">
              How It Works
            </li>
          `}
        </ul>

        <!-- Right Side Nav Actions -->
        <div class="nav-actions">
          <!-- Theme Toggle Button -->
          <button class="theme-toggle-btn" onclick="window.toggleTheme()" title="Toggle Light / Dark Mode">
            ${isDark ? renderIcon('sun', '', 20) : renderIcon('moon', '', 20)}
          </button>

          ${user ? `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <button onclick="window.appNavigate('notifications')" class="btn btn-ghost" style="padding: 0.5rem; position: relative;" title="Notifications">
                ${renderIcon('bell', '', 18)}
                ${store.notifications.some(n => !n.read) ? `
                  <span style="position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; background-color: var(--color-error); border-radius: 50%;"></span>
                ` : ''}
              </button>

              <button onclick="window.appNavigate(user.role === 'admin' ? 'admin-dashboard' : 'student-dashboard')" class="btn btn-secondary btn-sm" style="display: flex; align-items: center; gap: 0.5rem;">
                <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;">
                <span>${user.name.split(' ')[0]}</span>
              </button>

              <button onclick="window.handleLogout()" class="btn btn-sm btn-ghost" style="color: var(--color-text-muted);" title="Sign out">
                ${renderIcon('logOut', '', 16)}
              </button>
            </div>
          ` : `
            <button onclick="window.appNavigate('login')" class="btn btn-ghost">
              Sign In
            </button>
            <button onclick="window.appNavigate('register')" class="btn btn-primary">
              Get Started
            </button>
          `}
        </div>
      </div>
    </nav>
  `;
}
