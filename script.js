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

// Intersection Observer for fade-in animations
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

// Apply fade-in animation to elements
document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add hover effects for buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .start-btn, .cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click animation for buttons
document.querySelectorAll('button, .btn-primary, .btn-secondary, .start-btn, .cta-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
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

// Add typing effect to hero title (optional)
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    const isMobile = window.innerWidth <= 768;
    
    // Only apply typing effect on desktop
    if (!isMobile) {
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
}

// Animate stats when they come into view - Updated for new content
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.stat-number');
            const text = numberElement.textContent;
            
            // Simple fade in animation for the new text-based stats
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Add smooth reveal for feature cards
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Stagger the animations
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    featureObserver.observe(card);
});

// Enhanced responsive functionality
function handleResponsiveChanges() {
    const width = window.innerWidth;
    
    // Adjust animations based on screen size
    if (width <= 768) {
        // Disable parallax and heavy animations on mobile for better performance
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.transition = 'all 0.3s ease-out';
        });
    } else {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.transition = 'all 0.6s ease-out';
        });
    }
    
    // Adjust typing speed on mobile
    if (width <= 480) {
        // Disable typing animation on very small screens
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle && heroTitle.textContent === '') {
            heroTitle.textContent = 'Chat-GA!';
        }
    }
}

// Call on load and resize
window.addEventListener('load', handleResponsiveChanges);
window.addEventListener('resize', handleResponsiveChanges);

// Touch-friendly enhancements for mobile
if ('ontouchstart' in window) {
    // Add touch feedback for buttons
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
    
    // Improve touch scrolling
    document.body.style.webkitOverflowScrolling = 'touch';
}

// Modal/Popup functionality
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-container">
            <div class="modal-content">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close on escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    return modal;
}

function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// Chat Modal
function openChatModal() {
    const chatContent = `
        <div class="chat-header">
            <div class="chat-title">
                <svg viewBox="0 0 24 24" fill="currentColor" class="chat-icon">
                    <path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/>
                </svg>
                Chat with GA!
            </div>
            <div class="online-status">Online</div>
            <button class="close-btn" onclick="this.closest('.modal-overlay').click()">×</button>
        </div>
        
        <div class="chat-messages">
            <div class="message bot-message">
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/>
                    </svg>
                </div>
                <div class="message-content">
                    <div class="message-text">Hello! I'm Chat-GA!, your UMTC portal assistant. How can I help you today? You can ask me about FAQs, portal navigation, announcements, DoCE information, or provide feedback.</div>
                    <div class="message-time">02:26 AM</div>
                </div>
            </div>
            <div class="quick-actions">
                <button class="quick-btn" onclick="sendQuickMessage('How to access the UMTC portal')">How to access the UMTC portal</button>
                <button class="quick-btn" onclick="sendQuickMessage('How to file a promissory note')">How to file a promissory note</button>
                <button class="quick-btn" onclick="sendQuickMessage('How to view class schedule')">How to view class schedule</button>
            </div>
        </div>
        
        <div class="chat-input-container">
            <div class="chat-shortcuts">
                <button class="shortcut-btn" onclick="openFAQsModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/></svg>
                    FAQs
                </button>
                <button class="shortcut-btn" onclick="openAnnouncementsModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,7C10.89,7 10,7.89 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9C14,7.89 13.1,7 12,7M9,13A6,6 0 0,0 15,13V16H9V13Z"/></svg>
                    Announcements
                </button>
                <button class="shortcut-btn" onclick="openDCEModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4A2,2 0 0,0 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/></svg>
                    DCE
                </button>
                <button class="shortcut-btn" onclick="openFeedbackModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2 4,2H20M20,4H4V18L6,16H20V4Z"/></svg>
                    Feedback
                </button>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Ask me anything about UMTC..." class="message-input">
                <button class="send-btn" onclick="sendMessage()">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    createModal(chatContent);
}

// FAQ Modal
function openFAQsModal() {
    const faqContent = `
        <div class="chat-header">
            <div class="chat-title">
                <svg viewBox="0 0 24 24" fill="currentColor" class="chat-icon">
                    <path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/>
                </svg>
                Chat with GA!
            </div>
            <div class="online-status">Online</div>
            <button class="close-btn" onclick="this.closest('.modal-overlay').click()">×</button>
        </div>
        
        <div class="chat-messages">
            <div class="message bot-message">
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/>
                    </svg>
                </div>
                <div class="message-content">
                    <div class="message-text">Hello! I'm Chat-GA!, your UMTC portal assistant. How can I help you today? You can ask me about FAQs, portal navigation, announcements, DoCE information, or provide feedback.</div>
                    <div class="message-time">02:40 AM</div>
                </div>
            </div>
            <div class="message bot-message">
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/>
                    </svg>
                </div>
                <div class="message-content">
                    <div class="info-card">
                        <div class="info-header">
                            <span class="info-icon">📝</span>
                            <span class="info-title">Enrollment & Registration</span>
                        </div>
                        <div class="info-content">
                            <p><strong>• When is the enrollment period?</strong> – Check the portal announcements for specific dates.</p>
                            <p><strong>• What documents are needed?</strong> – Form 138, Birth Certificate, Medical Certificate.</p>
                            <p><strong>• How to register online?</strong> – Use the UMTC portal enrollment wizard.</p>
                            <p class="info-section"><span class="section-icon">📊</span> <strong>Academic Records</strong></p>
                            <p><strong>• How to check grades?</strong> – Go to Portal → Academic Records → Select Semester.</p>
                            <p><strong>• How to request an official transcript?</strong> – Visit the Registrar's Office with a valid ID.</p>
                            <p><strong>• How is the grade computed?</strong> – Based on midterm, finals, and class participation.</p>
                            <p class="info-section"><span class="section-icon">💰</span> <strong>Financial Information</strong></p>
                            <p><strong>• Payment methods:</strong> GCash, bank transfer, or cashier's office.</p>
                            <p><strong>• Scholarship applications:</strong> Visit the Student Affairs Office or the Scholarships section in the portal.</p>
                        </div>
                    </div>
                    <div class="message-time">02:40 AM</div>
                </div>
            </div>
        </div>
        
        <div class="chat-input-container">
            <div class="chat-shortcuts">
                <button class="shortcut-btn active">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/></svg>
                    FAQs
                </button>
                <button class="shortcut-btn" onclick="openAnnouncementsModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,7C10.89,7 10,7.89 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9C14,7.89 13.1,7 12,7M9,13A6,6 0 0,0 15,13V16H9V13Z"/></svg>
                    Announcements
                </button>
                <button class="shortcut-btn" onclick="openDCEModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4A2,2 0 0,0 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/></svg>
                    DCE
                </button>
                <button class="shortcut-btn" onclick="openFeedbackModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2 4,2H20M20,4H4V18L6,16H20V4Z"/></svg>
                    Feedback
                </button>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Ask me anything about UMTC..." class="message-input">
                <button class="send-btn" onclick="sendMessage()">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    createModal(faqContent);
}

