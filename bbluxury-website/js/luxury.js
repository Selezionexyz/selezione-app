// BBLUXURY # SELEZIONE - JavaScript Avancé

class LuxuryWebsite {
    constructor() {
        this.init();
        this.bindEvents();
        this.initAnimations();
    }

    init() {
        // Configuration initiale
        this.isScrolling = false;
        this.lastScrollTop = 0;
        this.ticking = false;
        
        // Initialiser les composants
        this.createScrollIndicator();
        this.initLazyLoading();
        this.initIntersectionObserver();
    }

    bindEvents() {
        // Navigation smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.smoothScroll.bind(this));
        });

        // Scroll events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));

        // Form handling
        const contactForm = document.querySelector('#contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Mobile menu
        this.initMobileMenu();

        // Luxury effects
        this.initLuxuryEffects();
    }

    smoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Add active state to navigation
            this.updateActiveNav(targetId);
        }
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateScrollIndicator();
                this.updateHeaderBackground();
                this.handleScrollDirection();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateScrollIndicator() {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            const scrollPercent = (window.scrollY / 
                (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = `${Math.min(scrollPercent, 100)}%`;
        }
    }

    createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = '<div class="scroll-progress"></div>';
        document.body.appendChild(indicator);
    }

    updateHeaderBackground() {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    }

    handleScrollDirection() {
        const currentScrollTop = window.scrollY;
        const header = document.querySelector('header');
        
        if (currentScrollTop > this.lastScrollTop && currentScrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = currentScrollTop;
    }

    updateActiveNav(activeId) {
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`nav a[href="${activeId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Animate statistics counters
                    if (entry.target.classList.contains('stat-item')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe reveal sections
        document.querySelectorAll('.reveal-section, .stat-item, .service-card').forEach(el => {
            observer.observe(el);
        });
    }

    animateCounter(element) {
        const numberElement = element.querySelector('.stat-number');
        if (!numberElement || numberElement.dataset.animated) return;

        const finalNumber = parseInt(numberElement.textContent);
        const duration = 2000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentNumber = Math.floor(finalNumber * easeOutCubic);
            
            numberElement.textContent = currentNumber;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                numberElement.textContent = finalNumber + (numberElement.textContent.includes('+') ? '+' : '');
                numberElement.dataset.animated = 'true';
            }
        };
        
        requestAnimationFrame(animate);
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
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

        images.forEach(img => imageObserver.observe(img));
    }

    initMobileMenu() {
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuButton.setAttribute('aria-label', 'Menu mobile');
        
        const header = document.querySelector('.header-content');
        header.appendChild(mobileMenuButton);

        mobileMenuButton.addEventListener('click', () => {
            const nav = document.querySelector('nav');
            nav.classList.toggle('mobile-open');
            
            const icon = mobileMenuButton.querySelector('i');
            icon.className = nav.classList.contains('mobile-open') ? 
                'fas fa-times' : 'fas fa-bars';
        });
    }

    initLuxuryEffects() {
        // Cursor luxury effect
        this.initCursorEffect();
        
        // Parallax effect for hero
        this.initParallaxEffect();
        
        // Typing effect for tagline
        this.initTypingEffect();
        
        // Luxury particles
        this.initLuxuryParticles();
    }

    initCursorEffect() {
        const cursor = document.createElement('div');
        cursor.className = 'luxury-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div>';
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();

        // Add hover effects
        document.querySelectorAll('a, button, .service-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    initParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }

    initTypingEffect() {
        const tagline = document.querySelector('.hero-content .tagline');
        if (!tagline) return;

        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing effect after hero animation
        setTimeout(typeWriter, 2000);
    }

    initLuxuryParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'luxury-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(212, 175, 55, 0.6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
            `;
            hero.appendChild(particle);
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Merci pour votre demande ! Nous vous contacterons sous 24h.', 'success');
            e.target.reset();
            
            // Restore button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        });
    }

    handleResize() {
        // Recalculate parallax and other responsive elements
        this.initParallaxEffect();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LuxuryWebsite();
});

// Add CSS for custom elements
const luxuryStyles = `
    .luxury-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
    }

    .cursor-dot {
        width: 100%;
        height: 100%;
        background: var(--primary-gold);
        border-radius: 50%;
        transition: transform 0.3s ease;
    }

    .luxury-cursor.hover .cursor-dot {
        transform: scale(2);
    }

    .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        color: var(--text-light);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-gray);
        border: var(--border-gold);
        border-radius: 10px;
        padding: 1rem;
        z-index: 10000;
        transform: translateX(100%);
        animation: slideInNotification 0.3s ease forwards;
    }

    .notification.fade-out {
        animation: slideOutNotification 0.3s ease forwards;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--text-light);
    }

    .notification-close {
        background: none;
        border: none;
        color: var(--text-gray);
        cursor: pointer;
        margin-left: auto;
    }

    .notification-success {
        border-color: #10B981;
    }

    .notification-success i {
        color: #10B981;
    }

    @keyframes slideInNotification {
        to { transform: translateX(0); }
    }

    @keyframes slideOutNotification {
        to { transform: translateX(100%); }
    }

    @keyframes float {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.7;
        }
        50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block;
        }

        nav ul {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background: rgba(26, 26, 26, 0.98);
            flex-direction: column;
            padding: 2rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }

        nav.mobile-open ul {
            transform: translateX(0);
        }

        .luxury-cursor {
            display: none;
        }
    }
`;

// Inject luxury styles
const styleSheet = document.createElement('style');
styleSheet.textContent = luxuryStyles;
document.head.appendChild(styleSheet);