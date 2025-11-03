// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            // Reset icon
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.testimonial-control.prev');
    const nextButton = document.querySelector('.testimonial-control.next');
    
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Deactivate all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate its dot
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Event listeners for dot indicators
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Event listeners for prev/next buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            // Go to the previous slide, or wrap to the last slide
            let prevSlide = currentSlide - 1;
            if (prevSlide < 0) {
                prevSlide = testimonialCards.length - 1;
            }
            showSlide(prevSlide);
        });
        
        nextButton.addEventListener('click', () => {
            // Go to the next slide, or wrap to the first slide
            let nextSlide = currentSlide + 1;
            if (nextSlide >= testimonialCards.length) {
                nextSlide = 0;
            }
            showSlide(nextSlide);
        });
    }
    
    // Smooth scrolling for anchor links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Scroll to the target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky Header effect
    const header = document.querySelector('header');
    let scrollPosition = window.scrollY;
    
    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.style.backgroundColor = '#ffffff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.destination-card, .about-content, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Add fade-in class for CSS animation
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            animation: fadeIn 1s ease forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .destination-card, .about-content, .section-title {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // contact script
        // FAQ Toggle Functionality
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const icon = question.querySelector('i');
                
                // Initially hide all answers
                answer.style.display = 'none';
                
                question.addEventListener('click', () => {
                    // Toggle the answer visibility
                    if (answer.style.display === 'none') {
                        answer.style.display = 'block';
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    } else {
                        answer.style.display = 'none';
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                });
            });

    // travel now Script
        // Form Components
        const bookingForm = document.getElementById('bookingForm');
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const participants = document.getElementById('participants');
        const destination = document.getElementById('destination');
        const otherDestination = document.getElementById('otherDestination');
        const otherDestinationGroup = document.getElementById('otherDestinationGroup');
        const departureDate = document.getElementById('departureDate');
        const returnDate = document.getElementById('returnDate');
        const termsAgreed = document.getElementById('termsAgreed');
        const formMessage = document.getElementById('formMessage');
        
        // Show/hide "Other Destination" field based on selection
        destination.addEventListener('change', function() {
            if (this.value === 'Other') {
                otherDestinationGroup.style.display = 'block';
            } else {
                otherDestinationGroup.style.display = 'none';
            }
        });
        
        // Form validation
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous error messages
            resetErrors();
            
            // Initialize validation status
            let isValid = true;
            
            // Validation 1: Full Name (not empty and contains only letters and spaces)
            if (fullName.value.trim() === '') {
                displayError('fullNameError', 'Please enter your full name');
                isValid = false;
            } else if (!isValidName(fullName.value)) {
                displayError('fullNameError', 'Name should contain only letters and spaces');
                isValid = false;
            }
            
            // Validation 2: Email (not empty and valid format)
            if (email.value.trim() === '') {
                displayError('emailError', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                displayError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validation 3: Phone Number (not empty and valid format)
            if (phone.value.trim() === '') {
                displayError('phoneError', 'Please enter your phone number');
                isValid = false;
            } else if (!isValidPhone(phone.value)) {
                displayError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validation 4: Number of Participants (must be a number greater than 0)
            if (participants.value.trim() === '') {
                displayError('participantsError', 'Please enter number of participants');
                isValid = false;
            } else if (parseInt(participants.value) <= 0) {
                displayError('participantsError', 'Number of participants must be at least 1');
                isValid = false;
            }
            
            // Validation 5: Destination (not empty and "Other" is selected)
            if (destination.value.trim() === '') {
                displayError('destinationError', 'Please select a preferred destination');
                isValid = false;
            } else if (destination.value === 'Other' && otherDestination.value.trim() === '') {
                displayError('otherDestinationError', 'Please specify your preferred destination');
                isValid = false;
            }
            
            // Validation 6: Departure Date (not empty and not in the past)
            if (departureDate.value === '') {
                displayError('departureDateError', 'Please select a departure date');
                isValid = false;
            } else if (new Date(departureDate.value) < new Date().setHours(0, 0, 0, 0)) {
                displayError('departureDateError', 'Departure date cannot be in the past');
                isValid = false;
            }
            
            // Validation 7: Return Date (not empty and not before departure date)
            if (returnDate.value === '') {
                displayError('returnDateError', 'Please select a return date');
                isValid = false;
            } else if (new Date(returnDate.value) < new Date(departureDate.value)) {
                displayError('returnDateError', 'Return date cannot be before departure date');
                isValid = false;
            }
            
            // Validation 8: Travel Type (at least one checkbox must be selected)
            const selectedTravelTypes = document.querySelectorAll('input[name="travelType"]:checked');
            if (selectedTravelTypes.length === 0) {
                displayError('travelTypeError', 'Please select at least one travel type');
                isValid = false;
            }

            // Validation 9: Terms and Conditions Agreement
            if (!termsAgreed.checked) {
                displayError('termsAgreedError', 'Please agree to our terms and conditions');
                isValid = false;
            }
            
            // If form is valid, display success message and reset form
            if (isValid) {
                bookingForm.reset();

                // Show popup
                const popup = document.getElementById('successPopup');
                popup.style.display = 'block';

                // Close popup on click
                document.getElementById('closePopup').addEventListener('click', function () {
                    popup.style.display = 'none';
                });

                // Also close popup if user clicks outside the popup
                window.addEventListener('click', function (e) {
                    if (e.target === popup) {
                        popup.style.display = 'none';
                    }
                });
            } else {
                formMessage.innerHTML = 'Please correct the errors in the form.';
                formMessage.className = 'form-message error-message';
                formMessage.style.display = 'block';
            }
        });
        
        // Helper function: Display error message
        function displayError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            // Add error class to the related input
            const inputId = elementId.replace('Error', '');
            document.getElementById(inputId).classList.add('error-input');
        }
        
        // Helper function: Reset all error messages
        function resetErrors() {
            // Hide form message
            formMessage.style.display = 'none';
            
            // Reset all error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(function(errorMessage) {
                errorMessage.textContent = '';
                errorMessage.style.display = 'none';
            });
            
            // Remove error class from all inputs
            const formInputs = document.querySelectorAll('input, select, textarea');
            formInputs.forEach(function(input) {
                input.classList.remove('error-input');
            });
        }
        
        // Helper function: Validate name (letters and spaces only)
        function isValidName(name) {
            // Check if name contains only letters and spaces
            const namePattern = /^[A-Za-z\s]+$/;
            return namePattern.test(name);
        }
        
        // Helper function: Validate email
        function isValidEmail(email) {
            // Simple email validation (contains @ and .)
            const atPosition = email.indexOf('@');
            const dotPosition = email.lastIndexOf('.');
            
            return atPosition > 0 && dotPosition > atPosition + 1 && dotPosition < email.length - 1;
        }
        
        // Helper function: Validate phone number
        function isValidPhone(phone) {
            // Allow digits, plus sign, parentheses, spaces, and dashes
            // Must be at least 10 digits
            let digitCount = 0;
            for (let i = 0; i < phone.length; i++) {
                if (!isNaN(parseInt(phone[i]))) {
                    digitCount++;
                }
            }
            
            // Check if it contains at least 10 digits and only valid characters
            const validChars = /^[0-9+\-\s()]+$/;
            return digitCount >= 10 && validChars.test(phone);
        }
        
        // Add listeners for real-time validation
        fullName.addEventListener('blur', function() {
            if (this.value.trim() !== '' && !isValidName(this.value)) {
                displayError('fullNameError', 'Name should contain only letters and spaces');
            }
        });
        
        email.addEventListener('blur', function() {
            if (this.value.trim() !== '' && !isValidEmail(this.value)) {
                displayError('emailError', 'Please enter a valid email address');
            }
        });
        
        phone.addEventListener('blur', function() {
            if (this.value.trim() !== '' && !isValidPhone(this.value)) {
                displayError('phoneError', 'Please enter a valid phone number');
            }
        });
        
        // Set minimum dates for date pickers
        const today = new Date().toISOString().split('T')[0];
        departureDate.setAttribute('min', today);
        returnDate.setAttribute('min', today);
        
        // Update return date min value when departure date changes
        departureDate.addEventListener('change', function() {
            returnDate.setAttribute('min', this.value);
        });
});