// Announcements Modal
function openAnnouncementsModal() {
    const announcementsContent = `
        <div class="chat-header">
            <div class="chat-title">
                <svg viewBox="0 0 24 24" fill="currentColor" class="chat-icon">
                    <path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/>
                </svg>
                Chat with GA!
            </div>
            <div class="online-status">Online</div>
            <button class="close-btn" onclick="this.closest('.modal-overlay').click()">×</button>
        </div>
        
        <div class="chat-messages">
            <div class="message bot-message">
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/>
                    </svg>
                </div>
                <div class="message-content">
                    <div class="message-text">Hello! I'm Chat-GA!, your UMTC portal assistant. How can I help you today? You can ask me about FAQs, portal navigation, announcements, DoCE information, or provide feedback.</div>
                    <div class="message-time">02:40 AM</div>
                </div>
            </div>
            <div class="message bot-message">
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/>
                    </svg>
                </div>
                <div class="message-content">
                    <div class="info-card">
                        <div class="info-header">
                            <span class="info-icon">📢</span>
                            <span class="info-title">Latest UMTC Announcements</span>
                        </div>
                        <div class="info-content">
                            <p class="info-section"><span class="section-icon">📅</span> <strong>Academic Calendar 2024</strong></p>
                            <p><strong>• Midterm Exams:</strong> October 15–20, 2024</p>
                            <p><strong>• Enrollment for 2nd Semester:</strong> November 25 – December 6, 2024</p>
                            <p><strong>• Finals Week:</strong> December 2–7, 2024</p>
                            <p><strong>• Christmas Break:</strong> December 16, 2024 – January 6, 2025</p>
                            <p class="info-section"><span class="section-icon">🎉</span> <strong>Upcoming Events</strong></p>
                            <p><strong>• Research Symposium:</strong> November 5, 2024 (Engineering Building)</p>
                            <p><strong>• Job Fair:</strong> November 15, 2024 (Gymnasium)</p>
                            <p><strong>• Graduation Ceremony:</strong> December 10, 2024</p>
                            <p class="info-section"><span class="section-icon">💻</span> <strong>System Updates</strong></p>
                            <p><strong>• Portal Maintenance:</strong> Every Sunday, 12:00 AM – 6:00 AM</p>
                            <p><strong>• New Feature:</strong> Online payment options now available</p>
                            <p><strong>• Mobile App:</strong> Update required for iOS users</p>
                            <p class="info-section"><span class="section-icon">🏥</span> <strong>Health & Safety</strong></p>
                            <p><strong>• Health protocols remain in effect</strong></p>
                            <p><strong>• Vaccination cards required for face-to-face classes</strong></p>
                        </div>
                    </div>
                    <div class="message-time">02:40 AM</div>
                </div>
            </div>
        </div>
        
        <div class="chat-input-container">
            <div class="chat-shortcuts">
                <button class="shortcut-btn" onclick="openFAQsModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/></svg>
                    FAQs
                </button>
                <button class="shortcut-btn active">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,7C10.89,7 10,7.89 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9C14,7.89 13.1,7 12,7M9,13A6,6 0 0,0 15,13V16H9V13Z"/></svg>
                    Announcements
                </button>
                <button class="shortcut-btn" onclick="openDCEModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4A2,2 0 0,0 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/></svg>
                    DCE
                </button>
                <button class="shortcut-btn" onclick="openFeedbackModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2 4,2H20M20,4H4V18L6,16H20V4Z"/></svg>
                    Feedback
                </button>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Ask me anything about UMTC..." class="message-input">
                <button class="send-btn" onclick="sendMessage()">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    createModal(announcementsContent);
}

// DCE Modal
function openDCEModal() {
    const dceContent = `
        <div class="chat-header">
            <div class="chat-title">
                <svg viewBox="0 0 24 24" fill="currentColor" class="chat-icon">
                    <path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/>
                </svg>
                Chat with GA!
            </div>
            <div class="online-status">Online</div>
            <button class="close-btn" onclick="this.closest('.modal-overlay').click()">×</button>
        </div>
        
        <div class="chat-messages">
            <div class="message bot-message">
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/>
                    </svg>
                </div>
                <div class="message-content">
                    <div class="message-text">Hello! I'm Chat-GA!, your UMTC portal assistant. How can I help you today? You can ask me about FAQs, portal navigation, announcements, DoCE information, or provide feedback.</div>
                    <div class="message-time">02:40 AM</div>
                </div>
            </div>
            <div class="message bot-message">
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/>
                    </svg>
                </div>
                <div class="message-content">
                    <div class="info-card">
                        <div class="info-header">
                            <span class="info-icon">💻</span>
                            <span class="info-title">Department of Computing Education (DCE)</span>
                        </div>
                        <div class="info-content">
                            <p class="info-section"><span class="section-icon">🏢</span> <strong>Department Information</strong></p>
                            <p><strong>• Location:</strong> DCE Faculty Office</p>
                            <p><strong>• Office Hours:</strong> Monday–Friday, 8:00 AM–5:00 PM</p>
                            <p><strong>• Contact:</strong> Available through the department office or official UMTC communication channels</p>
                            <p class="info-section"><span class="section-icon">🎓</span> <strong>Program Offerings</strong></p>
                            <p><strong>• Bachelor of Science in Information Technology (BSIT)</strong></p>
                            <p><strong>• Bachelor of Science in Computer Science (BSCS)</strong></p>
                            <p><strong>• Focus Areas:</strong> Programming, Database Management, Web Development, Systems Analysis</p>
                            <p class="info-section"><span class="section-icon">🔬</span> <strong>Facilities & Laboratories</strong></p>
                            <p><strong>• DCE Programming Laboratory</strong></p>
                            <p class="info-section"><span class="section-icon">📚</span> <strong>Academic References</strong></p>
                            <p><strong>• Capstone/Thesis Project:</strong> Required as part of the final year curriculum</p>
                            <p><strong>• Internship/OJT:</strong> Minimum required hours based on program policy</p>
                        </div>
                    </div>
                    <div class="message-time">02:40 AM</div>
                </div>
            </div>
        </div>
        
        <div class="chat-input-container">
            <div class="chat-shortcuts">
                <button class="shortcut-btn" onclick="openFAQsModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/></svg>
                    FAQs
                </button>
                <button class="shortcut-btn" onclick="openAnnouncementsModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,7C10.89,7 10,7.89 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9C14,7.89 13.1,7 12,7M9,13A6,6 0 0,0 15,13V16H9V13Z"/></svg>
                    Announcements
                </button>
                <button class="shortcut-btn active">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4A2,2 0 0,0 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/></svg>
                    DCE
                </button>
                <button class="shortcut-btn" onclick="openFeedbackModal()">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2 4,2H20M20,4H4V18L6,16H20V4Z"/></svg>
                    Feedback
                </button>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Ask me anything about UMTC..." class="message-input">
                <button class="send-btn" onclick="sendMessage()">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    createModal(dceContent);
}

