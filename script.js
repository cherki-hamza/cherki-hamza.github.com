/* ============================================
   CHERKI HAMZA - PORTFOLIO SCRIPTS
   Modern Animations & Interactions
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initNavigation();
    initScrollEffects();
    initCounterAnimation();
    initScrollReveal();
    initSmoothScroll();
    initFormHandling();
    initParallax();
});

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower follows with delay
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact__item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Header scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
}

/* ============================================
   SCROLL EFFECTS
   ============================================ */
function initScrollEffects() {
    // Parallax effect for hero gradient
    const heroGradient = document.querySelector('.hero__gradient');
    
    if (heroGradient) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroGradient.style.transform = `translate(0, ${scrolled * 0.3}px)`;
        });
    }
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat__number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Use Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

/* ============================================
   SCROLL REVEAL ANIMATION
   ============================================ */
function initScrollReveal() {
    // Add reveal classes to elements
    const elementsToReveal = [
        { selector: '.section-header', class: 'reveal' },
        { selector: '.about__image-wrapper', class: 'reveal-left' },
        { selector: '.about__content', class: 'reveal-right' },
        { selector: '.skill-category', class: 'reveal' },
        { selector: '.project-card', class: 'reveal' },
        { selector: '.contact__info', class: 'reveal-left' },
        { selector: '.contact__form', class: 'reveal-right' }
    ];
    
    elementsToReveal.forEach(item => {
        document.querySelectorAll(item.selector).forEach(el => {
            if (!el.classList.contains(item.class)) {
                el.classList.add(item.class);
            }
        });
    });
    
    // Create observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children').forEach(el => {
        revealObserver.observe(el);
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   FORM HANDLING
   ============================================ */
function initFormHandling() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span><i class="bx bx-loader-alt bx-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success state
            submitBtn.innerHTML = '<span>Message Sent!</span><i class="bx bx-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Error state
            submitBtn.innerHTML = '<span>Error! Try Again</span><i class="bx bx-x"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
    
    // Add focus effects to form inputs
    const formGroups = form.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        
        input?.addEventListener('focus', () => {
            group.classList.add('focused');
        });
        
        input?.addEventListener('blur', () => {
            group.classList.remove('focused');
        });
    });
}

/* ============================================
   PARALLAX EFFECTS
   ============================================ */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/* ============================================
   TYPING EFFECT (Optional enhancement)
   ============================================ */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const words = ['Full Stack Developer', 'Laravel Expert', 'React Developer', 'Flutter Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

/* ============================================
   MAGNETIC BUTTON EFFECT
   ============================================ */
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn--primary');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/* ============================================
   PRELOADER (Optional)
   ============================================ */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        });
    }
}

/* ============================================
   PROJECT CARD TILT EFFECT
   ============================================ */
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Initialize additional effects
document.addEventListener('DOMContentLoaded', () => {
    initMagneticButtons();
    initTiltEffect();
});

/* ============================================
   SKILL PROGRESS ANIMATION (Optional)
   ============================================ */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.dataset.progress || 0;
                bar.style.width = progress + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

/* ============================================
   DARK/LIGHT MODE TOGGLE (Optional)
   ============================================ */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

/* ============================================
   LOADING STATE FOR IMAGES
   ============================================ */
function initImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Console easter egg
console.log('%c👋 Hey there, curious developer!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in working together? Contact me at cherkihamzafullstack@gmail.com', 'font-size: 14px; color: #a0a0b0;');