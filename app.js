// Portfolio Website JavaScript

// Project data
const projectData = {
  1: {
    title: "Cybersecurity Risk Assessment Dashboard",
    image: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/c0284523-af83-4183-88b4-59bc5b5ea34b.png",
    description: "Comprehensive security monitoring and risk assessment tool designed to identify vulnerabilities and provide real-time threat analysis.",
    technologies: ["Python", "JavaScript", "Security APIs", "Dashboard Design"],
    features: ["Real-time threat detection", "Vulnerability scanning", "Automated reporting", "Risk scoring system"],
    details: "This project demonstrates my understanding of cybersecurity principles and my ability to create practical security solutions. The dashboard provides organizations with clear visibility into their security posture and helps identify potential threats before they become critical issues."
  },
  2: {
    title: "IT Systems Monitoring Platform",
    image: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/ad17a69b-0aff-4b91-ae7e-0800377607c6.png",
    description: "Enterprise-level system health monitoring solution that tracks server performance, uptime, and system resource utilization.",
    technologies: ["JavaScript", "Node.js", "Database Integration", "API Development"],
    features: ["Server monitoring", "Performance analytics", "Alert systems", "Historical data tracking"],
    details: "Built to address real-world IT infrastructure monitoring needs, this platform helps organizations maintain optimal system performance and prevent downtime through proactive monitoring and intelligent alerting systems."
  },
  3: {
    title: "McDonald's Crew Management System",
    image: null,
    description: "Internal scheduling and task management solution designed to optimize crew scheduling and improve workflow efficiency.",
    technologies: ["Excel", "Power BI", "Process Automation", "Data Analysis"],
    features: ["Schedule optimization", "Performance tracking", "Workflow management", "Reporting dashboard"],
    details: "Developed during my tenure at McDonald's to address real operational challenges. This system improved scheduling efficiency by 30% and provided better visibility into crew performance metrics, helping managers make data-driven decisions."
  }
};

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const projectModal = document.getElementById('project-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');
const contactForm = document.getElementById('contact-form');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeNavigation();
  initializeScrollAnimations();
  initializeSkillBars();
  initializeProjectModals();
  initializeContactForm();
  initializeScrollEffects();
});

// Theme Toggle Functionality
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-color-scheme', 'dark');
    updateThemeIcon('dark');
  }

  themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-color-scheme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-color-scheme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Navigation Functionality
function initializeNavigation() {
  // Mobile menu toggle
  hamburger.addEventListener('click', toggleMobileMenu);
  
  // Close mobile menu when clicking on nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      // Close mobile menu
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
}

function toggleMobileMenu() {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

// Scroll Effects
function initializeScrollEffects() {
  window.addEventListener('scroll', () => {
    // Navbar background on scroll
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(var(--color-bg-1), 0.98)';
    } else {
      navbar.style.background = 'rgba(var(--color-bg-1), 0.95)';
    }
    
    // Update active nav link
    updateActiveNavLink();
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Trigger skill bar animations
        if (entry.target.classList.contains('skills')) {
          animateSkillBars();
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections and cards
  document.querySelectorAll('section, .project-card, .timeline-item, .cert-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

// Skill Bar Animations
function initializeSkillBars() {
  // Skill bars will be animated when the skills section comes into view
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width;
    }, index * 100);
  });
}

// Project Modal Functionality
function initializeProjectModals() {
  // Add event listeners to all view project buttons
  document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('click', (e) => {
      const projectId = e.target.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });
  
  // Close modal events
  modalClose.addEventListener('click', closeProjectModal);
  modalOverlay.addEventListener('click', closeProjectModal);
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
      closeProjectModal();
    }
  });
}

