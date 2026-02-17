// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = '#fff';
        navLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        navLinks.style.padding = '1rem 0';

        // Add styles to li elements
        const links = navLinks.querySelectorAll('li');
        links.forEach(link => {
            link.style.margin = '1rem 0';
            link.style.textAlign = 'center';
        });
    }
});

// Fade In Animation on Scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.category-card, .about-section, .gallery-item, .feature-card, .testimonial-card, .section-header, .value-card, .team-member, .story-content, .hero-banner');

fadeElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Mobile Collection Slider - Infinite Loop
const collectionSlider = document.getElementById('mobile-collection-slider');

if (collectionSlider) {
    let isPaused = false;
    let resumeTimeout;
    let scrollPos = collectionSlider.scrollLeft;
    // Speed: Slow and premium (12-20s / cycle)
    // 0.6 pixels per frame at 60fps is approx 36px/s. 
    // If width ~1200px -> ~33 seconds. Too slow.
    // 1.0 -> 60px/s -> 20s. Good.
    const speed = 0.8;

    function getResetPoint() {
        if (collectionSlider.children.length > 4) {
            const first = collectionSlider.children[0];
            const firstClone = collectionSlider.children[4];
            // Use distance between first item and its clone
            // This works regardless of what the offsetParent is
            const rectFirst = first.getBoundingClientRect();
            const rectClone = firstClone.getBoundingClientRect();
            return Math.abs(rectClone.left - rectFirst.left);
        }
        return 0;
    }

    let resetPoint = getResetPoint();

    // Update reset point on resize
    window.addEventListener('resize', () => {
        resetPoint = getResetPoint();
    });

    function loop() {
        // Only run if visible (e.g. mobile)
        if (!collectionSlider.offsetParent) {
            requestAnimationFrame(loop);
            return;
        }

        if (!isPaused) {
            // Auto slide
            scrollPos += speed;

            // Check loop condition
            if (resetPoint > 0 && scrollPos >= resetPoint) {
                scrollPos -= resetPoint;
            }

            collectionSlider.scrollLeft = scrollPos;
        } else {
            // Sync with manual scroll
            scrollPos = collectionSlider.scrollLeft;
        }

        requestAnimationFrame(loop);
    }

    // Start Start loop
    // Small delay to ensure layout is ready
    setTimeout(loop, 100);

    // Interaction Handling
    const pause = () => {
        isPaused = true;
        clearTimeout(resumeTimeout);
    };

    const resume = () => {
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            isPaused = false;
            // Re-sync position to avoid jump
            scrollPos = collectionSlider.scrollLeft;
        }, 3000); // 3 seconds pause before resuming
    };

    collectionSlider.addEventListener('touchstart', pause, { passive: true });
    collectionSlider.addEventListener('mousedown', pause);

    collectionSlider.addEventListener('touchend', resume);
    collectionSlider.addEventListener('mouseup', resume);
    collectionSlider.addEventListener('mouseleave', resume);
}

// Mobile Gallery Slider - Infinite Loop
const gallerySlider = document.getElementById('gallery-mobile-slider');

if (gallerySlider) {
    let isPaused = false;
    let resumeTimeout;
    let scrollPos = gallerySlider.scrollLeft;
    // Speed: Slow and premium (15-25s / cycle)
    const speed = 0.6; // Slightly slower than collection for "slow moving strip" feel

    function getGalleryResetPoint() {
        if (gallerySlider.children.length > 6) {
            // We have 6 original items. The clone starts at index 6.
            const first = gallerySlider.children[0];
            const firstClone = gallerySlider.children[6];
            const rectFirst = first.getBoundingClientRect();
            const rectClone = firstClone.getBoundingClientRect();
            return Math.abs(rectClone.left - rectFirst.left);
        }
        return 0;
    }

    let resetPoint = getGalleryResetPoint();

    window.addEventListener('resize', () => {
        resetPoint = getGalleryResetPoint();
    });

    function galleryLoop() {
        if (!gallerySlider.offsetParent) {
            requestAnimationFrame(galleryLoop);
            return;
        }

        if (!isPaused) {
            scrollPos += speed;

            if (resetPoint > 0 && scrollPos >= resetPoint) {
                scrollPos -= resetPoint;
            }

            gallerySlider.scrollLeft = scrollPos;
        } else {
            scrollPos = gallerySlider.scrollLeft;
        }

        requestAnimationFrame(galleryLoop);
    }

    setTimeout(galleryLoop, 100);

    const pause = () => {
        isPaused = true;
        clearTimeout(resumeTimeout);
    };

    const resume = () => {
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            isPaused = false;
            scrollPos = gallerySlider.scrollLeft;
        }, 3000);
    };

    gallerySlider.addEventListener('touchstart', pause, { passive: true });
    gallerySlider.addEventListener('mousedown', pause);

    gallerySlider.addEventListener('touchend', resume);
    gallerySlider.addEventListener('mouseup', resume);
    gallerySlider.addEventListener('mouseleave', resume);
}