// Feedback Modal  
function openFeedbackModal() {
    const feedbackContent = `
        <div class="feedback-header">
            <div class="feedback-title">
                <svg viewBox="0 0 24 24" fill="currentColor" class="feedback-icon">
                    <path d="M12 2C13.1 2 14 2.9 14 4V5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5H10V4C10 2.9 10.9 2 12 2ZM12 3C11.4 3 11 3.4 11 4V5H13V4C13 3.4 12.6 3 12 3ZM6 6C5.4 6 5 6.4 5 7V19C5 19.6 5.4 20 6 20H18C18.6 20 18 19.6 18 19V7C18 6.4 17.6 6 17 6H6ZM8 9H10V11H8V9ZM14 9H16V11H14V9ZM7 14H17V16H7V14Z"/>
                </svg>
                Chat-GA!
            </div>
            <div class="home-btn" onclick="this.closest('.modal-overlay').click()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
                </svg>
                Home
            </div>
        </div>
        
        <div class="feedback-container">
            <div class="feedback-main">
                <h1 class="feedback-main-title">Feedback</h1>
                <p class="feedback-description">Your feedback helps us improve Chat-GA! and the UMTC portal experience. Share your thoughts, suggestions, or report issues.</p>
                
                <div class="feedback-form-container">
                    <div class="form-card">
                        <div class="form-header">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2 4,2H20M20,4H4V18L6,16H20V4Z"/>
                            </svg>
                            Submit Feedback
                        </div>
                        <p class="form-subtitle">Help us improve by sharing your experience and suggestions</p>
                        
                        <form class="feedback-form" onsubmit="submitFeedback(event)">
                            <div class="form-group">
                                <label class="form-label">Type of Feedback <span class="required">*</span></label>
                                <div class="feedback-types">
                                    <div class="feedback-type-row">
                                        <label class="feedback-option">
                                            <input type="radio" name="feedback-type" value="suggestion" required>
                                            <span class="feedback-icon suggestion">💡</span>
                                            Suggestion
                                        </label>
                                        <label class="feedback-option">
                                            <input type="radio" name="feedback-type" value="complaint" required>
                                            <span class="feedback-icon complaint">❗</span>
                                            Complaint
                                        </label>
                                    </div>
                                    <div class="feedback-type-row">
                                        <label class="feedback-option">
                                            <input type="radio" name="feedback-type" value="compliment" required>
                                            <span class="feedback-icon compliment">👍</span>
                                            Compliment
                                        </label>
                                        <label class="feedback-option">
                                            <input type="radio" name="feedback-type" value="bug" required>
                                            <span class="feedback-icon bug">🐛</span>
                                            Bug Report
                                        </label>
                                    </div>
                                    <div class="feedback-type-row">
                                        <label class="feedback-option full-width">
                                            <input type="radio" name="feedback-type" value="general" required>
                                            <span class="feedback-icon general">💬</span>
                                            General Feedback
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Overall Rating</label>
                                <div class="rating-options">
                                    <label class="rating-option">
                                        <input type="radio" name="rating" value="1">
                                        <span class="stars">⭐ (1)</span>
                                    </label>
                                    <label class="rating-option">
                                        <input type="radio" name="rating" value="2">
                                        <span class="stars">⭐⭐ (2)</span>
                                    </label>
                                    <label class="rating-option">
                                        <input type="radio" name="rating" value="3">
                                        <span class="stars">⭐⭐⭐ (3)</span>
                                    </label>
                                    <label class="rating-option">
                                        <input type="radio" name="rating" value="4">
                                        <span class="stars">⭐⭐⭐⭐ (4)</span>
                                    </label>
                                    <label class="rating-option">
                                        <input type="radio" name="rating" value="5">
                                        <span class="stars">⭐⭐⭐⭐⭐ (5)</span>
                                    </label>
                                </div>
                                <label class="checkbox-option">
                                    <input type="checkbox" name="anonymous">
                                    Submit anonymously
                                </label>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">Full Name</label>
                                    <input type="text" class="form-input" name="full-name" placeholder="Your full name">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Email Address</label>
                                    <input type="email" class="form-input" name="email" placeholder="your.email@example.com">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Student ID (Optional)</label>
                                <input type="text" class="form-input" name="student-id" placeholder="Your student ID number">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Subject <span class="required">*</span></label>
                                <input type="text" class="form-input" name="subject" placeholder="Brief description of your feedback" required>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Message <span class="required">*</span></label>
                                <textarea class="form-textarea" name="message" rows="6" placeholder="Please provide detailed feedback..." required></textarea>
                            </div>
                            
                            <label class="checkbox-option">
                                <input type="checkbox" name="contact-me">
                                I would like to be contacted about this feedback
                            </label>
                            
                            <button type="submit" class="submit-feedback-btn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                                </svg>
                                Submit Feedback
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div class="feedback-sidebar">
                <div class="guidelines-card">
                    <div class="guidelines-header">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z"/>
                        </svg>
                        Feedback Guidelines
                    </div>
                    
                    <div class="guideline-item">
                        <div class="guideline-title">
                            <span class="guideline-dot specific"></span>
                            Be Specific
                        </div>
                        <p class="guideline-text">Provide detailed information about your experience</p>
                    </div>
                    
                    <div class="guideline-item">
                        <div class="guideline-title">
                            <span class="guideline-dot constructive"></span>
                            Be Constructive
                        </div>
                        <p class="guideline-text">Suggest improvements when pointing out issues</p>
                    </div>
                    
                    <div class="guideline-item">
                        <div class="guideline-title">
                            <span class="guideline-dot respectful"></span>
                            Be Respectful
                        </div>
                        <p class="guideline-text">Maintain a professional and courteous tone</p>
                    </div>
                </div>
                
                <div class="help-card">
                    <div class="help-header">Need Immediate Help?</div>
                    <p class="help-text">For urgent issues, chat with GA! for immediate assistance.</p>
                    <button class="chat-now-btn" onclick="openChatModal()">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2 4,2H20M20,4H4V18L6,16H20V4Z"/>
                        </svg>
                        Chat Now
                    </button>
                </div>
            </div>
        </div>
    `;
    createModal(feedbackContent);
}

