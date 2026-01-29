// Main JavaScript for CGDA Website

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Website Initialization
function initializeWebsite() {
    initializeNavigation();
    initializeAccessibility();
    initializeHeroSlider();
    loadAnnouncements();
    loadCirculars();
    loadOfficers();
    initializeGallery();
    initializeScrollEffects();
    initializeBackToTop();
    updateVisitorCount();
}

// Navigation Functions
// function initializeNavigation() {
//     const navItems = document.querySelectorAll('.nav-item');

//     // Dropdown hover effect
//     navItems.forEach(item => {
//         const dropdown = item.querySelector('.dropdown-menu');

//         if (dropdown) {
//             item.addEventListener('mouseenter', () => {
//                 dropdown.style.display = 'block';
//                 setTimeout(() => {
//                     dropdown.style.opacity = '1';
//                     dropdown.style.transform = 'translateY(0)';
//                 }, 10);
//             });

//             item.addEventListener('mouseleave', () => {
//                 dropdown.style.opacity = '0';
//                 dropdown.style.transform = 'translateY(-10px)';
//                 setTimeout(() => {
//                     dropdown.style.display = 'none';
//                 }, 300);
//             });
//         }
//     });

//     createMobileMenuToggle();
// }

// function createMobileMenuToggle() {
//     const navContainer = document.querySelector('.nav-container');
//     const navMenu = document.querySelector('.nav-menu');

//     // Prevent multiple toggles
//     if (document.querySelector('.mobile-menu-toggle')) return;

//     // Only create toggle for mobile screens
//     if (window.innerWidth <= 768) {
//         const toggleBtn = document.createElement('button');
//         toggleBtn.className = 'mobile-menu-toggle';
//         toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
//         toggleBtn.style.cssText = `
//             background: none;
//             border: none;
//             color: white;
//             font-size: 24px;
//             padding: 10px;
//             cursor: pointer;
//             display: block;
//         `;

//         navContainer.insertBefore(toggleBtn, navMenu);

//         navMenu.style.display = 'none';

//         toggleBtn.addEventListener('click', () => {
//             if (navMenu.style.display === 'none' || navMenu.style.display === '') {
//                 navMenu.style.display = 'flex';
//                 toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
//             } else {
//                 navMenu.style.display = 'none';
//                 toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
//             }
//         });

//         // Reset navMenu when window resizes above 768px
//         window.addEventListener('resize', () => {
//             if (window.innerWidth > 768) {
//                 navMenu.style.display = '';
//                 toggleBtn.remove();
//             }
//         });
//     }
// }

// // Initialize when DOM is ready
// document.addEventListener('DOMContentLoaded', () => {
//     initializeNavigation();
// });


// Accessibility Functions
let currentFontSize = 16;

function increaseFontSize() {
    if (currentFontSize < 20) {
        currentFontSize += 2;
        document.body.style.fontSize = currentFontSize + 'px';
        showToast('Font size increased', 'success');
    }
}

function decreaseFontSize() {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.body.style.fontSize = currentFontSize + 'px';
        showToast('Font size decreased', 'success');
    }
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    showToast(isHighContrast ? 'High contrast enabled' : 'High contrast disabled', 'info');
}

// Hero Slider Functions
let currentSlide = 0;
const slides = [{
        title: "Honouring Sh. R.K. Arora & Welcoming Sh. K.V.R. Murty",
        description: "Felicitation of Sh. R.K. Arora and assumption of charge by Sh. K.V.R. Murty on 07 April 2025."
    },
    {
        title: "Defence Accounts Department Excellence",
        description: "Committed to maintaining the highest standards in defence financial management and accountability."
    },
    {
        title: "Har Ghar Tiranga Campaign 2025",
        description: "Celebrating India's independence with patriotic fervor across all CGDA offices nationwide."
    }
];

function initializeHeroSlider() {
    updateSlideContent();
    setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
}

