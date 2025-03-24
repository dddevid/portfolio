document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.querySelector('body');
    const langButtons = document.querySelectorAll('.lang-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const flutterIcon = document.getElementById('flutter-icon');
    
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
            
            // Reset form after sending
            contactForm.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Email client opened with your message!';
            contactForm.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in view
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('animated');
            }
        });
    }
    
    // Check elements on load
    checkIfInView();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkIfInView);
});