# 🌸 SKILLBRIDGE – AI-POWERED INTERNSHIP & CAREER OPPORTUNITY PORTAL
### Theme: *Soft Floral Luxury – Modern SaaS*

SkillBridge is an enterprise-grade full-stack career and internship intelligence platform designed with a bespoke **Soft Floral Luxury** aesthetic. It bridges the gap between academic preparation and elite tech & design careers through intelligent resume diagnostics, transparent application pipelines, and direct verified employer matching.

---

## 🎨 Color Palette & Visual System (From Reference)

| Role | Color Name | Hex Code | Visual Application |
|---|---|---|---|
| **Primary** | Plum | `#714D69` | Main CTAs, active navigation indicators, key highlights |
| **Secondary** | Mauve | `#A0849D` | Secondary buttons, subtle decorative badges, tags |
| **Highlight** | Dusty Rose | `#D3B3B8` | Accent badges, borders, card hover glows |
| **Surface** | Soft Lavender | `#E3DAE7` | Secondary cards, pill backgrounds, icon badges |
| **Background** | Ivory Mist | `#EEECF3` | Page background (Light Mode) |
| **Card Surface** | Pure White | `#FFFFFF` | Content cards, data containers |
| **Headings** | Dark Plum Text | `#302632` | Headings, high-contrast readable typography |
| **Secondary Text**| Muted Plum Text| `#756B78` | Subtitles, helper text, metadata |
| **Divider** | Border Tint | `#E8E0E9` | Card borders, dividers, subtle outlines |
| **Success** | Sage Green | `#6C9B83` | Positive statuses, shortlisted tags, ATS pass |
| **Warning** | Warm Amber | `#C69A62` | Under review badges, deadlines |
| **Error** | Rosewood Red | `#C97882` | Skill gap alerts, rejected statuses |

### Typography
- **Headings:** `Plus Jakarta Sans` (Weights: 600, 700, 800)
- **Body Text:** `Inter` (Weights: 400, 500, 600)

### Border Radii
- **Cards:** `18px` – `22px`
- **Buttons:** `10px` – `14px`
- **Inputs & Selects:** `10px` – `12px`

---

## 🚀 Key Functional Modules

### 1. Landing Page (`/home`)
- **Hero Section:** "Your Dream Career Begins With The Right Opportunity."
- **Search Bar:** Live role, skill, and location querying.
- **Floating Cards:** Placement rate (95%), active hires (10,000+), and verified partner badges.
- **Enterprise Social Proof:** Google, Microsoft, Adobe, Spotify, Canva, Amazon.
- **Platform Analytics:** Open roles, placement statistics, and average monthly stipends.
- **Curated Openings:** Featured internship cards with direct details & application triggers.
- **Why Choose SkillBridge:** AI alignment, vetted listings, ATS optimizer, and status tracker.
- **How It Works:** 3-step student advancement workflow.
- **AI Career Assistance Spotlight:** Interactive ATS score visualizer preview.
- **Student Testimonials:** Verified student stories and ratings.
- **Luxury Footer:** Platform sitemap, newsletter subscription, and legal terms.

### 2. Student Dashboard (`/student-dashboard`)
- **Personalized Header:** "Welcome Back, [Student Name]! Your next career opportunity is waiting for you."
- **4 Key Stat Metric Cards:** Total Applications, Shortlisted, Interviews, Rejected.
- **Application Analytics:** Visual month-by-month application velocity bar chart.
- **Profile Strength Indicator:** Progress meter (85%) with prompt to add portfolio links.
- **Upcoming Deadlines Countdown:** Real-time deadline tracker.
- **AI Career Suggestion Card:** Industry trends and compensation insights.
- **Recommended Internships Grid:** Tailored matches based on detected skills.

### 3. Internship Explorer (`/explore`)
- **Comprehensive Multi-faceted Filters:**
  - Keyword / Skill Search (React, Python, Figma, LLMs, etc.)
  - Modality (Remote, Hybrid, On-site)
  - Disciplines (Software Engineering, AI & Machine Learning, Data Science, UI/UX, Cloud)
  - Compensation (Paid vs Unpaid)
- **Interactive Internship Cards:** Company avatar, title, location, duration tag, stipend, skills badges.
- **Comprehensive Details Modal:** Complete role description, candidate requirements, perks, and direct 1-click application submission.

