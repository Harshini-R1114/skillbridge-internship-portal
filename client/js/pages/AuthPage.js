import { store } from '../state.js';
import { api } from '../api.js';
import { renderIcon } from '../icons.js';

export function renderAuthPage(mode = 'login') {
  const isLogin = mode === 'login';

  return `
    <div class="auth-wrapper">
      <!-- Left Hero Floral Artwork Panel -->
      <div class="auth-hero-panel">
        <!-- Brand Logo Header -->
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="brand-icon-wrapper" style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px);">
            ${renderIcon('sparkles', '', 20)}
          </div>
          <span style="font-family: var(--font-heading); font-weight: 800; font-size: 1.4rem; letter-spacing: -0.02em;">SkillBridge</span>
        </div>

        <!-- Middle Quote & Floral Graphics -->
        <div style="max-width: 440px;">
          <span class="badge badge-rose" style="background: rgba(211, 179, 184, 0.25); color: #FFFFFF; border-color: rgba(255, 255, 255, 0.2); margin-bottom: 1.25rem;">
            Soft Floral Luxury • Career Intelligence
          </span>
          <h2 style="font-size: 2.5rem; line-height: 1.2; margin-bottom: 1.25rem; color: #FFFFFF;">
            Unlock Opportunities That Elevate Your Future.
          </h2>
          <p style="font-size: 1.05rem; color: #E3DAE7; line-height: 1.65;">
            Join over 50,000 students and leading industry partners discovering matched internships with AI-driven resume diagnostics.
          </p>
        </div>

        <!-- Bottom Testimonial Snippet -->
        <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border-radius: 16px; padding: 1.25rem; border: 1px solid rgba(255, 255, 255, 0.15);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;">
            <div>
              <div style="font-weight: 700; font-size: 0.92rem; color: #FFFFFF;">Aanya Sharma</div>
              <div style="font-size: 0.78rem; color: #E3DAE7;">Software Engineering Intern @ Linear Systems</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Form Panel -->
      <div class="auth-form-panel">
        <div class="auth-card">
          <!-- Card Title -->
          <div style="text-align: center; margin-bottom: 2rem;">
            <h2 style="font-size: 1.85rem; margin-bottom: 0.35rem;">
              ${isLogin ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p style="color: var(--color-text-secondary); font-size: 0.92rem;">
              ${isLogin ? 'Enter your credentials to access your career dashboard' : 'Join SkillBridge to access verified internships and AI tools'}
            </p>
          </div>

          <!-- Instant 1-Click Demo Login Shortcuts -->
          ${isLogin ? `
            <div style="margin-bottom: 1.75rem; padding: 1rem; background-color: var(--color-lavender-subtle); border: 1px dashed var(--color-secondary-mauve); border-radius: 14px;">
              <div style="font-size: 0.78rem; text-transform: uppercase; color: var(--color-primary-plum); font-weight: 700; text-align: center; margin-bottom: 0.6rem; letter-spacing: 0.05em;">
                ⚡ Instant Demo Login
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <button onclick="window.demoLogin('student')" class="btn btn-sm btn-primary">
                  Student Login
                </button>
                <button onclick="window.demoLogin('admin')" class="btn btn-sm btn-secondary">
                  Admin Login
                </button>
              </div>
            </div>
          ` : ''}

          <!-- Authentication Form -->
          <form onsubmit="window.handleAuthSubmit(event, '${isLogin ? 'login' : 'register'}')">
            ${!isLogin ? `
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" id="authName" class="form-input" placeholder="e.g. Aanya Sharma" required>
              </div>
            ` : ''}

            <div class="form-group">
              <label class="form-label">Academic or Work Email</label>
              <input type="email" id="authEmail" class="form-input" placeholder="name@university.edu" required value="${isLogin ? 'student@skillbridge.edu' : ''}">
            </div>

            ${!isLogin ? `
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
                <div class="form-group">
                  <label class="form-label">College / University</label>
                  <input type="text" id="authCollege" class="form-input" placeholder="e.g. Stanford University" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Department</label>
                  <input type="text" id="authDepartment" class="form-input" placeholder="e.g. Computer Science" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Graduation Year</label>
                <select id="authGradYear" class="form-select">
                  <option value="2025">2025</option>
                  <option value="2026" selected>2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
              </div>
            ` : ''}

            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" id="authPassword" class="form-input" placeholder="••••••••••••" required value="${isLogin ? 'student123' : ''}">
            </div>

            ${!isLogin ? `
              <div class="form-group">
                <label class="form-label">Confirm Password</label>
                <input type="password" id="authConfirmPassword" class="form-input" placeholder="••••••••••••" required value="student123">
              </div>
            ` : ''}

            ${isLogin ? `
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; font-size: 0.85rem;">
                <label style="display: flex; align-items: center; gap: 0.45rem; cursor: pointer;">
                  <input type="checkbox" checked style="accent-color: var(--color-primary-plum);">
                  Remember this device
                </label>
                <a href="#" onclick="alert('Demo reset instructions sent to student@skillbridge.edu'); return false;" style="color: var(--color-primary-plum); font-weight: 600;">Forgot password?</a>
              </div>
            ` : ''}

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem; font-size: 1rem; margin-top: 0.5rem;">
              ${isLogin ? 'Sign In to SkillBridge' : 'Create Student Account'}
            </button>
          </form>

          <!-- Toggle Link -->
          <div style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--color-text-secondary);">
            ${isLogin ? `
              Don't have an account yet? 
              <a href="#" onclick="window.appNavigate('register'); return false;" style="color: var(--color-primary-plum); font-weight: 700;">Create one free</a>
            ` : `
              Already have an account? 
              <a href="#" onclick="window.appNavigate('login'); return false;" style="color: var(--color-primary-plum); font-weight: 700;">Sign in here</a>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}
