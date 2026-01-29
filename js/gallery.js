// Gallery Management System

class GalleryManager {
    constructor() {
        this.galleries = {
            'har-ghar-tiranga': {
                title: 'Har Ghar Tiranga Campaign 2025',
                description: 'Celebrating Independence Day with patriotic fervor',
                images: [
                    {
                        src: 'images/gallery/har-ghar-tiranga-1.jpg',
                        caption: 'Flag hoisting ceremony at CGDA headquarters',
                        date: '2025-08-15'
                    },
                    {
                        src: 'images/gallery/har-ghar-tiranga-2.jpg',
                        caption: 'Staff members participating in Har Ghar Tiranga',
                        date: '2025-08-14'
                    },
                    // {
                    //     src: 'images/gallery/har-ghar-tiranga-3.jpg',
                    //     caption: 'Cultural program during Independence Day celebration',
                    //     date: '2025-08-15'
                    // },
                    {
                        src: 'images/gallery/har-ghar-tiranga-4.jpg',
                        caption: 'Unity and patriotism displayed by CGDA team',
                        date: '2025-08-15'
                    }
                ]
            },
            'ceremonies': {
                title: 'Official Ceremonies & Events',
                description: 'Important official functions and ceremonies',
                images: [
                    {
                        src: 'images/gallery/ceremony-1.jpg',
                        caption: 'Felicitation ceremony for Sh. R.K. Arora',
                        date: '2025-04-07'
                    },
                    {
                        src: 'images/gallery/ceremony-2.jpg',
                        caption: 'Welcome ceremony for Sh. K.V.R. Murty',
                        date: '2025-04-07'
                    },
                    {
                        src: 'images/gallery/ceremony-3.jpg',
                        caption: 'Annual awards distribution ceremony',
                        date: '2025-03-15'
                    }
                ]
            },
            'training': {
                title: 'Training & Development Programs',
                description: 'Capacity building and skill development initiatives',
                images: [
                    {
                        src: 'images/gallery/training-1.jpg',
                        caption: 'Digital finance training workshop',
                        date: '2025-07-20'
                    },
                    {
                        src: 'images/gallery/training-2.jpg',
                        caption: 'Leadership development program',
                        date: '2025-06-15'
                    },
                    {
                        src: 'images/gallery/training-3.jpg',
                        caption: 'IT skills enhancement workshop',
                        date: '2025-05-10'
                    }
                ]
            }
        };

        this.currentGallery = 'har-ghar-tiranga';
        this.currentImageIndex = 0;
        this.isAutoPlay = true;
        this.autoPlayInterval = null;

        this.initialize();
    }

    initialize() {
        this.createGalleryInterface();
        this.startAutoPlay();
        this.bindEvents();
    }

    createGalleryInterface() {
        // Create gallery navigation tabs
        this.createGalleryTabs();

        // Create main gallery display
        this.createMainGallery();

        // Create thumbnail strip
        this.createThumbnails();
    }

    createGalleryTabs() {
        const tabsContainer = document.querySelector('.gallery-tabs');
        if (!tabsContainer) return;

        const tabsHTML = Object.keys(this.galleries).map(key => {
            const gallery = this.galleries[key];
            const isActive = key === this.currentGallery ? 'active' : '';

            return `
                <button class="gallery-tab ${isActive}" data-gallery="${key}">
                    ${gallery.title}
                </button>
            `;
        }).join('');

        tabsContainer.innerHTML = tabsHTML;
    }

    createMainGallery() {
        const container = document.querySelector('.gallery-main-display');
        if (!container) return;

        const currentGalleryData = this.galleries[this.currentGallery];
        const currentImage = currentGalleryData.images[this.currentImageIndex];

        container.innerHTML = `
            <div class="gallery-image-container">
                <img src="${currentImage.src}" 
                     alt="${currentImage.caption}" 
                     class="gallery-main-image"
                     onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 600\"><rect width=\"800\" height=\"600\" fill=\"%23f0f0f0\"/><text x=\"400\" y=\"310\" text-anchor=\"middle\" font-size=\"24\" fill=\"%23999\">Gallery Image</text></svg>'">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h3>${currentImage.caption}</h3>
                        <p class="gallery-date">${this.formatDate(currentImage.date)}</p>
                    </div>
                    <div class="gallery-controls">
                        <button class="gallery-control-btn" onclick="galleryManager.previousImage()">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="gallery-control-btn" onclick="galleryManager.toggleAutoPlay()">
                            <i class="fas fa-${this.isAutoPlay ? 'pause' : 'play'}"></i>
                        </button>
                        <button class="gallery-control-btn" onclick="galleryManager.nextImage()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <button class="gallery-control-btn" onclick="galleryManager.openFullscreen('${currentImage.src}', '${currentImage.caption}')">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="gallery-progress">
                <div class="gallery-progress-bar" style="width: ${((this.currentImageIndex + 1) / currentGalleryData.images.length * 100)}%"></div>
            </div>
        `;
    }