function updateSlideContent() {
    const slideContent = document.querySelector('.slide-content');
    if (slideContent) {
        slideContent.innerHTML = `
            <h1>${slides[currentSlide].title}</h1>
            <p>${slides[currentSlide].description}</p>
        `;
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlideContent();
}

function prevSlide() {
    currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    updateSlideContent();
}

// Announcements will be handled by announcements.js
function loadAnnouncements() {
    // This function is now handled by AnnouncementsManager
    console.log('Announcements loaded by AnnouncementsManager');
}

// Circulars Data and Functions
const circularsData = [{
        id: 1,
        title: "Revision of rates under para 209(ii) of Pension Accounts Manual 2008-09 and subsequent modifications thereof - reg.",
        date: "2025-08-27",
        fileSize: "245 KB",
        downloads: 1247
    },
    {
        id: 2,
        title: "Guidelines for implementation of 7th Central Pay Commission recommendations",
        date: "2025-08-24",
        fileSize: "1.2 MB",
        downloads: 2156
    },
    {
        id: 3,
        title: "Procedure for processing medical reimbursement claims",
        date: "2025-08-20",
        fileSize: "890 KB",
        downloads: 876
    },
    {
        id: 4,
        title: "Updated forms for pension processing and documentation",
        date: "2025-08-15",
        fileSize: "654 KB",
        downloads: 1543
    }
];

function loadCirculars() {
    const container = document.getElementById('circularsList');
    if (!container) return;

    container.innerHTML = '';

    // Show only first 4 circulars on homepage
    const displayCirculars = circularsData.slice(0, 4);

    displayCirculars.forEach((circular, index) => {
        const circularElement = createCircularElement(circular, index);
        container.appendChild(circularElement);
    });
}

function createCircularElement(circular, index) {
    const element = document.createElement('div');
    element.className = 'circular-item slide-in';
    element.style.animationDelay = `${index * 0.1}s`;

    element.innerHTML = `
        <div class="circular-info">
            <h3>${circular.title}</h3>
            <p>Published: ${formatDate(circular.date)} | Size: ${circular.fileSize} | Downloads: ${circular.downloads}</p>
        </div>
        <div class="circular-actions">
            <a href="#" class="btn-download" onclick="downloadFile('${circular.title}')">
                <i class="fas fa-download"></i> PDF
            </a>
        </div>
    `;

    return element;
}

// Officers Data and Functions
const officersData = [{
        id: 1,
        name: "N. Gopalan",
        tenure: "Apr 1997 - Apr 2000",
        photo: "images/officers/n-gopalan.jpg"
    },
    {
        id: 2,
        name: "M. Kumaraswami",
        tenure: "Apr 2000 - Oct 2003",
        photo: "images/officers/m-kumaraswami.jpg"
    },
    {
        id: 3,
        name: "B. Banerjee",
        tenure: "Oct 2003 - Dec 2006",
        photo: "images/officers/b-banerjee.jpg"
    },
    {
        id: 4,
        name: "G.C. Bhandari",
        tenure: "Dec 2006 - Feb 2009",
        photo: "images/officers/gc-bhandari.jpg"
    }
];

function loadOfficers() {
    const container = document.getElementById('officersGrid');
    if (!container) return;

    container.innerHTML = '';

    officersData.forEach((officer, index) => {
        const officerElement = createOfficerElement(officer, index);
        container.appendChild(officerElement);
    });
}

function createOfficerElement(officer, index) {
    const element = document.createElement('div');
    element.className = 'officer-card hover-lift fade-in-up';
    element.style.animationDelay = `${index * 0.1}s`;

    element.innerHTML = `
        <div class="officer-photo">
            <img src="${officer.photo}" alt="${officer.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"%23f0f0f0\"/><text x=\"50\" y=\"55\" text-anchor=\"middle\" font-size=\"12\" fill=\"%23999\">Photo</text></svg>'">
        </div>
        <h3>${officer.name}</h3>
        <p class="officer-tenure">${officer.tenure}</p>
    `;

    return element;
}

// Gallery Functions
const galleryImages = [
    'images/gallery/har-ghar-tiranga-1.jpg',
    'images/gallery/har-ghar-tiranga-2.jpg',
    'images/gallery/ceremony-1.jpg',
    'images/gallery/ceremony-2.jpg'
];

let currentGalleryImage = 0;

function initializeGallery() {
    updateGalleryImage();
}

function showGalleryImage(index) {
    currentGalleryImage = index;
    updateGalleryImage();
}

function updateGalleryImage() {
    const mainImage = document.getElementById('mainGalleryImage');
    const dots = document.querySelectorAll('.gallery-dots .dot');

    if (mainImage) {
        mainImage.src = galleryImages[currentGalleryImage];
        mainImage.onerror = function() {
            this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="200" y="160" text-anchor="middle" font-size="16" fill="%23999">Gallery Image</text></svg>';
        };
    }

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentGalleryImage);
    });
}

