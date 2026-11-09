import { renderIcon } from '../icons.js';

export function renderFooter() {
  return `
    <footer class="luxury-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Col 1: Brand Info -->
          <div>
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
              <div class="brand-icon-wrapper" style="width: 36px; height: 36px;">
                ${renderIcon('flower', '', 20)}
              </div>
              <span style="font-family: var(--font-heading); font-weight: 800; font-size: 1.3rem; color: var(--color-primary-plum);">SkillBridge</span>
            </div>
            <p class="footer-brand-p">
              The premier AI-powered internship platform engineered for student success. Connecting high-caliber talent to verified technology, design, and research opportunities.
            </p>
            <div style="margin-top: 1.25rem;">
              <span class="badge badge-plum">Theme: Soft Floral Luxury • Modern SaaS</span>
            </div>
          </div>

          <!-- Col 2: Platform Links -->
          <div>
            <h4 class="footer-heading">Platform</h4>
            <ul class="footer-links">
              <li><a href="#" onclick="window.appNavigate('explore'); return false;" class="footer-link">Explore Internships</a></li>
              <li><a href="#" onclick="window.appNavigate('resume-analyzer'); return false;" class="footer-link">AI Resume Analyzer</a></li>
              <li><a href="#" onclick="window.appNavigate('student-dashboard'); return false;" class="footer-link">Student Portal</a></li>
              <li><a href="#" onclick="window.appNavigate('admin-dashboard'); return false;" class="footer-link">Employer & Admin Console</a></li>
              <li><a href="#" onclick="window.appNavigate('applications'); return false;" class="footer-link">Application Tracker</a></li>
            </ul>
          </div>

          <!-- Col 3: Disciplines -->
          <div>
            <h4 class="footer-heading">Career Tracks</h4>
            <ul class="footer-links">
              <li><a href="#" onclick="window.handleFilterChange('category', 'Software Engineering'); window.appNavigate('explore'); return false;" class="footer-link">Software Engineering</a></li>
              <li><a href="#" onclick="window.handleFilterChange('category', 'AI & Machine Learning'); window.appNavigate('explore'); return false;" class="footer-link">AI & Machine Learning</a></li>
              <li><a href="#" onclick="window.handleFilterChange('category', 'UI/UX Design'); window.appNavigate('explore'); return false;" class="footer-link">Product & UI/UX Design</a></li>
              <li><a href="#" onclick="window.handleFilterChange('category', 'Data Science'); window.appNavigate('explore'); return false;" class="footer-link">Data Science & Analytics</a></li>
              <li><a href="#" onclick="window.handleFilterChange('category', 'Cloud & DevOps'); window.appNavigate('explore'); return false;" class="footer-link">Cloud & Infrastructure</a></li>
            </ul>
          </div>

          <!-- Col 4: Newsletter -->
          <div>
            <h4 class="footer-heading">Curated Career Drops</h4>
            <p style="font-size: 0.88rem; color: var(--color-text-secondary); margin-bottom: 1rem; line-height: 1.55;">
              Receive handpicked high-stipend internship alerts delivered every Tuesday.
            </p>
            <form onsubmit="alert('Thank you for subscribing to SkillBridge career alerts!'); event.target.reset(); return false;" style="display: flex; gap: 0.5rem;">
              <input type="email" class="form-input" placeholder="Enter your college email" required style="font-size: 0.88rem; padding: 0.55rem 0.85rem;">
              <button type="submit" class="btn btn-primary btn-sm">Join</button>
            </form>
          </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div class="footer-bottom">
          <div>
            © 2026 SkillBridge Technologies Inc. All rights reserved. Designed with Soft Floral Luxury.
          </div>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#" onclick="alert('Privacy Policy: Standard educational and career privacy compliance.'); return false;" style="color: var(--color-text-muted);">Privacy</a>
            <a href="#" onclick="alert('Terms of Service: Academic and career recruiting fairness.'); return false;" style="color: var(--color-text-muted);">Terms</a>
            <a href="#" onclick="alert('Security: End-to-end encrypted student authentication.'); return false;" style="color: var(--color-text-muted);">Security</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
