document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation using IntersectionObserver
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Handle initial load (in case they are already in viewport)
    setTimeout(() => {
        reveals.forEach(reveal => {
            const rect = reveal.getBoundingClientRect();
            if (rect.top <= window.innerHeight) {
                reveal.classList.add('active');
            }
        });
    }, 100);

    // 2. Header Style on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Custom Cursor Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show cursor if hidden
        if (cursorGlow.style.opacity === "0") {
            cursorGlow.style.opacity = "1";
        }
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = "0";
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = "1";
    });

    // Smooth follow loop for cursor glow
    function animateCursor() {
        let distX = mouseX - glowX;
        let distY = mouseY - glowY;
        
        glowX += distX * 0.15;
        glowY += distY * 0.15;
        
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    // Initialize animation
    animateCursor();
    // Hide initially until mouse moves
    cursorGlow.style.opacity = "0";
});
