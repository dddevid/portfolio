document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.querySelector('body');
    const langButtons = document.querySelectorAll('.lang-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const flutterIcon = document.getElementById('flutter-icon');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    // Function to update Flutter icon based on theme
    function updateFlutterIcon() {
        if (body.classList.contains('dark-theme')) {
            flutterIcon.src = 'img/assets/svg/flutterdark.svg';
        } else {
            flutterIcon.src = 'img/assets/svg/flutterwhite.svg';
        }
    }
    
    // Theme Toggle
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        // Update Flutter icon
        updateFlutterIcon();
        
        // Save theme preference to localStorage
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
    
    // Initialize Flutter icon based on current theme
    updateFlutterIcon();
    
    // Prevent Flutter icon from being copied or dragged
    if (flutterIcon) {
        flutterIcon.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        flutterIcon.addEventListener('copy', function(e) {
            e.preventDefault();
            return false;
        });
        
        flutterIcon.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        });
    }
    
    // Language Switcher
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Remove active class from all buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Save language preference to localStorage
            localStorage.setItem('language', lang);
            
            // Update all translatable elements
            updateLanguage(lang);
        });
    });
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    const langBtn = document.querySelector(`.lang-btn[data-lang="${savedLanguage}"]`);
    if (langBtn) {
        langBtn.click();
    }
    
    // Function to update language
    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-' + lang + ']');
        
        elements.forEach(element => {
            const translation = element.getAttribute('data-' + lang);
            if (translation) {
                element.textContent = translation;
            }
        });
    }
    
    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Scroll to the target section
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
        
        // Show/hide scroll to top button
        if (scrollPosition > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Email Template Functionality
    const contactForm = document.getElementById('contact-form');
    const sendEmailBtn = document.getElementById('send-email-btn');
    
    if (contactForm && sendEmailBtn) {
        // Prevent default form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
        });
        
        // Handle email sending via mailto
        sendEmailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const nameInput = document.getElementById('name-input');
            const subjectInput = document.getElementById('subject-input');
            const messageInput = document.getElementById('message-input');
            
            const name = nameInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();
            
            // Validate form
            if (!name || !subject || !message) {
                // Show error message if fields are empty
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-error';
                errorMessage.textContent = 'Please fill in all fields';
                contactForm.appendChild(errorMessage);
                
                // Remove error message after 3 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
                
                return;
            }
            
            // Create email template
            const emailBody = `Subject: ${subject}

Dear Devid,

My name is ${name}, and I hope you're doing well.

I wanted to reach out regarding ${subject}.

${message}

Looking forward to your response.

Best regards,
${name}`;
            
            // Create mailto link with encoded email body
            const mailtoLink = `mailto:devid.rrucaj@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            contactForm.reset();
        });
    }
});