function openProjectModal(projectId) {
  const project = projectData[projectId];
  if (!project) return;
  
  const modalContent = `
    <h3>${project.title}</h3>
    ${project.image ? `<img src="${project.image}" alt="${project.title}">` : '<div class="project-placeholder"><i class="fas fa-users"></i></div>'}
    <p>${project.description}</p>
    
    <div class="project-technologies">
      ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
    </div>
    
    <h4>Key Features</h4>
    <ul>
      ${project.features.map(feature => `<li>${feature}</li>`).join('')}
    </ul>
    
    <h4>Project Details</h4>
    <p>${project.details}</p>
  `;
  
  modalBody.innerHTML = modalContent;
  projectModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Contact Form Functionality
function initializeContactForm() {
  contactForm.addEventListener('submit', handleContactFormSubmit);
  
  // Add real-time validation
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
  });
}

function handleContactFormSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };
  
  // Validate form
  if (!validateForm(data)) {
    return;
  }
  
  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    submitButton.textContent = 'Message Sent!';
    submitButton.style.background = 'var(--color-success)';
    
    // Reset form after 2 seconds
    setTimeout(() => {
      contactForm.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      submitButton.style.background = '';
    }, 2000);
  }, 1000);
}

function validateForm(data) {
  let isValid = true;
  
  // Clear previous errors
  clearFormErrors();
  
  // Validate name
  if (!data.name || data.name.trim().length < 2) {
    showFieldError('name', 'Name must be at least 2 characters long');
    isValid = false;
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    showFieldError('email', 'Please enter a valid email address');
    isValid = false;
  }
  
  // Validate subject
  if (!data.subject || data.subject.trim().length < 3) {
    showFieldError('subject', 'Subject must be at least 3 characters long');
    isValid = false;
  }
  
  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    showFieldError('message', 'Message must be at least 10 characters long');
    isValid = false;
  }
  
  return isValid;
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  clearFieldError(e);
  
  switch (field.name) {
    case 'name':
      if (value.length > 0 && value.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
      }
      break;
    case 'email':
      if (value.length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          showFieldError('email', 'Please enter a valid email address');
        }
      }
      break;
    case 'subject':
      if (value.length > 0 && value.length < 3) {
        showFieldError('subject', 'Subject must be at least 3 characters long');
      }
      break;
    case 'message':
      if (value.length > 0 && value.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
      }
      break;
  }
}

function showFieldError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const formGroup = field.closest('.form-group');
  
  // Remove existing error
  const existingError = formGroup.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error styling
  field.style.borderColor = 'var(--color-error)';
  
  // Add error message
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.style.color = 'var(--color-error)';
  errorElement.style.fontSize = 'var(--font-size-sm)';
  errorElement.style.marginTop = 'var(--space-4)';
  errorElement.textContent = message;
  
  formGroup.appendChild(errorElement);
}

function clearFieldError(e) {
  const field = e.target;
  const formGroup = field.closest('.form-group');
  const errorElement = formGroup.querySelector('.field-error');
  
  if (errorElement) {
    errorElement.remove();
  }
  
  field.style.borderColor = '';
}

function clearFormErrors() {
  const errorElements = contactForm.querySelectorAll('.field-error');
  errorElements.forEach(error => error.remove());
  
  const formControls = contactForm.querySelectorAll('.form-control');
  formControls.forEach(control => {
    control.style.borderColor = '';
  });
}

// Smooth scroll for all anchor links
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

// Loading animation (fade in elements on page load)
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Add fade-in animation to hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.classList.add('fade-in-up');
  }
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const rate = scrolled * -0.5;
  
  if (hero && scrolled < hero.offsetHeight) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Intersection Observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe elements for fade-in animation
document.querySelectorAll('.project-card, .timeline-item, .cert-card, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  fadeInObserver.observe(el);
});

// Add hover effects to social links
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.1)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add typing effect to hero title (optional enhancement)
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

// Smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll('section').forEach(section => {
  section.classList.add('reveal');
  revealObserver.observe(section);
});

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  
  .nav-link.active {
    color: var(--color-primary);
  }
  
  .nav-link.active::after {
    width: 100%;
  }
  
  .loaded .hero-content {
    animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;
document.head.appendChild(style);