import { store } from '../state.js';
import { renderIcon } from '../icons.js';

export function renderStudentDashboard() {
  const user = store.user || { name: 'Aanya Sharma', college: 'Stanford University' };
  const applications = store.applications.filter(a => a.student === user._id);
  
  const totalApps = applications.length;
  const shortlisted = applications.filter(a => a.status === 'Shortlisted').length;
  const interviews = applications.filter(a => a.status === 'Interview').length;
  const rejected = applications.filter(a => a.status === 'Rejected').length;

  const recommendedInternships = store.internships.slice(0, 2);

  return `
    <div class="dashboard-wrapper">
      <!-- STUDENT SIDEBAR -->
      <aside class="dashboard-sidebar">
        <div class="sidebar-brand">
          <div class="brand-icon-wrapper" style="width: 34px; height: 34px;">
            ${renderIcon('sparkles', '', 18)}
          </div>
          <span style="font-family: var(--font-heading); font-weight: 800; font-size: 1.15rem; color: var(--color-primary-plum);">SkillBridge</span>
        </div>

        <ul class="sidebar-menu">
          <li>
            <a class="sidebar-link active" onclick="window.appNavigate('student-dashboard')">
              ${renderIcon('trendingUp', '', 18)} Overview
            </a>
          </li>
          <li>
            <a class="sidebar-link" onclick="window.appNavigate('explore')">
              ${renderIcon('search', '', 18)} Explore Internships
            </a>
          </li>
          <li>
            <a class="sidebar-link" onclick="window.appNavigate('applications')">
              ${renderIcon('briefcase', '', 18)} My Applications
              <span class="badge badge-plum" style="margin-left: auto; font-size: 0.72rem; padding: 0.15rem 0.5rem;">${totalApps}</span>
            </a>
          </li>
          <li>
            <a class="sidebar-link" onclick="window.appNavigate('resume-analyzer')">
              ${renderIcon('fileText', '', 18)} Resume Analyzer
              <span class="badge badge-rose" style="margin-left: auto; font-size: 0.72rem; padding: 0.15rem 0.45rem;">AI</span>
            </a>
          </li>
          <li>
            <a class="sidebar-link" onclick="window.appNavigate('profile')">
              ${renderIcon('user', '', 18)} My Profile
            </a>
          </li>
          <li>
            <a class="sidebar-link" onclick="window.appNavigate('notifications')">
              ${renderIcon('bell', '', 18)} Notifications
              <span class="badge badge-mauve" style="margin-left: auto; font-size: 0.72rem; padding: 0.15rem 0.5rem;">${store.notifications.filter(n => !n.read).length}</span>
            </a>
          </li>
          <li>
            <a class="sidebar-link" onclick="window.appNavigate('settings')">
              ${renderIcon('settings', '', 18)} Settings
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}" alt="${user.name}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--color-dusty-rose);">
            <div style="overflow: hidden;">
              <div style="font-weight: 700; font-size: 0.88rem; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${user.name}</div>
              <div style="font-size: 0.75rem; color: var(--color-text-muted);">Student Member</div>
            </div>
          </div>
          <button onclick="window.handleLogout()" class="btn btn-sm btn-ghost" style="width: 100%; justify-content: flex-start; color: var(--color-error);">
            ${renderIcon('logOut', '', 16)} Logout
          </button>
        </div>
      </aside>

      <!-- MAIN DASHBOARD CONTENT -->
      <main class="dashboard-main">
        <!-- Welcome Banner -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h1 style="font-size: 2rem; margin-bottom: 0.35rem;">Welcome Back, ${user.name}!</h1>
            <p style="color: var(--color-text-secondary); font-size: 1.05rem;">Your next career opportunity is waiting for you.</p>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button onclick="window.appNavigate('resume-analyzer')" class="btn btn-secondary">
              ${renderIcon('sparkles', '', 16)} Resume Health Check
            </button>
            <button onclick="window.appNavigate('explore')" class="btn btn-primary">
              ${renderIcon('search', '', 16)} Find Internships
            </button>
          </div>
        </div>

        <!-- 4 Stat Metric Cards -->
        <div class="metric-row">
          <div class="metric-card">
            <div>
              <div style="font-size: 0.82rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase;">Total Applications</div>
              <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary-plum); font-family: var(--font-heading); margin-top: 0.2rem;">${totalApps}</div>
              <div style="font-size: 0.78rem; color: var(--color-text-secondary); margin-top: 0.25rem;">2 in review</div>
            </div>
            <div class="metric-icon-wrap">
              ${renderIcon('briefcase', '', 22)}
            </div>
          </div>

          <div class="metric-card">
            <div>
              <div style="font-size: 0.82rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase;">Shortlisted</div>
              <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary-plum); font-family: var(--font-heading); margin-top: 0.2rem;">${shortlisted}</div>
              <div style="font-size: 0.78rem; color: var(--color-success); font-weight: 600; margin-top: 0.25rem;">Top 10% Candidate</div>
            </div>
            <div class="metric-icon-wrap" style="background-color: var(--color-dusty-rose-light); color: #7A424F;">
              ${renderIcon('award', '', 22)}
            </div>
          </div>

          <div class="metric-card">
            <div>
              <div style="font-size: 0.82rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase;">Interviews</div>
              <div style="font-size: 2rem; font-weight: 800; color: var(--color-primary-plum); font-family: var(--font-heading); margin-top: 0.2rem;">${interviews}</div>
              <div style="font-size: 0.78rem; color: var(--color-primary-plum); font-weight: 600; margin-top: 0.25rem;">Nov 14th scheduled</div>
            </div>
            <div class="metric-icon-wrap" style="background-color: var(--color-info-bg); color: var(--color-primary-plum);">
              ${renderIcon('clock', '', 22)}
            </div>
          </div>

          <div class="metric-card">
            <div>
              <div style="font-size: 0.82rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase;">Rejected</div>
              <div style="font-size: 2rem; font-weight: 800; color: var(--color-text-muted); font-family: var(--font-heading); margin-top: 0.2rem;">${rejected}</div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted); margin-top: 0.25rem;">0% attrition</div>
            </div>
            <div class="metric-icon-wrap" style="background-color: var(--color-lavender-subtle); color: var(--color-text-muted);">
              ${renderIcon('checkCircle', '', 22)}
            </div>
          </div>
        </div>

        <!-- 2 Column Analytics & Recommendations -->
        <div style="display: grid; grid-template-columns: 1.55fr 1fr; gap: 1.75rem; margin-bottom: 2rem;">
          <!-- Application Analytics & Activity -->
          <div class="card" style="padding: 1.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
              <div>
                <h3 style="font-size: 1.15rem;">Application Activity & Pipeline</h3>
                <p style="font-size: 0.84rem; color: var(--color-text-secondary);">Your application funnel velocity over recent months</p>
              </div>
              <span class="badge badge-plum">High Engagement</span>
            </div>

            <!-- Soft Floral Minimalist SVG Bar Chart -->
            <div style="padding: 1.5rem 0 0.5rem;">
              <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 160px; padding: 0 1rem; border-bottom: 1px solid var(--color-border);">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                  <div style="width: 38px; height: 45px; background: var(--color-soft-lavender); border-radius: 8px 8px 0 0;"></div>
                  <span style="font-size: 0.78rem; color: var(--color-text-muted);">Aug</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                  <div style="width: 38px; height: 85px; background: var(--color-dusty-rose); border-radius: 8px 8px 0 0;"></div>
                  <span style="font-size: 0.78rem; color: var(--color-text-muted);">Sep</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                  <div style="width: 38px; height: 130px; background: var(--color-secondary-mauve); border-radius: 8px 8px 0 0;"></div>
                  <span style="font-size: 0.78rem; color: var(--color-text-muted);">Oct</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                  <div style="width: 38px; height: 155px; background: var(--color-primary-plum); border-radius: 8px 8px 0 0; box-shadow: 0 4px 12px rgba(113, 77, 105, 0.3);"></div>
                  <span style="font-size: 0.78rem; font-weight: 700; color: var(--color-primary-plum);">Nov (Peak)</span>
                </div>
              </div>
            </div>

            <!-- Recent Activity Items -->
            <div style="margin-top: 1.5rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem;">
              <h4 style="font-size: 0.95rem; margin-bottom: 0.85rem;">Recent Milestone Updates</h4>
              <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                <div style="display: flex; align-items: center; gap: 0.85rem; font-size: 0.88rem;">
                  <div style="width: 8px; height: 8px; border-radius: 50%; background-color: var(--color-success); flex-shrink: 0;"></div>
                  <span style="color: var(--color-text-dark); font-weight: 600;">Technical Interview Confirmed</span>
                  <span style="color: var(--color-text-secondary); margin-left: auto; font-size: 0.8rem;">Linear Systems • 2h ago</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.85rem; font-size: 0.88rem;">
                  <div style="width: 8px; height: 8px; border-radius: 50%; background-color: var(--color-primary-plum); flex-shrink: 0;"></div>
                  <span style="color: var(--color-text-dark); font-weight: 600;">Shortlisted for AI & LLM Intern</span>
                  <span style="color: var(--color-text-secondary); margin-left: auto; font-size: 0.8rem;">CognitiveCore • 1d ago</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Profile Completion & AI Advice -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Profile Completion Card -->
            <div class="card" style="padding: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <h4 style="font-size: 1.05rem;">Profile Strength</h4>
                <span style="font-weight: 700; color: var(--color-primary-plum); font-size: 1.1rem;">85%</span>
              </div>
              <div style="width: 100%; height: 9px; background-color: var(--color-soft-lavender); border-radius: 99px; overflow: hidden; margin-bottom: 0.85rem;">
                <div style="width: 85%; height: 100%; background: linear-gradient(90deg, #A0849D 0%, #714D69 100%);"></div>
              </div>
              <p style="font-size: 0.82rem; color: var(--color-text-secondary); margin-bottom: 1rem;">
                Add 2 more portfolio project links to achieve a 100% All-Star profile badge.
              </p>
              <button onclick="window.appNavigate('profile')" class="btn btn-sm btn-secondary" style="width: 100%;">
                Complete Profile
              </button>
            </div>

            <!-- AI Career Suggestions Card -->
            <div class="card" style="padding: 1.5rem; background: linear-gradient(145deg, var(--color-bg-card) 0%, var(--color-lavender-subtle) 100%); border-color: var(--color-dusty-rose);">
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.75rem;">
                <div class="brand-icon-wrapper" style="width: 30px; height: 30px;">
                  ${renderIcon('sparkles', '', 16)}
                </div>
                <h4 style="font-size: 1rem;">AI Career Insight</h4>
              </div>
              <p style="font-size: 0.86rem; color: var(--color-text-secondary); line-height: 1.55; margin-bottom: 1rem;">
                Roles requiring <strong>React + TypeScript + Next.js</strong> have 42% higher compensation packages in the current hiring cycle.
              </p>
              <button onclick="window.appNavigate('resume-analyzer')" class="btn btn-sm btn-outline" style="width: 100%;">
                Analyze Skills Gap
              </button>
            </div>

            <!-- Upcoming Deadlines -->
            <div class="card" style="padding: 1.5rem;">
              <h4 style="font-size: 1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                ${renderIcon('clock', 'text-muted', 16)} Upcoming Deadlines
              </h4>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                  <div>
                    <div style="font-weight: 600;">Linear Systems</div>
                    <div style="font-size: 0.76rem; color: var(--color-text-muted);">Frontend Role</div>
                  </div>
                  <span class="badge badge-warning">Dec 15, 2026</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                  <div>
                    <div style="font-weight: 600;">CognitiveCore AI</div>
                    <div style="font-size: 0.76rem; color: var(--color-text-muted);">LLM Systems</div>
                  </div>
                  <span class="badge badge-rose">Dec 20, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommended Internships Section -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 1.25rem;">Recommended For Your Skill Profile</h3>
              <p style="font-size: 0.86rem; color: var(--color-text-secondary);">Direct matches based on your React, Node.js and TypeScript skills</p>
            </div>
            <button onclick="window.appNavigate('explore')" class="btn btn-sm btn-ghost">
              Browse All ${renderIcon('chevronRight', '', 16)}
            </button>
          </div>

          <div class="internships-grid">
            ${recommendedInternships.map(i => `
              <div class="internship-card">
                <div>
                  <div class="internship-header">
                    <div class="internship-company-meta">
                      <img src="${i.logo}" alt="${i.company}" class="company-avatar">
                      <div>
                        <h4 class="internship-title">${i.title}</h4>
                        <p class="internship-company-name">${i.company} • ${i.location}</p>
                      </div>
                    </div>
                    <span class="badge badge-plum">${i.type}</span>
                  </div>

                  <p style="font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 1rem;">
                    ${i.description}
                  </p>

                  <div class="internship-tags">
                    ${i.skillsRequired.map(s => `<span class="badge badge-mauve">${s}</span>`).join('')}
                  </div>
                </div>

                <div class="internship-footer">
                  <div>
                    <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Stipend</div>
                    <div class="stipend-amount">${i.stipend}</div>
                  </div>
                  <div style="display: flex; gap: 0.5rem;">
                    <button onclick="window.openDetailModal('${i._id}')" class="btn btn-sm btn-secondary">Details</button>
                    <button onclick="window.openApplyModal('${i._id}')" class="btn btn-sm btn-primary">Apply</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </main>
    </div>
  `;
}
