document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active Link Update
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        });
    });

    // Copy IP Functionality
    const copyIpBtn = document.getElementById('copyIpBtn');
    const serverIp = 'madeby.mine.gg';
    
    copyIpBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(serverIp);
            
            // Visual Feedback
            copyIpBtn.classList.add('copy-success');
            const btnText = copyIpBtn.querySelector('.btn-text strong');
            const originalText = btnText.textContent;
            const icon = copyIpBtn.querySelector('.copy-icon');
            
            btnText.textContent = 'IP Copiado!';
            icon.classList.remove('ph-copy');
            icon.classList.add('ph-check-circle');
            
            setTimeout(() => {
                copyIpBtn.classList.remove('copy-success');
                btnText.textContent = originalText;
                icon.classList.remove('ph-check-circle');
                icon.classList.add('ph-copy');
            }, 2000);
            
        } catch (err) {
            console.error('Falha ao copiar o IP: ', err);
            alert('Não foi possível copiar o IP. Copie manualmente: ' + serverIp);
        }
    });

    // Fade-in Animation on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in to specific elements
    const elementsToAnimate = [
        ...document.querySelectorAll('.section-header'),
        ...document.querySelectorAll('.about-content'),
        ...document.querySelectorAll('.members-category'),
        ...document.querySelectorAll('.rule-card'),
        ...document.querySelectorAll('.contact-actions')
    ];

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
});