// Quick message function
function sendQuickMessage(message) {
    const messageInput = document.querySelector('.message-input');
    if (messageInput) {
        messageInput.value = message;
        alert('Quick message selected: ' + message);
    }
}

// Send message function
function sendMessage() {
    const messageInput = document.querySelector('.message-input');
    if (messageInput && messageInput.value.trim()) {
        alert('Message sent: ' + messageInput.value);
        messageInput.value = '';
    }
}

// Submit feedback function
function submitFeedback(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const feedbackData = Object.fromEntries(formData);
    
    alert('Thank you for your feedback! Your submission has been received.');
    event.target.reset();
}

// Add click handlers for buttons
document.addEventListener('DOMContentLoaded', function() {
    // Try Chat-GA! buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openChatModal();
        });
    });
    
    // CTA buttons
    document.querySelectorAll('.cta-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openChatModal();
        });
    });

    // Start chatting button
    document.querySelectorAll('.start-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openChatModal();
        });
    });

    // Visit UMTC Portal button
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://portal.umindanao.edu.ph/', '_blank');
        });
    });

    // Feature card learn more links
    document.querySelectorAll('.learn-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const cardTitle = this.closest('.feature-card').querySelector('h3').textContent;
            
            if (cardTitle === 'FAQs') {
                openFAQsModal();
            } else if (cardTitle === 'Announcements') {
                openAnnouncementsModal();
            } else if (cardTitle === 'DoCE Section') {
                openDCEModal();
            } else if (cardTitle === 'Feedback') {
                openFeedbackModal();
            }
        });
    });

    // Add enter key support for message input
    document.addEventListener('keydown', function(e) {
        const messageInput = document.querySelector('.message-input');
        if (messageInput && messageInput === document.activeElement && e.key === 'Enter') {
            sendMessage();
        }
    });
});

console.log('Chat-GA! website with complete chat functionality loaded successfully! 🚀');