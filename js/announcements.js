// Announcements Management System

class AnnouncementsManager {
    constructor() {
        this.announcements = [
            {
                id: 1,
                title: "Settlement of CGDA 6 months final examination charge",
                description: "The Defence Accounts Department (DAD) one of India's oldest and well established over 250 years ago. It operates under the Controller General of Defence Accounts (CGDA), a senior officer in the Indian Defence Accounts Service (IDAS), reporting to the Ministry of Defence.",
                date: "2025-08-28",
                type: "important"
            },
            {
                id: 2,
                title: "Performance Appraisal Report (PAR) submission guidelines",
                description: "Revised guidelines for preparation and submission of Performance Appraisal Reports for all CGDA officers and staff members for the financial year 2024-25.",
                date: "2025-08-25",
                type: "circular"
            },
            {
                id: 3,
                title: "Training program on Digital Financial Management",
                description: "Comprehensive training program scheduled for September 2025 covering modern digital tools and techniques for financial management in defence services.",
                date: "2025-08-20",
                type: "training"
            },
            {
                id: 4,
                title: "Office modernization and infrastructure updates",
                description: "Initiative for modernizing CGDA offices across India with latest technology and improved infrastructure to enhance service delivery and efficiency.",
                date: "2025-08-18",
                type: "update"
            }
        ];
        
        this.initialize();
    }

    initialize() {
        this.loadAnnouncements();
    }

    loadAnnouncements() {
        const container = document.getElementById('announcementsList');
        if (!container) return;

        container.innerHTML = '';

        // Show only first 3 announcements on homepage
        const displayAnnouncements = this.announcements.slice(0, 3);

        displayAnnouncements.forEach((announcement, index) => {
            const announcementElement = this.createAnnouncementElement(announcement, index);
            container.appendChild(announcementElement);
        });
    }

    createAnnouncementElement(announcement, index) {
        const element = document.createElement('div');
        element.className = 'announcement-item fade-in-up';
        element.style.animationDelay = `${index * 0.1}s`;

        const typeIcons = {
            important: '⚠️',
            circular: '📋',
            training: '🎓',
            update: '🔄'
        };

        element.innerHTML = `
            <h3>${typeIcons[announcement.type] || '📢'} ${announcement.title}</h3>
            <p>${announcement.description}</p>
            <div class="announcement-date">${this.formatDate(announcement.date)}</div>
        `;

        element.addEventListener('click', () => {
            this.showAnnouncementModal(announcement);
        });

        return element;
    }

    showAnnouncementModal(announcement) {
        const modal = this.createModal();
        const modalContent = modal.querySelector('.modal-content');

        modalContent.innerHTML = `
            <button class="modal-close" onclick="announcementsManager.closeModal()">&times;</button>
            <h2>${announcement.title}</h2>
            <div class="modal-meta">
                <span class="badge badge-primary">${announcement.type}</span>
                <span class="modal-date">${this.formatDate(announcement.date)}</span>
            </div>
            <div class="modal-body">
                <p>${announcement.description}</p>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="announcementsManager.downloadFile('${announcement.title}')">
                        <i class="fas fa-download"></i> Download PDF
                    </button>
                    <button class="btn btn-outline" onclick="announcementsManager.shareAnnouncement('${announcement.title}')">
                        <i class="fas fa-share"></i> Share
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 50);
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = '<div class="modal-content"></div>';

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        return modal;
    }

    closeModal() {
        const modal = document.querySelector('.modal.active');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    }

    downloadFile(fileName) {
        this.showToast(`Downloading ${fileName}...`, 'info');
        // Simulate download
        setTimeout(() => {
            this.showToast('Download completed!', 'success');
        }, 2000);
    }

    shareAnnouncement(title) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: 'Check out this announcement from CGDA',
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(`${title} - ${window.location.href}`);
            this.showToast('Link copied to clipboard!', 'success');
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const typeIcons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <div class="toast-header">
                <span class="toast-title">${typeIcons[type]} Notification</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="toast-body">${message}</div>
        `;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    }
}

// Initialize announcements manager
let announcementsManager;

document.addEventListener('DOMContentLoaded', () => {
    announcementsManager = new AnnouncementsManager();
});