// Main Gallery Data
const mainGalleryData = [{
        title: "Felicitation of Sh. R.K. Arora & Assumption of charge by Sh. K.V.R. Murty",
        description: "Important ceremony marking the transition of leadership in CGDA on 07 April 2025.",
        image: "images/gallery/ceremony-1.jpg",
        date: "2025-04-07"
    },
    {
        title: "Independence Day Celebrations 2025",
        description: "Patriotic celebrations across all CGDA offices marking India's Independence Day.",
        image: "images/gallery/independence-day.jpg",
        date: "2025-08-15"
    },
    {
        title: "Training Workshop on Digital Finance",
        description: "Comprehensive training program for CGDA staff on modern digital financial tools.",
        image: "images/gallery/training-workshop.jpg",
        date: "2025-07-20"
    }
];

function loadMainGallery() {
    const container = document.getElementById('mainGallery');
    if (!container) return;

    container.innerHTML = '';

    mainGalleryData.forEach((item, index) => {
        const galleryElement = createGalleryElement(item, index);
        container.appendChild(galleryElement);
    });
}

function createGalleryElement(item, index) {
    const element = document.createElement('div');
    element.className = 'gallery-card fade-in-up';
    element.style.animationDelay = `${index * 0.2}s`;

    element.innerHTML = `
        <div class="gallery-card-image">
            <img src="${item.image}" alt="${item.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 200\"><rect width=\"400\" height=\"200\" fill=\"%23f0f0f0\"/><text x=\"200\" y=\"110\" text-anchor=\"middle\" font-size=\"14\" fill=\"%23999\">Gallery Image</text></svg>'">
        </div>
        <div class="gallery-card-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="gallery-meta">
                <span class="badge badge-info">${formatDate(item.date)}</span>
            </div>
        </div>
    `;

    element.addEventListener('click', () => {
        showImageModal(item.image, item.title);
    });

    return element;
}

// Utility Functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

function downloadFile(fileName) {
    showToast(`Downloading ${fileName}...`, 'info');
    // Simulate download
    setTimeout(() => {
        showToast('Download completed!', 'success');
    }, 2000);
}

// Toast Notification System
function showToast(message, type = 'info') {
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

// Modal Functions
// Modal functions moved to respective managers

function showImageModal(imageSrc, title) {
    const modal = createModal();
    const modalContent = modal.querySelector('.modal-content');

    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeModal()">&times;</button>
        <h2>${title}</h2>
        <div class="image-container">
            <img src="${imageSrc}" alt="${title}" style="width: 100%; max-width: 800px; border-radius: 8px;">
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 50);
}

function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = '<div class="modal-content"></div>';

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal.active');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Share function moved to announcements manager

// Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');

                // Animate counters if present
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => animateCounter(counter));
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target || element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Back to Top Button
function initializeBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// Visitor Counter
function updateVisitorCount() {
    const counter = document.getElementById('visitorCount');
    if (counter) {
        // Simulate visitor count with animation
        let count = 750000;
        const increment = Math.random() * 10 + 1;
        setInterval(() => {
            count += increment;
            counter.textContent = Math.floor(count).toLocaleString();
        }, 30000); // Update every 30 seconds
    }
}