### 4. AI Resume Analyzer (`/resume-analyzer`)
- **Drag-and-Drop Resume Upload:** Supports PDF, DOCX, and TXT files.
- **Interactive Text Paste Alternative:** Paste resume content directly for instant parsing.
- **Circular ATS Compatibility Gauge:** Real-time animated score meter (0-100).
- **Skill Competency Diagnostics:** Detected technical keywords vs missing high-frequency industry terms.
- **Personalized AI Action Plan:** Specific, quantifiable resume improvements.
- **Tailored Job Recommendations:** Direct matching internships based on detected strengths.

### 5. Administrative Dashboard (`/admin-dashboard`)
- **Administrative Metric Counters:** Total Students (142), Total Internships (18), Total Applications (87), Pending Reviews (12), Shortlisted (24).
- **Application Status Funnel Table:** Change applicant status in real-time (`Pending` → `Under Review` → `Shortlisted` → `Interview` → `Accepted` → `Rejected`).
- **Student Directory Table:** Student registry with department, graduation year, verified skills, and resume ATS scores.
- **Post New Internship Modal:** Admin creation modal for employer opportunities.

### 6. Application Tracker (`/applications`)
- **5-Stage Visual Progress Timeline:** Applied → Under Review → Shortlisted → Interview → Final Decision.
- **Recruiter Feedback Card:** Real hiring committee notes and feedback.

### 7. Student Profile (`/profile`)
- **Profile Header:** Avatar, academic department, graduation year, and status badge.
- **Skills Tag Manager:** Add and verify new technical competencies.
- **Active Resume Document:** ATS-verified resume download and preview.
- **Projects Showcase:** Featured academic and engineering deliverables.

### 8. Split-Screen Authentication (`/login` & `/register`)
- **Floral Hero Artwork:** Brand highlights and student testimonial.
- **One-Click Demo Login:** Instant "Student Login" or "Admin Login" with zero typing required!
- **Complete Registration Form:** Name, email, password, college, department, and graduation year.

### 9. Theme Switcher (Light & Dark Mode)
- **Soft Floral Luxury (Light):** Ivory Mist background, white cards, plum buttons, mauve accents.
- **Deep Plum (Dark):** Deep violet background, dark surfaces, soft lavender text, dusty rose accents.
- **Persistent Memory:** Preserved across page refreshes via `localStorage`.

---

## 💻 How to Run

### Method 1: Instant Browser Launch (Zero-Setup)
Simply open `client/index.html` in any modern web browser (Chrome, Edge, Firefox, Safari). The entire platform runs instantly with its built-in reactive state engine and realistic sample dataset!

```bash
# In Windows PowerShell:
start client/index.html
```

### Method 2: Node.js Server
Run the built-in HTTP server to serve both the REST API and the frontend client simultaneously:

```bash
node server/server.js
```
Then visit:
👉 **`http://localhost:5000`**

---

## 📂 Project Directory Structure

```
mernstack/
├── client/
│   ├── css/
│   │   ├── floral-theme.css      # Design system variables, light/dark modes, utilities
│   │   └── components.css        # Cards, navbar, hero, modals, tables, timelines
│   ├── js/
│   │   ├── api.js                # REST API bridge with offline fallback
│   │   ├── state.js              # Central reactive store & localStorage persistence
│   │   ├── icons.js              # Crisp Lucide SVG icons library
│   │   ├── components/
│   │   │   ├── Navbar.js         # Top navigation bar & theme toggle
│   │   │   ├── Footer.js         # Luxury footer & newsletter
│   │   │   └── Modal.js          # Apply, details, create internship, edit profile modals
│   │   ├── pages/
│   │   │   ├── LandingPage.js
│   │   │   ├── StudentDashboard.js
│   │   │   ├── ExploreInternshipsPage.js
│   │   │   ├── ResumeAnalyzerPage.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── MyApplicationsPage.js
│   │   │   ├── StudentProfilePage.js
│   │   │   ├── NotificationsPage.js
│   │   │   ├── SettingsPage.js
│   │   │   └── AuthPage.js
│   │   └── app.js                # Router, event listeners, confetti triggers
│   └── index.html                # Main entry point with Google Fonts
│
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection & hybrid mode handler
│   ├── models/
│   │   ├── User.js               # User / Student / Admin Mongoose Schema
│   │   ├── Internship.js         # Internship Listing Schema
│   │   └── Application.js        # Candidacy Application Schema
│   ├── data/
│   │   ├── seedData.js           # Comprehensive tech internships & candidate dataset
│   │   └── store.json            # Persistent JSON file store
│   ├── package.json
│   └── server.js                 # Zero-dependency Node.js REST API & static server
│
├── package.json                  # Root runner scripts
└── README.md
```
