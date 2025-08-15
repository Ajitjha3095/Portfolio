// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const isDark = document.body.classList.contains('dark');
    if (window.scrollY > 100) {
        navbar.style.background = isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Theme system removed (single theme)

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-content, .skills-grid, .projects-grid, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact form handling
// Contact form handling - REPLACE ALL EXISTING FORM CODE WITH THIS
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    emailjs.sendForm('service_0yptghl', 'template_hfzclbh', this)
      .then(function() {
        showNotification('Message sent successfully!', 'success');
        this.reset();
      }.bind(this), function(error) {
        showNotification('Failed to send message: ' + error.text, 'error');
        console.error('EmailJS Error:', error);
      })
      .finally(function() {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
  });
}
// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize the typing animation for multiple roles
const typingAnimationElement = document.getElementById('typing-animation');

// Create an array of typing text
const typingTexts = [
    'Data Research Analyst  ',
    'Operations Research Analyst  ',
    'Financial Research Analyst  ',
    'Market Research Analyst  ',
    'Data visualization  ',
];

// Create a function to display the typing animation for a given text
function playTypingAnimation(text) {
    // Loop through each character and add it to the element
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            typingAnimationElement.textContent += text[i];
        }, i * 200); // Increase the delay to slow down the typing animation
    }

    // Once the animation is complete, reset the text and start over
    setTimeout(() => {
        typingAnimationElement.textContent = '';
        playTypingAnimation(typingTexts[(typingTexts.indexOf(text) + 1) % typingTexts.length]);
    }, text.length * 200 + 2000); // Add 2 seconds pause before next animation
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
    
    // Start the typing animation loop for roles
    if (typingAnimationElement) {
        setTimeout(() => {
            playTypingAnimation(typingTexts[0]);
        }, 2000); // Start after hero title animation
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  if (window.innerWidth <= 768) {
    hero.style.transform = 'auto';
    return;
  }

  const scrolled = window.pageYOffset;
  hero.style.transform = `translateY(${scrolled * -0.5}px)`;
});
// Skill bars animation
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Trigger skill animation when skills section is visible
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillsObserver.observe(skillsSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Preloader
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <p>Loading...</p>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // Remove preloader after page loads
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    .skill-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
// Dark / Light Theme Toggle with Animation
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Create transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'theme-transition-overlay';
    document.body.appendChild(transitionOverlay);

    // Load stored theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        // Animate overlay
        transitionOverlay.classList.add('active');

        setTimeout(() => {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');

            // Change icon
            themeToggle.innerHTML = isDark
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';

            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            // Remove overlay animation
            setTimeout(() => {
                transitionOverlay.classList.remove('active');
            }, 500);

        }, 200);
    });
});
// Dark mode toggle
(() => {
  const storageKey = 'theme';
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const icon = btn.querySelector('i');
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const saved = localStorage.getItem(storageKey);
  const initial = saved ? saved : (mq.matches ? 'dark' : 'light');
  let explicit = !!saved;

  function apply(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

    if (icon) {
      icon.classList.add('fa-solid');
      icon.classList.toggle('fa-moon', !isDark);
      icon.classList.toggle('fa-sun', isDark);
    }

    btn.setAttribute('aria-pressed', String(isDark));
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = isDark ? 'Light mode' : 'Dark mode';
  }

  apply(initial);

  btn.addEventListener('click', () => {
    const next = document.body.classList.contains('dark') ? 'light' : 'dark';
    explicit = true;
    localStorage.setItem(storageKey, next);
    apply(next);
  });

  const onMedia = e => { if (!explicit) apply(e.matches ? 'dark' : 'light'); };
  if (mq.addEventListener) mq.addEventListener('change', onMedia);
  else if (mq.addListener) mq.addListener(onMedia); // older Safari
})
document.head.appendChild(activeStyle); 