// Search Functionality
function performSearch(query) {
    if (!query.trim()) {
        showToast('Please enter a search query', 'warning');
        return;
    }

    showToast(`Searching for: ${query}`, 'info');

    // Simulate search results
    setTimeout(() => {
        const results = searchContent(query);
        displaySearchResults(results, query);
    }, 1000);
}

function searchContent(query) {
    const allContent = [
        ...announcementsData,
        ...circularsData,
        ...officersData.map(o => ({...o, type: 'officer' }))
    ];

    return allContent.filter(item =>
        (item.title && item.title.toLowerCase().includes(query.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
        (item.name && item.name.toLowerCase().includes(query.toLowerCase()))
    );
}

function displaySearchResults(results, query) {
    const modal = createModal();
    const modalContent = modal.querySelector('.modal-content');

    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeModal()">&times;</button>
        <h2>Search Results for: "${query}"</h2>
        <p>Found ${results.length} result(s)</p>
        <div class="search-results">
            ${results.map(result => `
                <div class="search-result-item">
                    <h3>${result.title || result.name}</h3>
                    <p>${result.description || result.tenure || 'No description available'}</p>
                    ${result.date ? `<small>Date: ${formatDate(result.date)}</small>` : ''}
                </div>
            `).join('')}
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 50);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes modal
    if (e.key === 'Escape') {
        closeModal();
    }

    // Arrow keys for hero slider
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Resize Handler
const handleResize = debounce(() => {
    // Reinitialize components that need resize handling
    if (window.innerWidth <= 768) {
        createMobileMenuToggle();
    }
}, 250);

window.addEventListener('resize', handleResize);

// Form Validation
function validateForm(formData) {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email || !isValidEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!formData.message || formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long';
    }

    return errors;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// High Contrast Mode CSS
const highContrastStyles = `
    .high-contrast {
        filter: contrast(150%) brightness(120%);
    }
    
    .high-contrast .btn {
        border: 3px solid currentColor;
    }
    
    .high-contrast a {
        text-decoration: underline;
    }
    
    .high-contrast .card {
        border: 2px solid #333;
    }
`;

// Add high contrast styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = highContrastStyles;
document.head.appendChild(styleSheet);

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Service Worker Registration removed for local development

// Analytics (placeholder)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', { category, action, label });
}

// Initialize components on load
document.addEventListener('DOMContentLoaded', () => {
    loadMainGallery();

    // Add click tracking to important elements
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('Button', 'Click', btn.textContent.trim());
        });
    });
});


 // Sukanta JS:

// gallery Lightbox popup:
const images = [];
$('.galleryPageContent figure img').each(function() {
    images.push($(this).attr('src'));
});

let currentIndex = 0;

function showLightbox(index) {
    $('.lightbox-image').attr('src', images[index]);
    $('.image-counter').text(`${index + 1} / ${images.length}`);
    $('.lightbox-overlay').fadeIn();
}

$('.galleryPageContent figure').click(function() {
    currentIndex = $(this).parent().index();
    showLightbox(currentIndex);
});

$('.close-btn').click(function() {
    $('.lightbox-overlay').fadeOut();
});

$('.next-btn').click(function() {
    currentIndex = (currentIndex + 1) % images.length;
    showLightbox(currentIndex);
});

$('.prev-btn').click(function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showLightbox(currentIndex);
});

