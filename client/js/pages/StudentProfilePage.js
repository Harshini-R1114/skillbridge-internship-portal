import { store } from '../state.js';
import { renderIcon } from '../icons.js';

export function renderStudentProfilePage() {
  const user = store.user || {
    name: 'Aanya Sharma',
    email: 'student@skillbridge.edu',
    college: 'Stanford University (CS Department)',
    department: 'Computer Science & AI',
    graduationYear: '2026',
    phone: '+1 (555) 382-9014',
    bio: 'Passionate frontend & full-stack developer with an eye for minimalist design systems and performant React applications.',
    skills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'MongoDB', 'Python', 'Git', 'Figma'],
    resumeUrl: '/uploads/resumes/sample-resume.pdf',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  };

  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 5rem; max-width: 980px;">
      <!-- Profile Header Card -->
      <div class="card" style="margin-bottom: 2rem; overflow: hidden;">
        <!-- Floral Pastel Banner -->
        <div style="height: 140px; background: linear-gradient(135deg, #714D69 0%, #A0849D 50%, #D3B3B8 100%); position: relative;">
          <div style="position: absolute; bottom: 15px; right: 20px;">
            <button onclick="window.openEditProfileModal()" class="btn btn-sm btn-secondary" style="background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px);">
              ${renderIcon('settings', '', 14)} Edit Profile
            </button>
          </div>
        </div>

        <!-- Avatar & Meta Info -->
        <div style="padding: 0 2rem 2rem; position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: -60px; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; align-items: flex-end; gap: 1.5rem;">
              <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}" alt="${user.name}" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 4px solid var(--color-bg-card); box-shadow: var(--shadow-sm);">
              <div>
                <h1 style="font-size: 1.85rem; line-height: 1.2;">${user.name}</h1>
                <p style="color: var(--color-primary-plum); font-weight: 600; font-size: 0.95rem;">${user.department} • Class of ${user.graduationYear || '2026'}</p>
                <p style="color: var(--color-text-secondary); font-size: 0.86rem;">${user.college}</p>
              </div>
            </div>

            <span class="badge badge-success" style="padding: 0.4rem 0.9rem; font-size: 0.82rem;">
              ✓ Open to Fall/Spring Internships
            </span>
          </div>

          <p style="color: var(--color-text-secondary); font-size: 0.95rem; line-height: 1.65; max-width: 800px; margin-bottom: 1.5rem;">
            ${user.bio || 'Passionate software engineering student eager to learn and make an impact on real-world systems.'}
          </p>

          <div style="display: flex; gap: 2rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem; font-size: 0.88rem; color: var(--color-text-secondary); flex-wrap: wrap;">
            <div><strong>Email:</strong> ${user.email}</div>
            <div><strong>Phone:</strong> ${user.phone || '+1 (555) 382-9014'}</div>
            <div><strong>Location:</strong> San Francisco Bay Area</div>
          </div>
        </div>
      </div>

      <!-- 2 Columns: Skills & Resume -->
      <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 2rem; margin-bottom: 2rem;">
        <!-- Technical Proficiencies -->
        <div class="card" style="padding: 1.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
            <h3 style="font-size: 1.15rem;">Skills & Competencies</h3>
            <span style="font-size: 0.82rem; color: var(--color-text-muted);">${(user.skills || []).length} Verified</span>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.5rem;">
            ${(user.skills || []).map(skill => `
              <span class="badge badge-mauve" style="padding: 0.35rem 0.8rem; font-size: 0.86rem;">
                ${skill}
              </span>
            `).join('')}
          </div>

          <!-- Add Skill Form -->
          <div style="display: flex; gap: 0.5rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem;">
            <input type="text" id="newSkillInput" class="form-input" style="padding: 0.5rem 0.8rem; font-size: 0.86rem;" placeholder="Add skill (e.g. Docker, GraphQL)...">
            <button onclick="window.handleAddProfileSkill()" class="btn btn-sm btn-primary">
              ${renderIcon('plus', '', 14)} Add
            </button>
          </div>
        </div>

        <!-- Resume File Card -->
        <div class="card" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
              <div class="brand-icon-wrapper" style="width: 32px; height: 32px;">
                ${renderIcon('fileText', '', 16)}
              </div>
              <h3 style="font-size: 1.15rem;">Active Resume</h3>
            </div>
            <p style="font-size: 0.86rem; color: var(--color-text-secondary); margin-bottom: 1rem;">
              Primary PDF resume attached to all your submitted applications.
            </p>
            <div style="background-color: var(--color-lavender-subtle); border: 1px solid var(--color-border); border-radius: 12px; padding: 0.85rem 1rem; display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
              <span style="color: var(--color-primary-plum);">${renderIcon('fileText', '', 20)}</span>
              <div>
                <div style="font-weight: 600; font-size: 0.88rem;">Aanya_Sharma_Resume_2026.pdf</div>
                <div style="font-size: 0.76rem; color: var(--color-text-muted);">Updated 2 weeks ago • 142 KB</div>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <button onclick="window.appNavigate('resume-analyzer')" class="btn btn-sm btn-secondary" style="flex: 1;">
              ${renderIcon('sparkles', '', 14)} ATS Rescan
            </button>
            <button onclick="alert('Viewing verified resume document.')" class="btn btn-sm btn-primary" style="flex: 1;">
              Preview PDF
            </button>
          </div>
        </div>
      </div>

      <!-- Experience & Projects Section -->
      <div class="card" style="padding: 2rem;">
        <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem;">Featured Academic & Personal Projects</h3>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="border-bottom: 1px solid var(--color-border); padding-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
              <h4 style="font-size: 1.05rem;">SkillBridge Career Intelligence Architecture</h4>
              <span class="badge badge-plum">Full Stack React & Node</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.55; margin-bottom: 0.6rem;">
              Engineered a full-stack career platform with high-contrast Soft Floral Luxury UI styling, integrated JWT authentication, automated resume ATS parsing, and live MongoDB application pipelines.
            </p>
            <div style="display: flex; gap: 0.4rem;">
              <span class="badge badge-mauve">React</span>
              <span class="badge badge-mauve">Express</span>
              <span class="badge badge-mauve">Tailwind CSS</span>
              <span class="badge badge-mauve">Node.js</span>
            </div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
              <h4 style="font-size: 1.05rem;">Neural Semantic Search Engine</h4>
              <span class="badge badge-rose">AI / Deep Learning</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.55; margin-bottom: 0.6rem;">
              Built a vector search API using PyTorch embeddings and cosine distance indexing to query 100,000+ technical articles with sub-50ms latency.
            </p>
            <div style="display: flex; gap: 0.4rem;">
              <span class="badge badge-mauve">Python</span>
              <span class="badge badge-mauve">PyTorch</span>
              <span class="badge badge-mauve">FastAPI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
