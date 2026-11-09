import { store } from '../state.js';
import { renderIcon } from '../icons.js';

export function renderActiveModal() {
  const modalName = store.activeModal;
  const data = store.modalData;

  if (!modalName) return '';

  switch (modalName) {
    case 'apply':
      return renderApplyModal(data);
    case 'detail':
      return renderDetailModal(data);
    case 'create-internship':
      return renderCreateInternshipModal();
    case 'edit-profile':
      return renderEditProfileModal();
    default:
      return '';
  }
}

function renderApplyModal(internship) {
  if (!internship) return '';
  const user = store.user || { name: 'Aanya Sharma', email: 'student@skillbridge.edu' };

  return `
    <div class="modal-overlay" onclick="if(event.target === this) window.closeModal()">
      <div class="modal-content" style="max-width: 580px; padding: 2.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">
          <div>
            <span class="badge badge-plum" style="margin-bottom: 0.4rem;">Submit Candidacy</span>
            <h2 style="font-size: 1.4rem;">Apply for ${internship.title}</h2>
            <p style="font-size: 0.88rem; color: var(--color-text-secondary);">${internship.company} • ${internship.location}</p>
          </div>
          <button onclick="window.closeModal()" class="btn btn-ghost" style="padding: 0.4rem; border-radius: 50%;">
            ${renderIcon('x', '', 20)}
          </button>
        </div>

        <form onsubmit="window.handleApplicationSubmit(event, '${internship._id}')">
          <div style="background-color: var(--color-lavender-subtle); padding: 1rem; border-radius: 12px; margin-bottom: 1.25rem; border: 1px solid var(--color-border);">
            <div style="font-size: 0.86rem; color: var(--color-text-dark); margin-bottom: 0.25rem;">
              <strong>Applying as:</strong> ${user.name} (${user.email})
            </div>
            <div style="font-size: 0.82rem; color: var(--color-text-secondary);">
              Attached Resume: <em>${user.name.replace(' ', '_')}_Resume_2026.pdf</em> (ATS Verified)
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Cover Note / Why Are You a Great Fit?</label>
            <textarea id="appCoverNote" class="form-textarea" rows="4" placeholder="Briefly highlight your relevant projects, why you're enthusiastic about ${internship.company}, and your availability..." required>I am thrilled to apply for this ${internship.title} role. With hands-on experience in modern web architecture, problem-solving, and building performant systems, I am eager to contribute immediately to ${internship.company}'s engineering initiatives.</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Portfolio or GitHub URL (Optional)</label>
            <input type="url" id="appPortfolioUrl" class="form-input" placeholder="https://github.com/your-username" value="https://github.com/aanya-sharma-dev">
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem;">
            <button type="button" onclick="window.closeModal()" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">
              ${renderIcon('sparkles', '', 16)} Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderDetailModal(internship) {
  if (!internship) return '';

  return `
    <div class="modal-overlay" onclick="if(event.target === this) window.closeModal()">
      <div class="modal-content" style="max-width: 680px; padding: 2.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <img src="${internship.logo}" alt="${internship.company}" style="width: 56px; height: 56px; border-radius: 14px; object-fit: cover; border: 1px solid var(--color-border);">
            <div>
              <h2 style="font-size: 1.45rem; margin-bottom: 0.2rem;">${internship.title}</h2>
              <p style="color: var(--color-primary-plum); font-weight: 600; font-size: 0.95rem;">${internship.company} • ${internship.location}</p>
            </div>
          </div>
          <button onclick="window.closeModal()" class="btn btn-ghost" style="padding: 0.4rem; border-radius: 50%;">
            ${renderIcon('x', '', 20)}
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; background-color: var(--color-bg-card-alt); padding: 1rem 1.25rem; border-radius: 14px; border: 1px solid var(--color-border); margin-bottom: 1.5rem;">
          <div>
            <div style="font-size: 0.76rem; color: var(--color-text-muted); text-transform: uppercase;">Stipend</div>
            <div style="font-size: 1.1rem; font-weight: 700; color: var(--color-primary-plum);">${internship.stipend}</div>
          </div>
          <div>
            <div style="font-size: 0.76rem; color: var(--color-text-muted); text-transform: uppercase;">Modality</div>
            <div style="font-size: 1.1rem; font-weight: 700;">${internship.type}</div>
          </div>
          <div>
            <div style="font-size: 0.76rem; color: var(--color-text-muted); text-transform: uppercase;">Duration</div>
            <div style="font-size: 1.1rem; font-weight: 700;">${internship.duration}</div>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1.05rem; margin-bottom: 0.6rem;">Role Overview</h4>
          <p style="font-size: 0.92rem; color: var(--color-text-secondary); line-height: 1.65;">
            ${internship.description}
          </p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1.05rem; margin-bottom: 0.6rem;">Candidate Requirements</h4>
          <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.9rem; color: var(--color-text-secondary);">
            ${(internship.requirements || []).map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1.05rem; margin-bottom: 0.6rem;">Perks & Benefits</h4>
          <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.9rem; color: var(--color-text-secondary);">
            ${(internship.perks || []).map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 1.05rem; margin-bottom: 0.6rem;">Required Skills</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.45rem;">
            ${(internship.skillsRequired || []).map(s => `<span class="badge badge-mauve">${s}</span>`).join('')}
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem;">
          <button onclick="window.closeModal()" class="btn btn-secondary">Close</button>
          <button onclick="window.closeModal(); window.openApplyModal('${internship._id}')" class="btn btn-primary">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderCreateInternshipModal() {
  return `
    <div class="modal-overlay" onclick="if(event.target === this) window.closeModal()">
      <div class="modal-content" style="max-width: 620px; padding: 2.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">
          <div>
            <span class="badge badge-plum" style="margin-bottom: 0.4rem;">Employer Action</span>
            <h2 style="font-size: 1.4rem;">Post New Career Internship</h2>
          </div>
          <button onclick="window.closeModal()" class="btn btn-ghost" style="padding: 0.4rem; border-radius: 50%;">
            ${renderIcon('x', '', 20)}
          </button>
        </div>

        <form onsubmit="window.handleCreateInternshipSubmit(event)">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Role Title</label>
              <input type="text" id="newIntTitle" class="form-input" placeholder="e.g. AI Research Intern" required>
            </div>
            <div class="form-group">
              <label class="form-label">Hiring Organization</label>
              <input type="text" id="newIntCompany" class="form-input" placeholder="e.g. Acme Tech Labs" required>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Discipline</label>
              <select id="newIntCategory" class="form-select">
                <option value="Software Engineering">Software Engineering</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Data Science">Data Science</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Modality</label>
              <select id="newIntType" class="form-select">
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Duration</label>
              <input type="text" id="newIntDuration" class="form-input" placeholder="e.g. 6 Months" value="6 Months">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Monthly Stipend</label>
              <input type="text" id="newIntStipend" class="form-input" placeholder="e.g. $4,500 / month" value="$4,500 / month" required>
            </div>
            <div class="form-group">
              <label class="form-label">Location</label>
              <input type="text" id="newIntLocation" class="form-input" placeholder="e.g. San Francisco, CA" value="Remote (US & Global)">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Required Skills (Comma separated)</label>
            <input type="text" id="newIntSkills" class="form-input" placeholder="e.g. React, TypeScript, Node.js, Git" value="React, TypeScript, Node.js, Git">
          </div>

          <div class="form-group">
            <label class="form-label">Role Description</label>
            <textarea id="newIntDescription" class="form-textarea" rows="3" placeholder="Brief summary of duties and responsibilities...">Join our core product engineering team to build scalable full-stack applications with contemporary React and Node.js architectures.</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem;">
            <button type="button" onclick="window.closeModal()" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">
              ${renderIcon('plus', '', 16)} Publish Internship
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderEditProfileModal() {
  const user = store.user || {};

  return `
    <div class="modal-overlay" onclick="if(event.target === this) window.closeModal()">
      <div class="modal-content" style="max-width: 560px; padding: 2.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">
          <h2 style="font-size: 1.4rem;">Edit Student Profile</h2>
          <button onclick="window.closeModal()" class="btn btn-ghost" style="padding: 0.4rem; border-radius: 50%;">
            ${renderIcon('x', '', 20)}
          </button>
        </div>

        <form onsubmit="window.handleEditProfileSubmit(event)">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" id="editProfileName" class="form-input" value="${user.name || ''}" required>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">University / College</label>
              <input type="text" id="editProfileCollege" class="form-input" value="${user.college || ''}">
            </div>
            <div class="form-group">
              <label class="form-label">Department / Major</label>
              <input type="text" id="editProfileDepartment" class="form-input" value="${user.department || ''}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="text" id="editProfilePhone" class="form-input" value="${user.phone || ''}">
          </div>

          <div class="form-group">
            <label class="form-label">Bio & Professional Summary</label>
            <textarea id="editProfileBio" class="form-textarea" rows="3">${user.bio || ''}</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem;">
            <button type="button" onclick="window.closeModal()" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
