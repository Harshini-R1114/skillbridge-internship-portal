import { store } from '../state.js';
import { renderIcon } from '../icons.js';

export function renderExploreInternshipsPage() {
  const query = (store.searchQuery || '').toLowerCase();
  const category = store.filterCategory || 'All';
  const type = store.filterType || 'All';
  const paid = store.filterPaid || 'All';

  let filtered = store.internships.filter(i => {
    const matchesQuery = !query || 
      i.title.toLowerCase().includes(query) ||
      i.company.toLowerCase().includes(query) ||
      i.location.toLowerCase().includes(query) ||
      i.skillsRequired.some(s => s.toLowerCase().includes(query));

    const matchesCategory = category === 'All' || i.category === category;
    const matchesType = type === 'All' || i.type === type;
    const matchesPaid = paid === 'All' || (paid === 'Paid' ? i.isPaid : !i.isPaid);

    return matchesQuery && matchesCategory && matchesType && matchesPaid;
  });

  const categories = [
    'All',
    'Software Engineering',
    'AI & Machine Learning',
    'Data Science',
    'UI/UX Design',
    'Cloud & DevOps'
  ];

  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 5rem;">
      <!-- Page Header -->
      <div style="margin-bottom: 2.5rem; text-align: center; max-width: 700px; margin-left: auto; margin-right: auto;">
        <span class="badge badge-plum" style="margin-bottom: 0.6rem;">Career Discovery</span>
        <h1 style="font-size: 2.8rem; margin-bottom: 0.75rem;">Explore High-Impact Internships</h1>
        <p style="color: var(--color-text-secondary); font-size: 1.1rem;">
          Connect with vetted opportunities offering competitive stipends, senior engineering mentorship, and direct conversion pathways.
        </p>
      </div>

      <!-- Large Search & Filter Bar -->
      <div class="card" style="padding: 1.5rem; margin-bottom: 2.5rem; box-shadow: var(--shadow-card);">
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 1rem; align-items: center;">
          <!-- Keyword Search -->
          <div style="position: relative;">
            <input 
              type="text" 
              id="filterSearchInput" 
              class="form-input" 
              placeholder="Search by role, company, or skill..." 
              value="${store.searchQuery || ''}"
              oninput="window.handleFilterChange('search', this.value)"
            >
          </div>

          <!-- Category Select -->
          <div>
            <select class="form-select" onchange="window.handleFilterChange('category', this.value)">
              ${categories.map(c => `
                <option value="${c}" ${category === c ? 'selected' : ''}>${c === 'All' ? 'All Disciplines' : c}</option>
              `).join('')}
            </select>
          </div>

          <!-- Type Select -->
          <div>
            <select class="form-select" onchange="window.handleFilterChange('type', this.value)">
              <option value="All" ${type === 'All' ? 'selected' : ''}>All Modalities</option>
              <option value="Remote" ${type === 'Remote' ? 'selected' : ''}>Remote</option>
              <option value="Hybrid" ${type === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
              <option value="On-site" ${type === 'On-site' ? 'selected' : ''}>On-site</option>
            </select>
          </div>

          <!-- Compensation Select -->
          <div>
            <select class="form-select" onchange="window.handleFilterChange('paid', this.value)">
              <option value="All" ${paid === 'All' ? 'selected' : ''}>All Stipends</option>
              <option value="Paid" ${paid === 'Paid' ? 'selected' : ''}>Paid Only</option>
              <option value="Unpaid" ${paid === 'Unpaid' ? 'selected' : ''}>Unpaid</option>
            </select>
          </div>

          <!-- Reset Filter Button -->
          <button onclick="window.handleResetFilters()" class="btn btn-secondary" title="Reset Filters">
            ${renderIcon('x', '', 16)} Reset
          </button>
        </div>

        <!-- Filter Tags Bar -->
        <div style="display: flex; gap: 0.5rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border); align-items: center; flex-wrap: wrap;">
          <span style="font-size: 0.8rem; color: var(--color-text-muted); font-weight: 600;">Popular Roles:</span>
          <button onclick="window.handleFilterChange('search', 'React')" class="badge badge-mauve" style="border: none; cursor: pointer;">React</button>
          <button onclick="window.handleFilterChange('search', 'Python')" class="badge badge-mauve" style="border: none; cursor: pointer;">Python</button>
          <button onclick="window.handleFilterChange('search', 'Figma')" class="badge badge-mauve" style="border: none; cursor: pointer;">Figma</button>
          <button onclick="window.handleFilterChange('search', 'LLMs')" class="badge badge-mauve" style="border: none; cursor: pointer;">LLMs</button>
          <button onclick="window.handleFilterChange('type', 'Remote')" class="badge badge-rose" style="border: none; cursor: pointer;">Remote Only</button>
          <span style="margin-left: auto; font-size: 0.85rem; color: var(--color-text-secondary); font-weight: 500;">
            Showing <strong>${filtered.length}</strong> available roles
          </span>
        </div>
      </div>

      <!-- Internship Results Grid -->
      ${filtered.length === 0 ? `
        <div class="card" style="padding: 4rem 2rem; text-align: center;">
          <div class="brand-icon-wrapper" style="width: 56px; height: 56px; margin: 0 auto 1.25rem;">
            ${renderIcon('search', '', 26)}
          </div>
          <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">No Opportunities Match Your Criteria</h3>
          <p style="color: var(--color-text-secondary); max-width: 450px; margin: 0 auto 1.5rem;">
            Try broadening your search query or selecting "All Modalities" to view the full pipeline of open internships.
          </p>
          <button onclick="window.handleResetFilters()" class="btn btn-primary">
            Clear Filters & View All
          </button>
        </div>
      ` : `
        <div class="internships-grid">
          ${filtered.map(i => `
            <div class="internship-card">
              <div>
                <div class="internship-header">
                  <div class="internship-company-meta">
                    <img src="${i.logo}" alt="${i.company}" class="company-avatar">
                    <div>
                      <h3 class="internship-title">${i.title}</h3>
                      <p class="internship-company-name">${i.company} • <span style="color: var(--color-primary-plum); font-weight: 500;">${i.location}</span></p>
                    </div>
                  </div>
                  <button class="btn btn-ghost" style="padding: 0.4rem; border-radius: 50%; color: var(--color-dusty-rose);" title="Save internship">
                    ${renderIcon('heart', '', 18)}
                  </button>
                </div>

                <p style="font-size: 0.88rem; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 1rem;">
                  ${i.description}
                </p>

                <div class="internship-tags">
                  <span class="badge badge-plum">${i.type}</span>
                  <span class="badge badge-rose">${i.duration}</span>
                  ${i.skillsRequired.map(skill => `
                    <span class="badge badge-mauve">${skill}</span>
                  `).join('')}
                </div>
              </div>

              <div class="internship-footer">
                <div>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Stipend</div>
                  <div class="stipend-amount">${i.stipend}</div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                  <button onclick="window.openDetailModal('${i._id}')" class="btn btn-sm btn-secondary">
                    ${renderIcon('eye', '', 14)} Details
                  </button>
                  <button onclick="window.openApplyModal('${i._id}')" class="btn btn-sm btn-primary">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}
