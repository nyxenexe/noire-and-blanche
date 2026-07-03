

(function() {
    'use strict';

    // dom refs
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    const allNavAnchors = document.querySelectorAll('.nav-links a');
    const allSections = document.querySelectorAll('section[id]');

    const MOBILE_BREAKPOINT = 768;
    const NAV_HEIGHT = 80;

    // 1. page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // copyright year
    const footerText = document.querySelector('.footer-bottom p:first-child');
    if (footerText && !footerText.textContent.includes('Lekki')) {
        footerText.textContent = `© ${new Date().getFullYear()} Noire & Blanche. All rights reserved.`;
    }

    // 2. mobile nav toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // close on link click
        allNavAnchors.forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });

        // close on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMobileNav();
            }
        });
    }

    function closeMobileNav() {
        if (!navLinks || !navToggle) return;
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 3. smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // 4. scroll handler
    function throttle(fn, limit) {
        let inThrottle = false;
        return function() {
            if (!inThrottle) {
                fn.apply(this, arguments);
                inThrottle = true;
                setTimeout(() => { inThrottle = false; }, limit);
            }
        };
    }

    function handleScroll() {
        const scrollY = window.scrollY;

        // navbar scrolled state
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 50);
        }

        // active nav highlighting
        if (allSections.length && allNavAnchors.length) {
            let current = '';
            allSections.forEach(section => {
                if (scrollY >= section.offsetTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            allNavAnchors.forEach(link => {
                const linked = link.getAttribute('href').slice(1);
                link.classList.toggle('active', linked === current);
            });
        }

        // scroll progress
        const progress = document.querySelector('.scroll-progress');
        if (progress) {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = scrollable > 0 ? `${(scrollY / scrollable) * 100}%` : '0%';
        }

        // hero parallax
        if (heroBg) {
            heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.08}px)`;
        }

        // reveal on scroll fallback
        document.querySelectorAll('.observe-element:not(.revealed):not(.fade-in)').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 120) {
                el.classList.add('revealed');
            }
        });
    }

    // create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', throttle(handleScroll, 60));
    handleScroll();

    // 5. intersection observer
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

        document.querySelectorAll('.menu-category, .review-card, .feature, .gallery-item').forEach(el => {
            el.classList.add('observe-element');
            observer.observe(el);
        });

        // lazy load images
        const imgObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) img.src = img.dataset.src;
                    img.classList.add('loaded');
                    obs.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    }

    // 6. gallery lightbox
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const captionEl = this.querySelector('.gallery-overlay p');
            if (!img) return;

            // use high-res if available
            const fullSrc = img.dataset.full || img.src;

            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${fullSrc}" alt="${img.alt}">
                    <p>${captionEl ? captionEl.textContent : ''}</p>
                </div>
            `;
            document.body.appendChild(lightbox);

            requestAnimationFrame(() => lightbox.classList.add('active'));

            const close = () => {
                lightbox.classList.remove('active');
                setTimeout(() => lightbox.remove(), 300);
            };

            lightbox.querySelector('.lightbox-close').addEventListener('click', close);
            lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
            document.addEventListener('keydown', function onEscape(e) {
                if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onEscape); }
            });
        });
    });

    // 7. button ripple
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                width:${size}px;height:${size}px;
                left:${e.clientX - rect.left - size/2}px;
                top:${e.clientY - rect.top - size/2}px;
            `;
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 8. click-to-call feedback
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            this.style.color = '#d4af37';
            setTimeout(() => { this.style.color = ''; }, 300);
        });
    });

    // 9. utilities

    // email validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // form validation
    function validateForm(formData) {
        const errors = [];
        if (!formData.name || formData.name.trim() === '') errors.push('Name is required');
        if (!formData.email || !isValidEmail(formData.email)) errors.push('Valid email is required');
        if (!formData.message || formData.message.trim() === '') errors.push('Message is required');
        return errors;
    }

    // menu filter
    function filterMenuItems(category) {
        document.querySelectorAll('.menu-category').forEach(item => {
            const match = category === 'all' || item.dataset.category === category;
            item.style.opacity = match ? '1' : '0.5';
            item.style.pointerEvents = match ? 'auto' : 'none';
        });
    }

    // counter animation
    function animateCounter(element, target, duration = 2000) {
        if (!element) return;
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toFixed(1);
                clearInterval(timer);
            } else {
                element.textContent = current.toFixed(1);
            }
        }, 16);
    }

    // expose globally
    window.NoireBlanche = {
        isValidEmail,
        validateForm,
        filterMenuItems,
        animateCounter
    };

    // 10. gallery toggle
    const galleryToggleBtn = document.getElementById('galleryToggleBtn');
    const galleryExpanded = document.getElementById('galleryExpanded');
    let galleryObserved = false;

    if (galleryToggleBtn && galleryExpanded) {
        galleryToggleBtn.addEventListener('click', function() {
            const isOpen = galleryExpanded.classList.toggle('open');
            this.setAttribute('aria-expanded', isOpen);
            this.textContent = isOpen ? 'View Less' : 'View More';

            // observe expanded items on first open only
            if (isOpen && !galleryObserved) {
                galleryObserved = true;
                const observer = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('fade-in');
                            obs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });

                galleryExpanded.querySelectorAll('.gallery-item').forEach(el => {
                    el.classList.add('observe-element');
                    observer.observe(el);
                });
            }
        });
    }

    // 11. console welcome
    console.log('%cNoire & Blanche', 'font-size:20px;font-weight:bold;color:#d4af37;');
    console.log('%cQuiet luxury. Perfect coffee. Precise design.', 'color:#8a8a8a;font-style:italic;');

})();