    createThumbnails() {
        const container = document.querySelector('.gallery-thumbnails');
        if (!container) return;

        const currentGalleryData = this.galleries[this.currentGallery];

        const thumbnailsHTML = currentGalleryData.images.map((image, index) => {
            const isActive = index === this.currentImageIndex ? 'active' : '';

            return `
                <div class="thumbnail-item ${isActive}" onclick="galleryManager.goToImage(${index})">
                    <img src="${image.src}" alt="${image.caption}" 
                         onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 75\"><rect width=\"100\" height=\"75\" fill=\"%23f0f0f0\"/><text x=\"50\" y=\"40\" text-anchor=\"middle\" font-size=\"8\" fill=\"%23999\">Thumb</text></svg>'">
                    <div class="thumbnail-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = thumbnailsHTML;
    }

    switchGallery(galleryKey) {
        this.currentGallery = galleryKey;
        this.currentImageIndex = 0;
        this.updateDisplay();
        this.restartAutoPlay();
    }

    nextImage() {
        const currentGalleryData = this.galleries[this.currentGallery];
        this.currentImageIndex = (this.currentImageIndex + 1) % currentGalleryData.images.length;
        this.updateDisplay();
    }

    previousImage() {
        const currentGalleryData = this.galleries[this.currentGallery];
        this.currentImageIndex = this.currentImageIndex === 0
            ? currentGalleryData.images.length - 1
            : this.currentImageIndex - 1;
        this.updateDisplay();
    }

    goToImage(index) {
        this.currentImageIndex = index;
        this.updateDisplay();
        this.restartAutoPlay();
    }

    updateDisplay() {
        this.createMainGallery();
        this.createThumbnails();
        this.updateTabs();
    }

    updateTabs() {
        const tabs = document.querySelectorAll('.gallery-tab');
        tabs.forEach(tab => {
            const isActive = tab.dataset.gallery === this.currentGallery;
            tab.classList.toggle('active', isActive);
        });
    }

    toggleAutoPlay() {
        this.isAutoPlay = !this.isAutoPlay;

        if (this.isAutoPlay) {
            this.startAutoPlay();
        } else {
            this.stopAutoPlay();
        }

        this.updateDisplay();
    }

    startAutoPlay() {
        if (!this.isAutoPlay) return;

        this.stopAutoPlay(); // Clear existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextImage();
        }, 4000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    restartAutoPlay() {
        if (this.isAutoPlay) {
            this.startAutoPlay();
        }
    }

    openFullscreen(imageSrc, caption) {
        const modal = this.createFullscreenModal();
        const modalContent = modal.querySelector('.modal-content');

        modalContent.innerHTML = `
            <button class="modal-close" onclick="galleryManager.closeFullscreen()">&times;</button>
            <div class="fullscreen-gallery">
                <img src="${imageSrc}" alt="${caption}" class="fullscreen-image">
                <div class="fullscreen-caption">
                    <h3>${caption}</h3>
                    <div class="fullscreen-nav">
                        <button class="btn btn-outline" onclick="galleryManager.previousImage(); galleryManager.updateFullscreen()">
                            <i class="fas fa-chevron-left"></i> Previous
                        </button>
                        <button class="btn btn-outline" onclick="galleryManager.nextImage(); galleryManager.updateFullscreen()">
                            Next <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 50);

        // Stop autoplay while in fullscreen
        this.stopAutoPlay();
    }

    updateFullscreen() {
        const fullscreenImage = document.querySelector('.fullscreen-image');
        const fullscreenCaption = document.querySelector('.fullscreen-caption h3');

        if (fullscreenImage && fullscreenCaption) {
            const currentGalleryData = this.galleries[this.currentGallery];
            const currentImage = currentGalleryData.images[this.currentImageIndex];

            fullscreenImage.src = currentImage.src;
            fullscreenImage.alt = currentImage.caption;
            fullscreenCaption.textContent = currentImage.caption;
        }
    }

    createFullscreenModal() {
        const modal = document.createElement('div');
        modal.className = 'modal fullscreen-modal';
        modal.innerHTML = '<div class="modal-content fullscreen-content"></div>';

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeFullscreen();
        });

