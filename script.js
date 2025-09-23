// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});


document.querySelectorAll('.btn-primary, .btn-secondary, .start-btn, .cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});


document.querySelectorAll('button, .btn-primary, .btn-secondary, .start-btn, .cta-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});



// Add typing effect to hero title
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    setTimeout(() => {
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        typeWriter();
    }, 500);
}


function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Divide into 50 steps
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toString().includes('+') ? target : target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 30);
}


const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.stat-number');
            const text = numberElement.textContent;
            
            // fade in
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});


const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Stagger 
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    featureObserver.observe(card);
});


document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Chat-GA! feature coming soon! 🤖');
        });
    });

    // Visit UMTC Portal button
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
          
            window.open('https://portal.umindanao.edu.ph/', '_blank');
        });
    });

  
    document.querySelectorAll('.learn-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('More information coming soon!');
        });
    });
});


function handleResponsiveChanges() {
    const width = window.innerWidth;
    
    
    if (width <= 768) {
      
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.transition = 'all 0.3s ease-out';
        });
    } else {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.transition = 'all 0.6s ease-out';
        });
    }
 
    if (width <= 480) {
  
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle && heroTitle.textContent === '') {
            heroTitle.textContent = 'Chat-GA!';
        }
    }
}

window.addEventListener('load', handleResponsiveChanges);
window.addEventListener('resize', handleResponsiveChanges);

if ('ontouchstart' in window) {
   
    document.querySelectorAll('.btn-primary, .btn-secondary, .start-btn, .cta-btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
  
    document.body.style.webkitOverflowScrolling = 'touch';
}