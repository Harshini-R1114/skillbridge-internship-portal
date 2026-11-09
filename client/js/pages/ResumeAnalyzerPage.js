import { store } from '../state.js';
import { api } from '../api.js';
import { renderIcon } from '../icons.js';

let latestAnalysis = null;
let isAnalyzing = false;

export function setAnalysisResult(result) {
  latestAnalysis = result;
}

export function renderResumeAnalyzerPage() {
  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 5rem; max-width: 1100px;">
      <!-- Header -->
      <div style="text-align: center; max-width: 680px; margin: 0 auto 3rem;">
        <span class="badge badge-plum" style="margin-bottom: 0.6rem;">
          ${renderIcon('sparkles', '', 14)} Enterprise ATS Simulation
        </span>
        <h1 style="font-size: 2.7rem; margin-bottom: 0.85rem;">AI Resume Diagnostics & Optimization</h1>
        <p style="color: var(--color-text-secondary); font-size: 1.1rem; line-height: 1.6;">
          Scan your resume against modern applicant tracking systems to identify keyword density gaps, quantifiable metrics, and unlock tailored internship recommendations.
        </p>
      </div>

      <!-- Upload Zone Card -->
      <div class="card" style="padding: 2.5rem; margin-bottom: 3rem;">
        <div style="display: flex; gap: 1rem; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap;">
          <div>
            <h3 style="font-size: 1.25rem;">Select Target Specialization</h3>
            <p style="font-size: 0.86rem; color: var(--color-text-secondary);">We benchmark your profile against real job postings in this discipline</p>
          </div>
          <select id="targetRoleSelect" class="form-select" style="max-width: 260px;">
            <option value="Software Engineering">Software Engineering</option>
            <option value="AI & Machine Learning">AI & Machine Learning</option>
            <option value="Data Science">Data Science</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Cloud & DevOps">Cloud & DevOps</option>
          </select>
        </div>

        <!-- Drag & Drop Zone -->
        <div id="dropZone" class="resume-analyzer-box">
          <input type="file" id="resumeFileInput" accept=".pdf,.doc,.docx,.txt" style="display: none;" onchange="window.handleResumeFileUpload(event)">
          <div class="brand-icon-wrapper" style="width: 58px; height: 58px; margin: 0 auto 1.25rem;">
            ${renderIcon('uploadCloud', '', 28)}
          </div>
          <h3 style="font-size: 1.2rem; margin-bottom: 0.4rem;">Drag and drop your resume file here</h3>
          <p style="font-size: 0.88rem; color: var(--color-text-secondary); margin-bottom: 1.25rem;">
            Supports PDF, DOCX, and TXT files up to 10MB
          </p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <button onclick="document.getElementById('resumeFileInput').click()" class="btn btn-primary">
              ${renderIcon('fileText', '', 16)} Browse Resume File
            </button>
            <button onclick="window.useSampleResume()" class="btn btn-secondary">
              ⚡ Load Sample Tech Resume
            </button>
          </div>
        </div>

        <!-- Paste Text Alternative -->
        <div style="margin-top: 1.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <label class="form-label" style="margin-bottom: 0;">Or paste resume contents directly:</label>
            <button onclick="document.getElementById('resumeTextPaste').value = ''" class="btn btn-sm btn-ghost">Clear</button>
          </div>
          <textarea id="resumeTextPaste" class="form-textarea" rows="4" placeholder="Paste your resume text, skills, and project descriptions here..."></textarea>
          <div style="display: flex; justify-content: flex-end; margin-top: 0.85rem;">
            <button id="btnAnalyzeResume" onclick="window.handleAnalyzeText()" class="btn btn-primary">
              ${renderIcon('sparkles', '', 16)} Analyze Resume with AI
            </button>
          </div>
        </div>
      </div>

      <!-- Analysis Results Section (Rendered when available) -->
      ${renderAnalysisResultsView()}
    </div>
  `;
}

function renderAnalysisResultsView() {
  if (!latestAnalysis) {
    return `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--color-text-muted);">
        <p style="font-size: 0.95rem;">Upload or paste your resume above to view your comprehensive ATS score report & skill breakdown.</p>
      </div>
    `;
  }

  const { atsScore, detectedSkills, missingSkills, suggestions, analysisSummary, recommendedInternships, skillMatchPercentage } = latestAnalysis;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (atsScore / 100) * circumference;

  return `
    <div id="resultsCard" class="card" style="padding: 2.75rem; border-color: var(--color-dusty-rose); box-shadow: var(--shadow-hover); animation: fadeIn 0.4s ease-out;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="badge badge-rose" style="margin-bottom: 0.5rem;">Diagnostic Report Generated</span>
          <h2 style="font-size: 1.9rem;">ATS Compatibility & Skill Gap Analysis</h2>
          <p style="color: var(--color-text-secondary); margin-top: 0.25rem;">Target Discipline: <strong>${latestAnalysis.targetRole || 'Software Engineering'}</strong></p>
        </div>
        <button onclick="window.printReport()" class="btn btn-outline btn-sm">
          ${renderIcon('fileText', '', 14)} Export PDF Report
        </button>
      </div>

      <!-- Circular Gauge & Score Summary Grid -->
      <div style="display: grid; grid-template-columns: 220px 1fr; gap: 3rem; align-items: center; margin-bottom: 2.75rem;">
        <!-- Circular Score Gauge -->
        <div class="score-circle-container">
          <svg class="score-circle-svg" viewBox="0 0 160 160">
            <circle class="score-circle-bg" cx="80" cy="80" r="70" />
            <circle class="score-circle-bar" cx="80" cy="80" r="70" 
              style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${strokeDashoffset};"
            />
          </svg>
          <div class="score-circle-text">
            <div class="score-number">${atsScore}</div>
            <div class="score-label">ATS Score</div>
          </div>
        </div>

        <div>
          <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.85rem;">
            <span class="badge ${atsScore >= 80 ? 'badge-success' : 'badge-warning'}">
              ${atsScore >= 80 ? '✓ High Interview Probability' : '⚠️ Action Required'}
            </span>
            <span style="font-size: 0.88rem; color: var(--color-text-secondary);">Benchmark: 75/100 Minimum for Enterprise Screening</span>
          </div>
          <p style="font-size: 1.05rem; line-height: 1.65; color: var(--color-text-dark); margin-bottom: 1.25rem;">
            ${analysisSummary}
          </p>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; background-color: var(--color-bg-card-alt); padding: 1rem 1.25rem; border-radius: 14px; border: 1px solid var(--color-border);">
            <div>
              <div style="font-size: 0.76rem; color: var(--color-text-muted); text-transform: uppercase;">Keyword Match</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-primary-plum);">${skillMatchPercentage}%</div>
            </div>
            <div>
              <div style="font-size: 0.76rem; color: var(--color-text-muted); text-transform: uppercase;">Detected Skills</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-success);">${detectedSkills.length}</div>
            </div>
            <div>
              <div style="font-size: 0.76rem; color: var(--color-text-muted); text-transform: uppercase;">Identified Gaps</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-error);">${missingSkills.length}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Breakdown Section -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2.75rem;">
        <!-- Detected Skills -->
        <div class="card" style="padding: 1.5rem; background-color: var(--color-bg-card-alt);">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <span style="color: var(--color-success);">${renderIcon('checkCircle', '', 20)}</span>
            <h4 style="font-size: 1.05rem;">Detected Competencies & Keywords</h4>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${detectedSkills.map(s => `
              <span class="badge badge-success" style="padding: 0.35rem 0.8rem; font-size: 0.84rem;">
                ✓ ${s}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Missing Recommended Skills -->
        <div class="card" style="padding: 1.5rem; background-color: var(--color-bg-card-alt);">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <span style="color: var(--color-error);">${renderIcon('alertCircle', '', 20)}</span>
            <h4 style="font-size: 1.05rem;">Missing High-Frequency Keywords</h4>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${missingSkills.map(s => `
              <span class="badge badge-error" style="padding: 0.35rem 0.8rem; font-size: 0.84rem;">
                + ${s}
              </span>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- AI Actionable Suggestions Checklist -->
      <div style="margin-bottom: 3rem;">
        <h3 style="font-size: 1.2rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          ${renderIcon('sparkles', 'text-muted', 18)} Personalized AI Enhancement Steps
        </h3>
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${suggestions.map((sug, idx) => `
            <div style="display: flex; align-items: flex-start; gap: 0.85rem; padding: 1rem 1.25rem; background-color: var(--color-bg-card-alt); border-radius: 12px; border: 1px solid var(--color-border);">
              <div style="width: 26px; height: 26px; border-radius: 50%; background-color: var(--color-soft-lavender); color: var(--color-primary-plum); display: flex; align-items: center; justify-content: center; font-size: 0.82rem; font-weight: 700; flex-shrink: 0;">
                ${idx + 1}
              </div>
              <p style="font-size: 0.92rem; color: var(--color-text-dark); line-height: 1.55;">${sug}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tailored Recommended Internships for this Resume -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <div>
            <h3 style="font-size: 1.25rem;">Tailored Matching Internships</h3>
            <p style="font-size: 0.86rem; color: var(--color-text-secondary);">Positions whose hiring criteria match your detected strengths</p>
          </div>
          <button onclick="window.appNavigate('explore')" class="btn btn-sm btn-ghost">Explore More</button>
        </div>

        <div class="internships-grid">
          ${(recommendedInternships || []).map(i => `
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
                <div class="internship-tags">
                  ${i.skillsRequired.slice(0, 3).map(s => `<span class="badge badge-mauve">${s}</span>`).join('')}
                </div>
              </div>
              <div class="internship-footer">
                <div class="stipend-amount">${i.stipend}</div>
                <button onclick="window.openApplyModal('${i._id}')" class="btn btn-sm btn-primary">Apply Now</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
