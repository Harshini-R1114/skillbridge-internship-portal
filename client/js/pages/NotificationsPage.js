import { store } from '../state.js';
import { renderIcon } from '../icons.js';

export function renderNotificationsPage() {
  const notifs = store.notifications;

  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 5rem; max-width: 840px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="badge badge-plum" style="margin-bottom: 0.5rem;">Activity Feed</span>
          <h1 style="font-size: 2.3rem;">Notifications & Alerts</h1>
          <p style="color: var(--color-text-secondary); margin-top: 0.25rem;">
            Stay updated with hiring committee decisions, upcoming interview calls, and new role drops.
          </p>
        </div>
        <button onclick="window.handleMarkAllRead()" class="btn btn-secondary btn-sm">
          ${renderIcon('check', '', 14)} Mark All as Read
        </button>
      </div>

      <div class="card" style="padding: 1.5rem; box-shadow: var(--shadow-card);">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${notifs.map(n => `
            <div style="
              display: flex; 
              align-items: flex-start; 
              gap: 1.25rem; 
              padding: 1.25rem; 
              border-radius: 14px; 
              background-color: ${n.read ? 'var(--color-bg-card)' : 'var(--color-lavender-subtle)'};
              border: 1px solid ${n.read ? 'var(--color-border)' : 'var(--color-dusty-rose)'};
              transition: all var(--transition-fast);
            ">
              <div style="
                width: 40px; 
                height: 40px; 
                border-radius: 12px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                background-color: ${n.type === 'success' ? 'var(--color-success-bg)' : 'var(--color-info-bg)'};
                color: ${n.type === 'success' ? 'var(--color-success)' : 'var(--color-primary-plum)'};
                flex-shrink: 0;
              ">
                ${n.type === 'success' ? renderIcon('checkCircle', '', 20) : renderIcon('bell', '', 20)}
              </div>

              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                  <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--color-text-dark);">${n.title}</h4>
                  <span style="font-size: 0.78rem; color: var(--color-text-muted);">${n.date}</span>
                </div>
                <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.5;">${n.message}</p>
              </div>

              ${!n.read ? `
                <div style="width: 8px; height: 8px; border-radius: 50%; background-color: var(--color-primary-plum); margin-top: 6px; flex-shrink: 0;"></div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
