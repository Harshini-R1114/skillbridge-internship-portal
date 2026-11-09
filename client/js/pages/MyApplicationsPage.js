import { store } from '../state.js';
import { renderIcon } from '../icons.js';

export function renderMyApplicationsPage() {
  const user = store.user || { _id: 'usr_student_01' };
  const applications = store.applications.filter(a => a.student === user._id);

  const stages = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Accepted'];

  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 5rem; max-width: 1040px;">
      <!-- Page Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="badge badge-plum" style="margin-bottom: 0.5rem;">Pipeline Tracking</span>
          <h1 style="font-size: 2.5rem;">My Active Applications</h1>
          <p style="color: var(--color-text-secondary); margin-top: 0.25rem;">
            Follow your candidacy status through every review stage with transparent hiring timelines.
          </p>
        </div>
        <button onclick="window.appNavigate('explore')" class="btn btn-primary">
          ${renderIcon('plus', '', 16)} Apply to More Roles
        </button>
      </div>

      ${applications.length === 0 ? `
        <div class="card" style="padding: 4rem 2rem; text-align: center;">
          <div class="brand-icon-wrapper" style="width: 54px; height: 54px; margin: 0 auto 1.25rem;">
            ${renderIcon('briefcase', '', 24)}
          </div>
          <h3 style="font-size: 1.3rem; margin-bottom: 0.4rem;">No Applications Submitted Yet</h3>
          <p style="color: var(--color-text-secondary); max-width: 440px; margin: 0 auto 1.5rem;">
            Explore our curated directory of paid internships and start your application journey today.
          </p>
          <button onclick="window.appNavigate('explore')" class="btn btn-primary">
            Explore Internships Now
          </button>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          ${applications.map(app => {
            const currentStageIdx = getStageIndex(app.status);

            return `
              <div class="card" style="padding: 2.25rem; border-color: var(--color-dusty-rose); box-shadow: var(--shadow-card);">
                <!-- Card Header -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.75rem; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1.25rem;">
                  <div>
                    <span class="badge ${getStatusBadge(app.status)}" style="margin-bottom: 0.5rem;">${app.status}</span>
                    <h2 style="font-size: 1.45rem; margin-bottom: 0.2rem;">${app.internshipTitle}</h2>
                    <p style="color: var(--color-primary-plum); font-weight: 600; font-size: 0.95rem;">
                      ${app.company} • <span style="color: var(--color-text-secondary); font-weight: 400;">Submitted on ${app.appliedAt}</span>
                    </p>
                  </div>

                  <div style="text-align: right;">
                    <div style="font-size: 0.8rem; color: var(--color-text-muted);">Application ID</div>
                    <div style="font-family: monospace; font-size: 0.88rem; font-weight: 600;">${app._id}</div>
                  </div>
                </div>

                <!-- 5-Stage Visual Progress Timeline -->
                <div style="margin-bottom: 2rem; padding: 1.25rem; background-color: var(--color-bg-card-alt); border-radius: 16px; border: 1px solid var(--color-border);">
                  <div style="display: flex; justify-content: space-between; position: relative;">
                    <!-- Connecting background line -->
                    <div style="position: absolute; top: 18px; left: 25px; right: 25px; height: 3px; background-color: var(--color-border); z-index: 1;"></div>
                    
                    ${stages.map((stg, idx) => {
                      const isDone = idx <= currentStageIdx;
                      const isCurrent = idx === currentStageIdx;

                      return `
                        <div style="display: flex; flex-direction: column; align-items: center; position: relative; z-index: 2; width: 100px; text-align: center;">
                          <div style="
                            width: 36px; 
                            height: 36px; 
                            border-radius: 50%; 
                            background-color: ${isDone ? 'var(--color-primary-plum)' : 'var(--color-bg-card)'}; 
                            color: ${isDone ? '#FFFFFF' : 'var(--color-text-muted)'};
                            border: 2px solid ${isDone ? 'var(--color-primary-plum)' : 'var(--color-border)'};
                            display: flex; 
                            align-items: center; 
                            justify-content: center;
                            font-weight: 700;
                            font-size: 0.85rem;
                            margin-bottom: 0.5rem;
                            box-shadow: ${isCurrent ? '0 0 0 4px var(--color-soft-lavender)' : 'none'};
                          ">
                            ${isDone ? '✓' : idx + 1}
                          </div>
                          <span style="font-size: 0.78rem; font-weight: ${isCurrent ? '700' : '500'}; color: ${isCurrent ? 'var(--color-primary-plum)' : 'var(--color-text-secondary)'};">
                            ${stg}
                          </span>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>

                <!-- Recruiter Notes / Cover Note Details -->
                <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 1.5rem;">
                  <div>
                    <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--color-text-dark);">Your Cover Statement:</h4>
                    <p style="font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.6; background-color: var(--color-lavender-subtle); padding: 0.85rem 1rem; border-radius: 10px; border-left: 3px solid var(--color-primary-plum);">
                      "${app.coverNote || 'Excited to bring my technical proficiencies and problem-solving drive to your engineering team.'}"
                    </p>
                  </div>

                  <div>
                    <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--color-text-dark);">Hiring Committee Feedback:</h4>
                    <div style="font-size: 0.88rem; color: var(--color-text-dark); background-color: var(--color-bg-card-alt); padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid var(--color-border);">
                      ${app.feedback ? `
                        <span style="color: var(--color-success); font-weight: 600;">✓ Feedback: </span> ${app.feedback}
                      ` : `
                        <span style="color: var(--color-text-muted);">Application under active review with department leads. You will receive an email update soon.</span>
                      `}
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
}

function getStageIndex(status) {
  switch (status) {
    case 'Applied': return 0;
    case 'Under Review': return 1;
    case 'Shortlisted': return 2;
    case 'Interview': return 3;
    case 'Accepted': return 4;
    case 'Rejected': return 1;
    default: return 0;
  }
}

function getStatusBadge(status) {
  switch (status) {
    case 'Shortlisted': return 'badge-success';
    case 'Interview': return 'badge-plum';
    case 'Accepted': return 'badge-success';
    case 'Under Review': return 'badge-warning';
    case 'Rejected': return 'badge-error';
    default: return 'badge-mauve';
  }
}