// whats new js
const ticker = $('#news_list');
    const tickerInner = ticker.find('.ticker_inner');
    const speed = 1; // Pixels per frame

    let isPaused = false;
    let isDragging = false;
    let startY = 0;
    let startMargin = 0;
    let currentMargin = 0;
    const totalHeight = tickerInner.height() / 2; // Original content height

    // Duplicate content once for infinite effect
    if (tickerInner.find('.ticker_clone').length === 0) {
        tickerInner.append(tickerInner.html()).addClass('ticker_clone');
    }

    function step() {
        if (!isPaused && !isDragging) {
            currentMargin -= speed;

            if (Math.abs(currentMargin) >= totalHeight) {
                currentMargin = 0;
            }

            tickerInner.css('margin-top', currentMargin + 'px');
        }

        requestAnimationFrame(step);
    }

    // Pause on hover
    ticker.hover(
        function() { isPaused = true; },
        function() { isPaused = false; }
    );

    // Drag start
    ticker.on('mousedown touchstart', function(e) {
        isDragging = true;
        isPaused = true;

        startY = e.pageY || e.originalEvent.touches[0].pageY;
        startMargin = currentMargin;

        tickerInner.find('.news_box').addClass('grabbing'); // Apply grabbing cursor
        e.preventDefault();
    });

    // Drag move
    $(document).on('mousemove touchmove', function(e) {
        if (isDragging) {
            let y = e.pageY || e.originalEvent.touches[0].pageY;
            let delta = y - startY;

            currentMargin = startMargin + delta;
            tickerInner.css('margin-top', currentMargin + 'px');
        }
    });

    // Drag end
    $(document).on('mouseup touchend', function() {
        if (isDragging) {
            isDragging = false;
            isPaused = false;

            tickerInner.find('.news_box').removeClass('grabbing'); // Remove grabbing cursor
        }
    });

    // Start the marquee
    requestAnimationFrame(step);


   


    // Menu
    // $('.nav-menu li').each(function() {
    //     if ($(this).children('ul').length > 0) {
    //         // Check if the icon is already there (optional safety check)
    //         if ($(this).children('a').find('i.fas.fa-chevron-down').length === 0) {
    //             $(this).children('a').append(' <i class="fas fa-chevron-down"></i>');
    //         }
    //     }
    // });

    // Site menu js:
    function setupMenu() {
    const isMobile = $(window).width() <= 2500;

    // Reset icons, event handlers, and classes
    $('.nav-menu li i.fas.fa-chevron-down').remove();
    $('.nav-menu li > a').off('click').removeClass('current');
    $('.nav-menu ul').removeAttr('style'); // Remove inline styles

    $('.nav-menu li').each(function () {
        const $li = $(this);
        const $link = $li.children('a');
        const $submenu = $li.children('ul');

        if ($submenu.length > 0) {
            // Add chevron icon
            $link.append(' <i class="fas fa-chevron-down"></i>');

            if (isMobile) {
                $submenu.hide();

                $link.on('click', function (e) {
                    e.preventDefault();

                    // Close other submenus and remove 'current' class
                    $li.siblings().children('ul').slideUp();
                    $li.siblings().children('a').removeClass('current');

                    // Toggle current submenu
                    $submenu.slideToggle(300, function () {
                        if ($submenu.is(':visible')) {
                            $link.addClass('current');
                        } else {
                            $link.removeClass('current');
                        }
                    });
                });
            } else {
                $submenu.show();
                $link.removeClass('current');
            }
        }
    });
}

// Close dropdowns when clicking outside
$(document).on('click', function (e) {
    const $target = $(e.target);

    if (!$target.closest('.nav-menu').length) {
        $('.nav-menu ul').slideUp();
        $('.nav-menu a').removeClass('current');
    }
});

$(document).ready(setupMenu);
$(window).resize(setupMenu);

$(".nav-container,.nav-bar .container").prepend("<a href='#' class='mobileButton'></a>");
$(".nav-menu").prepend("<a href='#' class='closeButton'></a>");

$('a.mobileButton').click(function(e) {
    e.preventDefault();
    $(".nav-menu").addClass('change');
});
$('a.closeButton').click(function(e) {
    e.preventDefault();
    $(".nav-menu").removeClass('change');
});

$(document).on("mouseup", function(e) {
    if (!$(e.target).closest(".nav-bar").length) {
        $(".nav-menu").removeClass("change");
    }
});



 // Tabs
tab1 = $('.tab_panel');
$('.custom_tab_nav a:first').addClass('current');
$('.tab_panel:first').show();
$('.custom_tab_nav a').click(function(e) {
    e.preventDefault();
    var index = $(this).index();
    tab1.hide();
    tab1.eq(index).fadeIn();
    $('.custom_tab_nav a').removeClass('current');
    $(this).addClass('current');
});