        // Keyboard navigation
        document.addEventListener('keydown', this.handleFullscreenKeyboard.bind(this));

        return modal;
    }

    closeFullscreen() {
        const modal = document.querySelector('.fullscreen-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                document.removeEventListener('keydown', this.handleFullscreenKeyboard);
            }, 300);
        }

        // Resume autoplay
        if (this.isAutoPlay) {
            this.startAutoPlay();
        }
    }

    handleFullscreenKeyboard(e) {
        switch (e.key) {
            case 'Escape':
                this.closeFullscreen();
                break;
            case 'ArrowLeft':
                this.previousImage();
                this.updateFullscreen();
                break;
            case 'ArrowRight':
                this.nextImage();
                this.updateFullscreen();
                break;
        }
    }

    bindEvents() {
        // Gallery tab switching
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('gallery-tab')) {
                const galleryKey = e.target.dataset.gallery;
                this.switchGallery(galleryKey);
            }
        });

        // Touch/swipe support for mobile
        this.initializeTouchControls();
    }

    initializeTouchControls() {
        const galleryContainer = document.querySelector('.gallery-main-display');
        if (!galleryContainer) return;

        let startX = 0;
        let endX = 0;

        galleryContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        galleryContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextImage();
            } else {
                this.previousImage();
            }
        }
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    }

    // Image lazy loading
    lazyLoadImages() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Gallery filtering and search
    filterGallery(searchTerm) {
        const allImages = Object.values(this.galleries).flatMap(gallery =>
            gallery.images.map(img => ({ ...img, gallery: gallery.title }))
        );

        const filtered = allImages.filter(image =>
            image.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.gallery.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filtered;
    }

    // Download image functionality
    downloadImage(imageSrc, filename) {
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = filename || 'cgda-gallery-image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Social sharing
    shareImage(imageSrc, caption) {
        if (navigator.share) {
            navigator.share({
                title: caption,
                text: `Check out this image from CGDA: ${caption}`,
                url: window.location.href
            });
        } else {
            // Fallback - copy link
            navigator.clipboard.writeText(`${caption} - ${window.location.href}`);
            showToast('Link copied to clipboard!', 'success');
        }
    }
}

// Image Lightbox Component
class ImageLightbox {
    constructor() {
        this.isOpen = false;
        this.currentImages = [];
        this.currentIndex = 0;
        this.initialize();
    }

    initialize() {
        this.createLightboxHTML();
        this.bindEvents();
    }

    createLightboxHTML() {
        const lightboxHTML = `
            <div id="imageLightbox" class="lightbox">
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <div class="lightbox-container">
                        <button class="lightbox-nav lightbox-prev">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <div class="lightbox-image-container">
                            <img class="lightbox-image" src="" alt="">
                            <div class="lightbox-caption"></div>
                        </div>
                        <button class="lightbox-nav lightbox-next">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <div class="lightbox-footer">
                        <div class="lightbox-counter"></div>
                        <div class="lightbox-actions">
                            <button class="btn btn-outline" onclick="imageLightbox.downloadCurrentImage()">
                                <i class="fas fa-download"></i> Download
                            </button>
                            <button class="btn btn-outline" onclick="imageLightbox.shareCurrentImage()">
                                <i class="fas fa-share"></i> Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    bindEvents() {
        const lightbox = document.getElementById('imageLightbox');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        closeBtn.addEventListener('click', () => this.close());
        prevBtn.addEventListener('click', () => this.previous());
        nextBtn.addEventListener('click', () => this.next());

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) this.close();
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            switch (e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.previous();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });
    }

    open(images, startIndex = 0) {
        this.currentImages = images;
        this.currentIndex = startIndex;
        this.isOpen = true;

        const lightbox = document.getElementById('imageLightbox');
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        this.updateImage();
    }

    close() {
        this.isOpen = false;
        const lightbox = document.getElementById('imageLightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.currentImages.length;
        this.updateImage();
    }

    previous() {
        this.currentIndex = this.currentIndex === 0
            ? this.currentImages.length - 1
            : this.currentIndex - 1;
        this.updateImage();
    }

    updateImage() {
        const currentImage = this.currentImages[this.currentIndex];
        const lightbox = document.getElementById('imageLightbox');

        const img = lightbox.querySelector('.lightbox-image');
        const caption = lightbox.querySelector('.lightbox-caption');
        const counter = lightbox.querySelector('.lightbox-counter');

        img.src = currentImage.src;
        img.alt = currentImage.caption;
        caption.textContent = currentImage.caption;
        counter.textContent = `${this.currentIndex + 1} / ${this.currentImages.length}`;

        // Update navigation button states
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        prevBtn.style.opacity = this.currentImages.length > 1 ? '1' : '0.5';
        nextBtn.style.opacity = this.currentImages.length > 1 ? '1' : '0.5';
    }

    downloadCurrentImage() {
        const currentImage = this.currentImages[this.currentIndex];
        const filename = `cgda-${currentImage.caption.replace(/\s+/g, '-').toLowerCase()}.jpg`;
        galleryManager.downloadImage(currentImage.src, filename);
    }

    shareCurrentImage() {
        const currentImage = this.currentImages[this.currentIndex];
        galleryManager.shareImage(currentImage.src, currentImage.caption);
    }
}

// Gallery Grid Component
class GalleryGrid {
    constructor(containerId, images) {
        this.container = document.getElementById(containerId);
        this.images = images;
        this.filters = ['all'];
        this.currentFilter = 'all';
        this.itemsPerPage = 12;
        this.currentPage = 1;

        this.initialize();
    }

    initialize() {
        this.createFilters();
        this.renderGrid();
        this.createPagination();
    }

    createFilters() {
        // Extract unique categories from images
        const categories = [...new Set(this.images.map(img => img.category))];
        this.filters = ['all', ...categories];

        const filtersHTML = this.filters.map(filter => `
            <button class="filter-btn ${filter === this.currentFilter ? 'active' : ''}" 
                    onclick="galleryGrid.setFilter('${filter}')">
                ${filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
        `).join('');

        const filtersContainer = document.querySelector('.gallery-filters');
        if (filtersContainer) {
            filtersContainer.innerHTML = filtersHTML;
        }
    }

    renderGrid() {
        if (!this.container) return;

        const filteredImages = this.getFilteredImages();
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const pageImages = filteredImages.slice(startIndex, startIndex + this.itemsPerPage);

        const gridHTML = pageImages.map((image, index) => `
            <div class="gallery-grid-item fade-in-up" style="animation-delay: ${index * 0.1}s">
                <div class="gallery-grid-image">
                    <img src="${image.src}" alt="${image.caption}" 
                         onclick="galleryGrid.openImage(${filteredImages.indexOf(image)})"
                         onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 200\"><rect width=\"300\" height=\"200\" fill=\"%23f0f0f0\"/><text x=\"150\" y=\"105\" text-anchor=\"middle\" font-size=\"14\" fill=\"%23999\">Gallery Image</text></svg>'">
                    <div class="gallery-grid-overlay">
                        <div class="gallery-grid-actions">
                            <button onclick="galleryGrid.openImage(${filteredImages.indexOf(image)})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="galleryManager.downloadImage('${image.src}', '${image.caption}')">
                                <i class="fas fa-download"></i>
                            </button>
                            <button onclick="galleryManager.shareImage('${image.src}', '${image.caption}')">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="gallery-grid-info">
                    <h4>${image.caption}</h4>
                    <p class="gallery-grid-date">${galleryManager.formatDate(image.date)}</p>
                    <span class="badge badge-info">${image.category}</span>
                </div>
            </div>
        `).join('');

        this.container.innerHTML = gridHTML;
    }

    getFilteredImages() {
        if (this.currentFilter === 'all') {
            return this.images;
        }
        return this.images.filter(img => img.category === this.currentFilter);
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;
        this.renderGrid();
        this.updateFilterButtons();
        this.createPagination();
    }

    updateFilterButtons() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            const isActive = btn.textContent.toLowerCase().trim() === this.currentFilter;
            btn.classList.toggle('active', isActive);
        });
    }

    createPagination() {
        const filteredImages = this.getFilteredImages();
        const totalPages = Math.ceil(filteredImages.length / this.itemsPerPage);

        if (totalPages <= 1) return;

        const paginationContainer = document.querySelector('.gallery-pagination');
        if (!paginationContainer) return;

        const paginationHTML = `
            <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
                    onclick="galleryGrid.goToPage(${this.currentPage - 1})">
                <i class="fas fa-chevron-left"></i> Previous
            </button>
            ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
                <button class="pagination-btn ${page === this.currentPage ? 'active' : ''}" 
                        onclick="galleryGrid.goToPage(${page})">
                    ${page}
                </button>
            `).join('')}
            <button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''} 
                    onclick="galleryGrid.goToPage(${this.currentPage + 1})">
                Next <i class="fas fa-chevron-right"></i>
            </button>
        `;

        paginationContainer.innerHTML = paginationHTML;
    }

    goToPage(page) {
        const filteredImages = this.getFilteredImages();
        const totalPages = Math.ceil(filteredImages.length / this.itemsPerPage);

        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderGrid();
            this.createPagination();

            // Scroll to top of gallery
            this.container.scrollIntoView({ behavior: 'smooth' });
        }
    }

    openImage(index) {
        const filteredImages = this.getFilteredImages();
        imageLightbox.open(filteredImages, index);
    }
}

// Initialize gallery components
let galleryManager;
let imageLightbox;
let galleryGrid;

document.addEventListener('DOMContentLoaded', () => {
    galleryManager = new GalleryManager();
    imageLightbox = new ImageLightbox();

    // Initialize gallery grid if container exists
    const gridContainer = document.getElementById('mainGallery');
    if (gridContainer) {
        const allGalleryImages = Object.values(galleryManager.galleries)
            .flatMap(gallery => gallery.images.map(img => ({
                ...img,
                category: gallery.title.toLowerCase().replace(/\s+/g, '-')
            })));

        galleryGrid = new GalleryGrid('mainGallery', allGalleryImages);
    }
});

// CSS for lightbox and gallery components
const galleryStyles = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 3000;
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox.active {
        display: flex;
        opacity: 1;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 95%;
        max-height: 95%;
        background: white;
        border-radius: 10px;
        overflow: hidden;
    }
    
    .fullscreen-content {
        width: 95%;
        height: 95%;
        max-width: none;
        max-height: none;
    }
    
    .lightbox-close {
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        z-index: 3001;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(0,0,0,0.5);
    }
    
    .lightbox-container {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    
    .lightbox-image-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .lightbox-image {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
        border-radius: 8px;
    }
    
    .lightbox-caption {
        margin-top: 20px;
        text-align: center;
        font-size: 18px;
        color: #333;
        font-weight: 500;
    }
    
    .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.5);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        transition: all 0.3s;
        z-index: 3001;
    }
    
    .lightbox-nav:hover {
        background: rgba(0,0,0,0.8);
        transform: translateY(-50%) scale(1.1);
    }
    
    .lightbox-prev {
        left: 20px;
    }
    
    .lightbox-next {
        right: 20px;
    }
    
    .lightbox-footer {
        background: #f8f9fa;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .lightbox-counter {
        font-weight: 500;
        color: #666;
    }
    
    .lightbox-actions {
        display: flex;
        gap: 10px;
    }
    
    .gallery-grid-item {
        position: relative;
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        transition: all 0.3s;
    }
    
    .gallery-grid-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    }
    
    .gallery-grid-image {
        position: relative;
        height: 200px;
        overflow: hidden;
    }
    
    .gallery-grid-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
        cursor: pointer;
    }
    
    .gallery-grid-item:hover .gallery-grid-image img {
        transform: scale(1.1);
    }
    
    .gallery-grid-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .gallery-grid-item:hover .gallery-grid-overlay {
        opacity: 1;
    }
    
    .gallery-grid-actions {
        display: flex;
        gap: 10px;
    }
    
    .gallery-grid-actions button {
        background: rgba(255,255,255,0.2);
        color: white;
        border: 2px solid white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .gallery-grid-actions button:hover {
        background: #ff6b35;
        border-color: #ff6b35;
    }
    
    .gallery-grid-info {
        padding: 20px;
    }
    
    .gallery-grid-info h4 {
        color: #1e3c72;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
    }
    
    .gallery-grid-date {
        color: #999;
        font-size: 14px;
        margin-bottom: 10px;
    }
    
    .gallery-filters {
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .filter-btn {
        padding: 10px 20px;
        background: white;
        color: #1e3c72;
        border: 2px solid #1e3c72;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s;
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: #1e3c72;
        color: white;
    }
    
    .gallery-pagination {
        margin-top: 40px;
        text-align: center;
    }
    
    @media (max-width: 768px) {
        .lightbox-nav {
            width: 40px;
            height: 40px;
            font-size: 16px;
        }
        
        .lightbox-footer {
            flex-direction: column;
            gap: 15px;
            text-align: center;
        }
        
        .gallery-grid-actions {
            gap: 5px;
        }
        
        .gallery-grid-actions button {
            width: 35px;
            height: 35px;
            font-size: 14px;
        }
        
        .gallery-filters {
            gap: 5px;
        }
        
        .filter-btn {
            padding: 8px 15px;
            font-size: 14px;
        }
    }
`;

// Add gallery styles to document
const galleryStyleSheet = document.createElement('style');
galleryStyleSheet.textContent = galleryStyles;
document.head.appendChild(galleryStyleSheet);