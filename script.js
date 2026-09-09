document.addEventListener('DOMContentLoaded', () => {

    /* 1. Starfield Background Particle Animation */
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 160;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < numStars; i++) stars.push(new Star());

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();

    /* 2. Scroll Reveal Animations */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* 3. Interactive 3D Card Tilt Effect */
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            card.style.boxShadow = `0 15px 35px rgba(0, 240, 255, 0.3)`;
            card.style.borderColor = 'var(--primary)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.boxShadow = `none`;
            card.style.borderColor = 'var(--glass-border)';
        });
    });

    /* 4. Download Trigger & Modal Logic */
    const modal = document.getElementById('downloadModal');
    const modalPlatform = document.getElementById('modalPlatform');
    const modalStatus = document.getElementById('modalStatus');
    const modalClose = document.getElementById('modalClose');

    function triggerDownload(platform) {
        modal.style.display = 'flex';
        modalPlatform.innerText = `Downloading for ${platform}...`;
        modalStatus.innerText = "Fetching payload release build...";

        setTimeout(() => {
            modalStatus.innerText = "Download Started! Check your browser downloads.";
        }, 2000);
    }

    document.getElementById('download-pc').addEventListener('click', (e) => {
        e.preventDefault();
        triggerDownload('PC');
    });

    document.getElementById('download-mobile').addEventListener('click', (e) => {
        e.preventDefault();
        triggerDownload('Mobile');
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});