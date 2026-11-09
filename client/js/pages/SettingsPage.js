import { store } from '../state.js';
import { renderIcon } from '../icons.js';

export function renderSettingsPage() {
  const user = store.user || { name: 'Aanya Sharma', email: 'student@skillbridge.edu' };
  const isDark = store.theme === 'dark';

  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 5rem; max-width: 860px;">
      <div style="margin-bottom: 2.5rem;">
        <span class="badge badge-plum" style="margin-bottom: 0.5rem;">Preferences</span>
        <h1 style="font-size: 2.3rem;">System & Account Settings</h1>
        <p style="color: var(--color-text-secondary); margin-top: 0.25rem;">
          Configure your visual theme, security credentials, and communication frequency.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Theme Preference Card -->
        <div class="card" style="padding: 2rem;">
          <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Appearance & Visual Palette</h3>
          <p style="font-size: 0.88rem; color: var(--color-text-secondary); margin-bottom: 1.5rem;">
            Switch between Ivory Lavender (Light) and Deep Plum Violet (Dark) modes.
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
            <!-- Light Mode Option -->
            <div 
              onclick="window.setThemeExplicit('light')"
              style="
                border: 2px solid ${!isDark ? 'var(--color-primary-plum)' : 'var(--color-border)'};
                border-radius: 16px;
                padding: 1.25rem;
                cursor: pointer;
                background-color: #EEECF3;
                color: #302632;
                transition: all var(--transition-fast);
              "
            >
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <div style="font-weight: 700; font-size: 1rem;">Soft Floral Luxury (Light)</div>
                ${!isDark ? `<span style="color: var(--color-primary-plum);">${renderIcon('checkCircle', '', 20)}</span>` : ''}
              </div>
              <div style="display: flex; gap: 0.4rem;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #714D69;"></div>
                <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #A0849D;"></div>
                <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #D3B3B8;"></div>
                <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #FFFFFF; border: 1px solid #ccc;"></div>
              </div>
            </div>

            <!-- Dark Mode Option -->
            <div 
              onclick="window.setThemeExplicit('dark')"
              style="
                border: 2px solid ${isDark ? 'var(--color-primary-plum)' : 'var(--color-border)'};
                border-radius: 16px;
                padding: 1.25rem;
                cursor: pointer;
                background-color: #1A121C;
                color: #F5EEF6;
                transition: all var(--transition-fast);
              "
            >
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <div style="font-weight: 700; font-size: 1rem;">Deep Plum (Dark)</div>
                ${isDark ? `<span style="color: var(--color-primary-plum);">${renderIcon('checkCircle', '', 20)}</span>` : ''}
              </div>
              <div style="display: flex; gap: 0.4rem;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #8D6284;"></div>
                <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #231926; border: 1px solid #444;"></div>
                <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #D3B3B8;"></div>
                <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #19121B; border: 1px solid #333;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Credentials Card -->
        <div class="card" style="padding: 2rem;">
          <h3 style="font-size: 1.2rem; margin-bottom: 1.25rem;">Security & Password</h3>

          <div class="form-group">
            <label class="form-label">Current Password</label>
            <input type="password" class="form-input" placeholder="••••••••••••">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">New Password</label>
              <input type="password" class="form-input" placeholder="Min. 8 characters">
            </div>
            <div class="form-group">
              <label class="form-label">Confirm New Password</label>
              <input type="password" class="form-input" placeholder="Re-enter password">
            </div>
          </div>

          <button onclick="alert('Password updated securely!')" class="btn btn-primary" style="margin-top: 0.5rem;">
            Update Password
          </button>
        </div>

        <!-- Notification Toggles -->
        <div class="card" style="padding: 2rem;">
          <h3 style="font-size: 1.2rem; margin-bottom: 1rem;">Notification Preferences</h3>

          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 600;">Email Alerts for Interview Calls</div>
                <div style="font-size: 0.82rem; color: var(--color-text-secondary);">Receive instant emails whenever an employer schedules a meeting</div>
              </div>
              <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: var(--color-primary-plum);">
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 1rem;">
              <div>
                <div style="font-weight: 600;">Weekly Recommended Roles Digest</div>
                <div style="font-size: 0.82rem; color: var(--color-text-secondary);">Summary of newly posted roles matching your skills</div>
              </div>
              <input type="checkbox" checked style="width: 18px; height: 18px; accent-color: var(--color-primary-plum);">
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
