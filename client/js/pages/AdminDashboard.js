import { store } from '../state.js';
import { renderIcon } from '../icons.js';

export function renderAdminDashboard() {
  const user = store.user || { name: 'Dr. Evelyn Montgomery', role: 'admin' };
  const totalStudents = 142;
  const totalInternships = store.internships.length;
  const totalApplications = store.applications.length;
  const pendingApps = store.applications.filter(a => a.status === 'Pending' || a.status === 'Under Review').length;
  const shortlistedApps = store.applications.filter(a => a.status === 'Shortlisted').length;

  return `
    <div class="dashboard-wrapper">
      <!-- ADMIN SIDEBAR -->
      <aside class="dashboard-sidebar">
        <div class="sidebar-brand">
          <div class="brand-icon-wrapper" style="width: 34px; height: 34px; background: linear-gradient(135deg, #714D69 0%, #302632 100%);">
            ${renderIcon('shieldCheck', '', 18)}
          </div>
          <div>
            <div style="font-family: var(--font-heading); font-weight: 800; font-size: 1.15rem; color: var(--color-primary-plum); line-height: 1.1;">SkillBridge</div>
            <div style="font-size: 0.72rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase;">Admin Portal</div>
          </div>
        </div>

        <ul class="sidebar-menu">
          <li>
            <a class="sidebar-link active" onclick="window.appNavigate('admin-dashboard')">
              ${renderIcon('trendingUp', '', 18)} Overview
            </a>
          </li>
          <li>
            <a class="sidebar-link" onclick="window.openCreateInternshipModal()">
              ${renderIcon('plus', '', 18)} Post Internship
            </a>
          </li>
          <li>
            <a class="sidebar-link" onclick="window.appNavigate('explore')">
              ${renderIcon('briefcase', '', 18)} Manage Internships
              <span class="badge badge-plum" style="margin-left: auto; font-size: 0.72rem;">${totalInternships}</span>
            </a>
          </li>
          <li>
            <a class="sidebar-link" onclick="window.scrollToSection('recentApplicationsTable')">
              ${renderIcon('fileText', '', 18)} Manage Applications
              <span class="badge badge-rose" style="margin-left: auto; font-size: 0.72rem;">${totalApplications}</span>
            </a>
          </li>
          <li>
            <a class="sidebar-link" onclick="window.scrollToSection('studentManagementSection')">
              ${renderIcon('users', '', 18)} Student Directory
            </a>
          </li>
          <li>
            <a class="sidebar-link" onclick="window.appNavigate('notifications')">
              ${renderIcon('bell', '', 18)} Notifications
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
            <img src="${user.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'}" alt="${user.name}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--color-primary-plum);">
            <div style="overflow: hidden;">
              <div style="font-weight: 700; font-size: 0.88rem; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${user.name}</div>
              <div style="font-size: 0.75rem; color: var(--color-primary-plum); font-weight: 600;">System Administrator</div>
            </div>
          </div>
          <button onclick="window.handleLogout()" class="btn btn-sm btn-ghost" style="width: 100%; justify-content: flex-start; color: var(--color-error);">
            ${renderIcon('logOut', '', 16)} Logout
          </button>
        </div>
      </aside>

      <!-- ADMIN MAIN CONTENT -->
      <main class="dashboard-main">
        <!-- Top Admin Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h1 style="font-size: 2rem; margin-bottom: 0.35rem;">Administrative Console</h1>
            <p style="color: var(--color-text-secondary); font-size: 1.05rem;">Real-time pipeline metrics, applicant workflows, and employer listings.</p>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button onclick="window.openCreateInternshipModal()" class="btn btn-primary">
              ${renderIcon('plus', '', 16)} Post New Internship
            </button>
          </div>
        </div>

        <!-- 5 Key Administrative Stat Cards -->
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.15rem; margin-bottom: 2.25rem;">
          <div class="metric-card">
            <div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase;">Total Students</div>
              <div style="font-size: 1.85rem; font-weight: 800; color: var(--color-primary-plum); font-family: var(--font-heading); margin-top: 0.2rem;">${totalStudents}</div>
              <div style="font-size: 0.74rem; color: var(--color-success); font-weight: 600;">+18 this month</div>
            </div>
            <div class="metric-icon-wrap">${renderIcon('users', '', 20)}</div>
          </div>

          <div class="metric-card">
            <div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase;">Internships</div>
              <div style="font-size: 1.85rem; font-weight: 800; color: var(--color-primary-plum); font-family: var(--font-heading); margin-top: 0.2rem;">${totalInternships}</div>
              <div style="font-size: 0.74rem; color: var(--color-text-secondary);">Active openings</div>
            </div>
            <div class="metric-icon-wrap">${renderIcon('briefcase', '', 20)}</div>
          </div>

          <div class="metric-card">
            <div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase;">Applications</div>
              <div style="font-size: 1.85rem; font-weight: 800; color: var(--color-primary-plum); font-family: var(--font-heading); margin-top: 0.2rem;">${totalApplications}</div>
              <div style="font-size: 0.74rem; color: var(--color-text-secondary);">Across all roles</div>
            </div>
            <div class="metric-icon-wrap">${renderIcon('fileText', '', 20)}</div>
          </div>

          <div class="metric-card">
            <div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase;">Pending</div>
              <div style="font-size: 1.85rem; font-weight: 800; color: var(--color-warning); font-family: var(--font-heading); margin-top: 0.2rem;">${pendingApps}</div>
              <div style="font-size: 0.74rem; color: var(--color-warning); font-weight: 600;">Requires review</div>
            </div>
            <div class="metric-icon-wrap" style="background-color: var(--color-warning-bg); color: var(--color-warning);">${renderIcon('clock', '', 20)}</div>
          </div>

          <div class="metric-card">
            <div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase;">Shortlisted</div>
              <div style="font-size: 1.85rem; font-weight: 800; color: var(--color-success); font-family: var(--font-heading); margin-top: 0.2rem;">${shortlistedApps}</div>
              <div style="font-size: 0.74rem; color: var(--color-success); font-weight: 600;">In interview stage</div>
            </div>
            <div class="metric-icon-wrap" style="background-color: var(--color-success-bg); color: var(--color-success);">${renderIcon('checkCircle', '', 20)}</div>
          </div>
        </div>

        <!-- Applications Status Management Table -->
        <div id="recentApplicationsTable" class="card" style="padding: 1.75rem; margin-bottom: 2.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem;">
            <div>
              <h3 style="font-size: 1.25rem;">Candidate Application Funnel</h3>
              <p style="font-size: 0.86rem; color: var(--color-text-secondary);">Review applicants, update hiring status, and provide feedback</p>
            </div>
            <span class="badge badge-plum">Live Updates</span>
          </div>

          <div class="table-responsive">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Applied Internship</th>
                  <th>Institution</th>
                  <th>Applied Date</th>
                  <th>Current Status</th>
                  <th>Change Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${store.applications.map(app => `
                  <tr>
                    <td>
                      <div style="font-weight: 600;">${app.studentName}</div>
                      <div style="font-size: 0.78rem; color: var(--color-text-muted);">${app.studentEmail}</div>
                    </td>
                    <td>
                      <div style="font-weight: 600;">${app.internshipTitle}</div>
                      <div style="font-size: 0.78rem; color: var(--color-primary-plum);">${app.company}</div>
                    </td>
                    <td><span style="font-size: 0.86rem;">${app.studentCollege || 'Stanford University'}</span></td>
                    <td><span style="font-size: 0.86rem; color: var(--color-text-secondary);">${app.appliedAt}</span></td>
                    <td>
                      <span class="badge ${getStatusBadgeClass(app.status)}">${app.status}</span>
                    </td>
                    <td>
                      <select class="form-select" style="padding: 0.35rem 0.6rem; font-size: 0.82rem; width: 140px;" onchange="window.handleAdminStatusChange('${app._id}', this.value)">
                        <option value="Pending" ${app.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Under Review" ${app.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
                        <option value="Shortlisted" ${app.status === 'Shortlisted' ? 'selected' : ''}>Shortlisted</option>
                        <option value="Interview" ${app.status === 'Interview' ? 'selected' : ''}>Interview</option>
                        <option value="Accepted" ${app.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
                        <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                      </select>
                    </td>
                    <td>
                      <button onclick="window.viewApplicantDetail('${app._id}')" class="btn btn-sm btn-secondary">
                        Review
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Student Management Table -->
        <div id="studentManagementSection" class="card" style="padding: 1.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem;">
            <div>
              <h3 style="font-size: 1.25rem;">Active Student Registry</h3>
              <p style="font-size: 0.86rem; color: var(--color-text-secondary);">Manage registered student credentials, departments, and resume states</p>
            </div>
            <input type="text" class="form-input" style="max-width: 250px; font-size: 0.84rem; padding: 0.45rem 0.8rem;" placeholder="Search students...">
          </div>

          <div class="table-responsive">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Department & Year</th>
                  <th>Key Skills</th>
                  <th>Resume ATS</th>
                  <th>Applications</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">
                      <div>
                        <div style="font-weight: 600;">Aanya Sharma</div>
                        <div style="font-size: 0.76rem; color: var(--color-text-muted);">student@skillbridge.edu</div>
                      </div>
                    </div>
                  </td>
                  <td>Computer Science & AI (2026)</td>
                  <td>
                    <span class="badge badge-mauve">React</span>
                    <span class="badge badge-mauve">Node.js</span>
                    <span class="badge badge-mauve">TS</span>
                  </td>
                  <td><span class="badge badge-success">88/100</span></td>
                  <td><strong>3</strong> active</td>
                  <td><span class="badge badge-success">Active</span></td>
                </tr>
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">
                      <div>
                        <div style="font-weight: 600;">Liam Chen</div>
                        <div style="font-size: 0.76rem; color: var(--color-text-muted);">liam.chen@berkeley.edu</div>
                      </div>
                    </div>
                  </td>
                  <td>Data Science & Stats (2027)</td>
                  <td>
                    <span class="badge badge-mauve">Python</span>
                    <span class="badge badge-mauve">SQL</span>
                    <span class="badge badge-mauve">Pandas</span>
                  </td>
                  <td><span class="badge badge-success">92/100</span></td>
                  <td><strong>2</strong> active</td>
                  <td><span class="badge badge-success">Active</span></td>
                </tr>
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">
                      <div>
                        <div style="font-weight: 600;">Elena Rostova</div>
                        <div style="font-size: 0.76rem; color: var(--color-text-muted);">elena.r@mit.edu</div>
                      </div>
                    </div>
                  </td>
                  <td>UI/UX Design (2026)</td>
                  <td>
                    <span class="badge badge-mauve">Figma</span>
                    <span class="badge badge-mauve">Design Systems</span>
                  </td>
                  <td><span class="badge badge-success">90/100</span></td>
                  <td><strong>4</strong> active</td>
                  <td><span class="badge badge-success">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `;
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'Shortlisted': return 'badge-success';
    case 'Interview': return 'badge-plum';
    case 'Accepted': return 'badge-success';
    case 'Under Review': return 'badge-warning';
    case 'Rejected': return 'badge-error';
    default: return 'badge-mauve';
  }
}
