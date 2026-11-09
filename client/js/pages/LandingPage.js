import { store } from '../state.js';
import { renderIcon } from '../icons.js';

export function renderLandingPage() {
  const featuredInternships = store.internships.filter(i => i.featured).slice(0, 3);

  return `
    <!-- Ambient Floral Glows -->
    <div class="floral-ambient-bg">
      <div class="floral-glow floral-glow-1"></div>
      <div class="floral-glow floral-glow-2"></div>
      <div class="floral-glow floral-glow-3"></div>
    </div>

    <!-- 1. HERO SECTION -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div>
            <div class="hero-pill">
              ${renderIcon('sparkles', '', 16)}
              <span>AI-Powered Career Intelligence</span>
              <span style="opacity: 0.5;">•</span>
              <span style="font-weight: 500;">Batch 2026-27 Open</span>
            </div>

            <h1 class="hero-title">
              Your Dream Career Begins With The <span class="gradient-text">Right Opportunity.</span>
            </h1>

            <p class="hero-subtitle">
              Discover meaningful internships, unlock your potential and build your future with AI-powered career guidance, ATS-optimized resumes, and direct employer connections.
            </p>

            <!-- Hero Search Bar -->
            <div class="hero-search-box">
              <div class="hero-search-input-group">
                ${renderIcon('search', 'text-muted', 18)}
                <input type="text" id="heroSearchQuery" class="hero-search-input" placeholder="Role, skill, or keyword (e.g. React, AI, Design)...">
              </div>
              <div class="hero-search-divider"></div>
              <div class="hero-search-input-group" style="max-width: 170px;">
                ${renderIcon('mapPin', 'text-muted', 18)}
                <input type="text" id="heroSearchLocation" class="hero-search-input" placeholder="Location...">
              </div>
              <button id="btnHeroSearch" class="btn btn-primary">
                ${renderIcon('search', '', 16)} Search
              </button>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
              <button onclick="window.appNavigate('explore')" class="btn btn-primary btn-lg">
                Explore Opportunities ${renderIcon('arrowRight', '', 18)}
              </button>
              <button onclick="window.appNavigate('resume-analyzer')" class="btn btn-secondary btn-lg">
                ${renderIcon('fileText', '', 18)} Scan Resume with AI
              </button>
            </div>
          </div>

          <!-- Hero Visual Art & Floating Cards -->
          <div class="hero-visual-container">
            <div class="floating-stat-card floating-card-1">
              <div class="brand-icon-wrapper" style="width: 36px; height: 36px; border-radius: 10px;">
                ${renderIcon('award', '', 18)}
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-primary-plum);">95% Placement Rate</div>
                <div style="font-size: 0.78rem; color: var(--color-text-secondary);">Top Tech & Design Roles</div>
              </div>
            </div>

            <div class="hero-main-card">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Students collaborating" class="hero-illustration">
              
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span class="badge badge-plum">🔥 High Demand Internship</span>
                <span style="font-size: 0.82rem; font-weight: 600; color: var(--color-primary-plum);">Verified Partner</span>
              </div>
              
              <h3 style="font-size: 1.15rem; margin-bottom: 0.35rem;">Full Stack AI Systems Intern</h3>
              <p style="font-size: 0.88rem; color: var(--color-text-secondary); margin-bottom: 1rem;">CognitiveCore AI • San Francisco / Remote</p>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 0.85rem;">
                <div style="font-weight: 700; color: var(--color-primary-plum); font-size: 1.1rem;">$5,200 <span style="font-size: 0.8rem; font-weight: 400; color: var(--color-text-secondary);">/ mo</span></div>
                <button onclick="window.appNavigate('explore')" class="btn btn-sm btn-primary">Apply Now</button>
              </div>
            </div>

            <div class="floating-stat-card floating-card-2">
              <div style="background-color: var(--color-success-bg); color: var(--color-success); width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                ${renderIcon('users', '', 18)}
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">10,000+ Students</div>
                <div style="font-size: 0.78rem; color: var(--color-text-secondary);">Hired Globally in 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. TRUSTED COMPANIES -->
    <section class="trusted-section">
      <div class="container">
        <p class="trusted-title">Trusted by top talent & hiring managers at world-class organizations</p>
        <div class="trusted-logos">
          <div class="company-logo-text">${renderIcon('building', '', 20)} Google</div>
          <div class="company-logo-text">${renderIcon('building', '', 20)} Microsoft</div>
          <div class="company-logo-text">${renderIcon('building', '', 20)} Spotify</div>
          <div class="company-logo-text">${renderIcon('building', '', 20)} Adobe</div>
          <div class="company-logo-text">${renderIcon('building', '', 20)} Canva</div>
          <div class="company-logo-text">${renderIcon('building', '', 20)} Amazon</div>
        </div>
      </div>
    </section>

    <!-- 3. PLATFORM STATISTICS -->
    <section class="container">
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-number">500+</div>
          <div class="stat-label">Vetted Partner Companies</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">12,400+</div>
          <div class="stat-label">Verified Internships</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">95.4%</div>
          <div class="stat-label">Candidate Satisfaction Rate</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">$4,250</div>
          <div class="stat-label">Average Monthly Stipend</div>
        </div>
      </div>
    </section>

    <!-- 4. FEATURED INTERNSHIPS -->
    <section style="padding: 3rem 0 5rem;">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.25rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="badge badge-rose" style="margin-bottom: 0.5rem;">Curated Opportunities</span>
            <h2 style="font-size: 2.2rem;">Featured Career Openings</h2>
            <p style="color: var(--color-text-secondary); margin-top: 0.35rem;">Handpicked internships from verified tech and design leaders.</p>
          </div>
          <button onclick="window.appNavigate('explore')" class="btn btn-outline">
            View All ${store.internships.length} Internships ${renderIcon('chevronRight', '', 16)}
          </button>
        </div>

        <div class="internships-grid">
          ${featuredInternships.map(i => `
            <div class="internship-card">
              <div>
                <div class="internship-header">
                  <div class="internship-company-meta">
                    <img src="${i.logo}" alt="${i.company}" class="company-avatar">
                    <div>
                      <h4 class="internship-title">${i.title}</h4>
                      <p class="internship-company-name">${i.company} • <span style="color: var(--color-primary-plum); font-weight: 500;">${i.location}</span></p>
                    </div>
                  </div>
                  <span class="badge badge-plum">${i.type}</span>
                </div>

                <p style="font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 1rem;">
                  ${i.description}
                </p>

                <div class="internship-tags">
                  ${i.skillsRequired.slice(0, 3).map(skill => `
                    <span class="badge badge-mauve">${skill}</span>
                  `).join('')}
                  <span class="badge badge-rose">${i.duration}</span>
                </div>
              </div>

              <div class="internship-footer">
                <div>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Stipend</div>
                  <div class="stipend-amount">${i.stipend}</div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                  <button onclick="window.openDetailModal('${i._id}')" class="btn btn-sm btn-secondary">Details</button>
                  <button onclick="window.openApplyModal('${i._id}')" class="btn btn-sm btn-primary">Apply Now</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 5. WHY CHOOSE SKILLBRIDGE -->
    <section style="background-color: var(--color-lavender-subtle); padding: 5rem 0; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
      <div class="container">
        <div style="text-align: center; max-width: 650px; margin: 0 auto 3.5rem;">
          <span class="badge badge-plum" style="margin-bottom: 0.6rem;">Next-Gen Advantage</span>
          <h2 style="font-size: 2.3rem; margin-bottom: 0.85rem;">Why Ambitious Students Choose SkillBridge</h2>
          <p style="color: var(--color-text-secondary);">We combine intelligent algorithms with a human-centric career ethos to bridge the gap between academic study and elite industry roles.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.75rem;">
          <div class="card" style="padding: 2rem;">
            <div class="brand-icon-wrapper" style="margin-bottom: 1.25rem;">
              ${renderIcon('sparkles', '', 20)}
            </div>
            <h3 style="font-size: 1.2rem; margin-bottom: 0.6rem;">AI Career Alignment</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.6;">
              Deep semantic skill matching links your unique coursework, personal GitHub projects, and aspirations directly to high-fit roles.
            </p>
          </div>

          <div class="card" style="padding: 2rem;">
            <div class="brand-icon-wrapper" style="margin-bottom: 1.25rem;">
              ${renderIcon('shieldCheck', '', 20)}
            </div>
            <h3 style="font-size: 1.2rem; margin-bottom: 0.6rem;">100% Vetted Opportunities</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.6;">
              Every listing is authenticated by our industry partner board with clear stipends, verified mentors, and transparent growth paths.
            </p>
          </div>

          <div class="card" style="padding: 2rem;">
            <div class="brand-icon-wrapper" style="margin-bottom: 1.25rem;">
              ${renderIcon('fileText', '', 20)}
            </div>
            <h3 style="font-size: 1.2rem; margin-bottom: 0.6rem;">ATS Resume Optimizer</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.6;">
              Benchmark your CV against enterprise applicant tracking systems and receive actionable keyword insights before submitting.
            </p>
          </div>

          <div class="card" style="padding: 2rem;">
            <div class="brand-icon-wrapper" style="margin-bottom: 1.25rem;">
              ${renderIcon('trendingUp', '', 20)}
            </div>
            <h3 style="font-size: 1.2rem; margin-bottom: 0.6rem;">Real-Time Status Tracker</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.6;">
              Follow your applications at every phase with transparent 5-step milestone trackers and structured recruiter interview feedback.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. HOW IT WORKS -->
    <section style="padding: 5.5rem 0;">
      <div class="container">
        <div style="text-align: center; max-width: 600px; margin: 0 auto 3.5rem;">
          <span class="badge badge-rose" style="margin-bottom: 0.6rem;">Three Simple Steps</span>
          <h2 style="font-size: 2.3rem; margin-bottom: 0.85rem;">How SkillBridge Accelerates You</h2>
          <p style="color: var(--color-text-secondary);">From your first resume scan to signing your offer letter, our streamlined workflow makes career advancement frictionless.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; text-align: center;">
          <div style="position: relative;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background-color: var(--color-soft-lavender); color: var(--color-primary-plum); display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin: 0 auto 1.35rem; border: 2px solid var(--color-primary-plum);">
              1
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 0.6rem;">Create & Optimize Profile</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.6;">
              Upload your resume to our AI analyzer to auto-extract technical proficiencies and identify key missing strengths.
            </p>
          </div>

          <div style="position: relative;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background-color: var(--color-soft-lavender); color: var(--color-primary-plum); display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin: 0 auto 1.35rem; border: 2px solid var(--color-primary-plum);">
              2
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 0.6rem;">Match & 1-Click Apply</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.6;">
              Explore curated positions with advanced salary, remote, and skillset filters and submit customized applications instantly.
            </p>
          </div>

          <div style="position: relative;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background-color: var(--color-soft-lavender); color: var(--color-primary-plum); display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin: 0 auto 1.35rem; border: 2px solid var(--color-primary-plum);">
              3
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 0.6rem;">Track & Land The Offer</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.6;">
              Receive live alerts, prepare for interviews with tailored talking points, and launch your dream career.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. AI CAREER ASSISTANCE SPOTLIGHT -->
    <section style="background: linear-gradient(135deg, rgba(113, 77, 105, 0.08) 0%, rgba(227, 218, 231, 0.4) 100%); padding: 5rem 0; border-radius: 30px; margin: 0 1.5rem 5rem;">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center;">
          <div>
            <span class="badge badge-plum" style="margin-bottom: 0.75rem;">Intelligent Diagnostic</span>
            <h2 style="font-size: 2.4rem; line-height: 1.2; margin-bottom: 1rem;">
              Never Send an Unoptimized Resume Into the Void Again.
            </h2>
            <p style="color: var(--color-text-secondary); margin-bottom: 1.75rem; font-size: 1.05rem; line-height: 1.65;">
              Our AI engine simulates the exact parsing algorithms used by Fortune 500 applicant tracking systems. Get instant actionable recommendations, keyword density adjustments, and score improvements in under 5 seconds.
            </p>

            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 2rem;">
              <li style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.95rem; font-weight: 600;">
                <span style="color: var(--color-success);">${renderIcon('checkCircle', '', 20)}</span>
                Instant 0-100 ATS Compatibility Score
              </li>
              <li style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.95rem; font-weight: 600;">
                <span style="color: var(--color-success);">${renderIcon('checkCircle', '', 20)}</span>
                Detected Skills vs Critical Industry Gaps
              </li>
              <li style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.95rem; font-weight: 600;">
                <span style="color: var(--color-success);">${renderIcon('checkCircle', '', 20)}</span>
                Automated Tailored Internship Recommendations
              </li>
            </ul>

            <button onclick="window.appNavigate('resume-analyzer')" class="btn btn-primary btn-lg">
              ${renderIcon('sparkles', '', 18)} Try AI Resume Analyzer Free
            </button>
          </div>

          <div class="card" style="padding: 2.25rem; box-shadow: var(--shadow-hover); border-color: var(--color-dusty-rose);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">
              <div>
                <h4 style="font-size: 1.1rem;">Resume Diagnostic Preview</h4>
                <p style="font-size: 0.82rem; color: var(--color-text-muted);">Target: Full Stack & AI Engineering</p>
              </div>
              <span class="badge badge-success">ATS Ready: 92/100</span>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.86rem; margin-bottom: 0.4rem; font-weight: 600;">
                <span>Technical Keyword Match</span>
                <span>88%</span>
              </div>
              <div style="width: 100%; height: 8px; background-color: var(--color-soft-lavender); border-radius: 99px; overflow: hidden;">
                <div style="width: 88%; height: 100%; background-color: var(--color-primary-plum);"></div>
              </div>
            </div>

            <div style="margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.86rem; margin-bottom: 0.4rem; font-weight: 600;">
                <span>Quantifiable Impact Metrics</span>
                <span>94%</span>
              </div>
              <div style="width: 100%; height: 8px; background-color: var(--color-soft-lavender); border-radius: 99px; overflow: hidden;">
                <div style="width: 94%; height: 100%; background-color: var(--color-success);"></div>
              </div>
            </div>

            <div style="background-color: var(--color-bg-card-alt); padding: 1rem; border-radius: 12px; border: 1px solid var(--color-border); font-size: 0.86rem; color: var(--color-text-secondary);">
              <strong>💡 AI Recruiter Tip:</strong> Your background with React and Node.js stands out. Adding <em>TypeScript</em> and <em>Docker</em> keywords directly into your bullet points will unlock 35% more interviews.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. STUDENT TESTIMONIALS -->
    <section style="padding: 4.5rem 0 6rem;">
      <div class="container">
        <div style="text-align: center; max-width: 600px; margin: 0 auto 3.5rem;">
          <span class="badge badge-mauve" style="margin-bottom: 0.6rem;">Real Success Stories</span>
          <h2 style="font-size: 2.3rem; margin-bottom: 0.85rem;">Loved by 50,000+ Students</h2>
          <p style="color: var(--color-text-secondary);">See how SkillBridge helped aspiring developers, designers, and scientists land their breakthrough roles.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
          <div class="card" style="padding: 2rem;">
            <div style="display: flex; gap: 0.25rem; color: #E7A93B; margin-bottom: 1.25rem;">
              ${renderIcon('star', '', 18)}${renderIcon('star', '', 18)}${renderIcon('star', '', 18)}${renderIcon('star', '', 18)}${renderIcon('star', '', 18)}
            </div>
            <p style="font-size: 0.95rem; color: var(--color-text-dark); line-height: 1.65; margin-bottom: 1.5rem;">
              "SkillBridge completely transformed my internship search. The AI Resume Analyzer pinpointed that my CV lacked specific TypeScript keywords. After updating it, I received 3 interview invites in 10 days!"
            </p>
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="Student" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;">
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">Mira Patel</div>
                <div style="font-size: 0.8rem; color: var(--color-text-secondary);">Software Engineering Intern @ Linear</div>
              </div>
            </div>
          </div>

          <div class="card" style="padding: 2rem;">
            <div style="display: flex; gap: 0.25rem; color: #E7A93B; margin-bottom: 1.25rem;">
              ${renderIcon('star', '', 18)}${renderIcon('star', '', 18)}${renderIcon('star', '', 18)}${renderIcon('star', '', 18)}${renderIcon('star', '', 18)}
            </div>
            <p style="font-size: 0.95rem; color: var(--color-text-dark); line-height: 1.65; margin-bottom: 1.5rem;">
              "The design is gorgeous and calming. More importantly, every single role on SkillBridge is verified with clear stipends. No spam, no ghosting, just real career acceleration."
            </p>
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Student" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;">
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">Julian Vance</div>
                <div style="font-size: 0.8rem; color: var(--color-text-secondary);">Product Design Intern @ Aura Studio</div>
              </div>
            </div>
          </div>

          <div class="card" style="padding: 2rem;">
            <div style="display: flex; gap: 0.25rem; color: #E7A93B; margin-bottom: 1.25rem;">
              ${renderIcon('star', '', 18)}${renderIcon('star', '', 18)}${renderIcon('star', '', 18)}${renderIcon('star', '', 18)}${renderIcon('star', '', 18)}
            </div>
            <p style="font-size: 0.95rem; color: var(--color-text-dark); line-height: 1.65; margin-bottom: 1.5rem;">
              "The application timeline feature gives me complete peace of mind. Knowing whether my profile is Under Review, Shortlisted, or Scheduled for an Interview helped me prepare with confidence."
            </p>
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" alt="Student" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;">
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">Sophia Nguyen</div>
                <div style="font-size: 0.8rem; color: var(--color-text-secondary);">AI Research Intern @ CognitiveCore</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. CALL TO ACTION -->
    <section style="margin-bottom: 4rem;">
      <div class="container">
        <div style="background: linear-gradient(135deg, #714D69 0%, #5A3D54 60%, #302632 100%); color: #FFFFFF; border-radius: 28px; padding: 4.5rem 3rem; text-align: center; box-shadow: var(--shadow-hover); position: relative; overflow: hidden;">
          <div style="position: relative; z-index: 2; max-width: 680px; margin: 0 auto;">
            <h2 style="font-size: 2.7rem; color: #FFFFFF; margin-bottom: 1.25rem; line-height: 1.2;">
              Ready to Accelerate Your Career Trajectory?
            </h2>
            <p style="font-size: 1.12rem; color: #E3DAE7; line-height: 1.65; margin-bottom: 2.25rem;">
              Join thousands of undergraduate, graduate, and early-career talent connecting with premier internships today.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <button onclick="window.appNavigate('register')" class="btn btn-secondary btn-lg" style="background-color: #FFFFFF; color: #714D69; font-weight: 700;">
                Get Started Free ${renderIcon('arrowRight', '', 18)}
              </button>
              <button onclick="window.appNavigate('explore')" class="btn btn-outline btn-lg" style="color: #FFFFFF; border-color: rgba(255, 255, 255, 0.4);">
                Explore Opportunities
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