$(function() {
    $(".imageGallery .gallery-grid-item").slice(0, 8).fadeIn('fast');
    $("#load_more_image").on('click', function(e) {
        e.preventDefault();
        $(".imageGallery .gallery-grid-item:hidden").slice(0, 4).fadeIn('fast');
        if ($(".imageGallery .gallery-grid-item:hidden").length == 0) {
            // $("#load_more").remove();
            $("#load_more_image").text("No More Content").addClass("noContent");
        } else {
            $('html,body').animate({
                scrollTop: $(this).offset().top - 500
            }, 1500);
        }
    });
});
$(function() {
    $(".videoGallery .gallery-grid-item").slice(0, 8).fadeIn('fast');
    $("#load_more_video").on('click', function(e) {
        e.preventDefault();
        $(".videoGallery .gallery-grid-item:hidden").slice(0, 4).fadeIn('fast');
        if ($(".videoGallery .gallery-grid-item:hidden").length == 0) {
            // $("#load_more").remove();
            $("#load_more_video").text("No More Content").addClass("noContent");
        } else {
            $('html,body').animate({
                scrollTop: $(this).offset().top - 500
            }, 1500);
        }
    });
});




$(document).ready(function() {
    $('#bannerSlider').slick({
        slidesToShow: 1,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1500,
        speed: 700
    });

    let isPlaying = true;

    $('.prevBtn').click(function(e) {
        e.preventDefault();
        $('#bannerSlider').slick('slickPrev');
    });

    $('.nextBtn').click(function(e) {
        e.preventDefault();
        $('#bannerSlider').slick('slickNext');
    });

    $('.playBtn').click(function(e) {
        e.preventDefault();
        if (isPlaying) {
            $('#bannerSlider').slick('slickPause');
            $(this).text('❚❚');
        } else {
            $('#bannerSlider').slick('slickPlay');
            $(this).text('▶');
        }
        isPlaying = !isPlaying;
    });
    // ======================================================

    $('#gallerySlider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    speed: 1000,
    autoplaySpeed: 900,
    infinite: true,
    autoplay: true,
    responsive: [{
            breakpoint: 1201,
            settings: {
                slidesToShow: 4
            },
        },
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 3
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1
            },
        },
    ],
});

    $('.info_slide').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        speed: 1000,
        autoplaySpeed: 700,
        infinite: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});

function equalHeight(selector) {
    let max = 0;

    $(selector).css('height', 'auto').each(function() {
        max = Math.max(max, $(this).height());
    });

    $(selector).height(max);
}

$(window).on('load resize', function() {
    equalHeight('.gallery-grid-item .txt');
});

// Initialize FAQ Tabs
$('.faq_nav a').first().addClass('current');
$('.tabPane').hide().first().show().each(function() {
    $(this).find('.custom_acc_trigger').first().addClass('current').next().slideDown(0);
});

$('.faq_nav a').on('click', function(e) {
    e.preventDefault();
    var i = $(this).index();

    $('.faq_nav a').removeClass('current');
    $(this).addClass('current');

    $('.tabPane').hide().eq(i).show().each(function() {
        $(this).find('.custom_acc_trigger').removeClass('current').next().hide();
        $(this).find('.custom_acc_trigger').first().addClass('current').next().slideDown('fast');
    });
});

// Accordion Behavior
$('.custom_acc_trigger').click(function() {
    if ($(this).next().is(':hidden')) {
        $(this).closest('.tabPane').find('.custom_acc_trigger').removeClass('current').next().slideUp('fast');
        $(this).addClass('current').next().slideDown('fast');
    } else {
        $(this).removeClass('current');
        $(this).next().slideUp('fast');
    }
    return false;
});

// Sticky hdears js
$(window).on("scroll", function () {
    if ($(window).scrollTop() > 175) {
      $(".nav-bar").addClass("sticky");
    } else {
      $(".nav-bar").removeClass("sticky");
    }
});