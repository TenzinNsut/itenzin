/**
 * This file contains all interactive functionality including:
 * - Navigation and mobile responsiveness
 * - Carousel for projects section
 * - Background animation effects
 * - Form validation
 */

// ======================================================
// 1. GLOBAL VARIABLES AND SELECTORS
// ======================================================

// Navigation elements
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('nav-links')[0];
const balls = document.getElementsByClassName('object');
const intro_name = document.getElementsByClassName('name')[0];
const sections = document.getElementsByClassName('collapse');

// Carousel state
let currentSlideIndex = 0;

// Background animation variables
const hero = document.querySelector('.section-one');
const contianer = document.querySelector('.contianer');
const title = document.querySelector('.name');
const img2 = document.querySelector('.object-2');
const img3 = document.querySelector('.object-3');
const img4 = document.querySelector('.object-4');
const img5 = document.querySelector('.object-5');

// Mouse tracking for animations
let lastMouseX = 0;
let lastMouseY = 0;
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;
let mouseTimer;

// ======================================================
// 2. NAVIGATION FUNCTIONALITY
// ======================================================

/**
 * Toggle mobile navigation menu and related animations
 */
toggleButton.addEventListener('click', () => {
    // Toggle navigation visibility
    navbarLinks.classList.toggle('active');
    intro_name.classList.toggle('active');
    
    // Toggle visibility of background elements
    for (let i = 0; i < balls.length; i++) {
        balls[i].classList.toggle('active');
    }

    // Toggle other collapsible sections
    for (let i = 0; i < sections.length; i++) { 
        sections[i].classList.toggle('active');
    }
});

// ======================================================
// 3. CAROUSEL FUNCTIONALITY
// ======================================================

/**
 * Updates the carousel position based on the current slide index
 */
function updateCarouselPosition() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  
  if (!track || !slides.length) return;
  
  // Transform the track to show the current slide
  track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

/**
 * Navigate to the previous slide
 */
function prevSlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (!slides.length) return;
  
  // Decrement index and handle wrap-around
  currentSlideIndex--;
  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  
  updateCarouselPosition();
  console.log('Previous slide selected. Current slide:', currentSlideIndex + 1);
}

/**
 * Navigate to the next slide
 */
function nextSlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (!slides.length) return;
  
  // Increment index and handle wrap-around
  currentSlideIndex++;
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }
  
  updateCarouselPosition();
  console.log('Next slide selected. Current slide:', currentSlideIndex + 1);
}

/**
 * Initialize carousel when page loads
 */
window.onload = function() {
  console.log('Window loaded, initializing carousel');
  
  // Set initial carousel position
  updateCarouselPosition();
  
  // Set up button click handlers
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (prevBtn) {
    prevBtn.onclick = prevSlide;
  }
  
  if (nextBtn) {
    nextBtn.onclick = nextSlide;
  }
};

// ======================================================
// 4. BACKGROUND ANIMATIONS
// ======================================================

/**
 * Select elements for parallax/animation effects
 */
const ellipseElements = document.querySelectorAll(".object");

/**
 * Initialize random movement properties for background elements
 */
const randomMovements = Array.from(ellipseElements).map(() => ({
    xSpeed: (Math.random() - 0.5) * 0.8,  // Random horizontal speed
    ySpeed: (Math.random() - 0.5) * 0.8,  // Random vertical speed
    xPos: 0,  // Current x position
    yPos: 0   // Current y position
}));

/**
 * Track current visible section for targeted animations
 */
let scrollContainer = document.querySelector('.scroll-container');
let currentSection = 'home';

// Update current section on scroll
scrollContainer.addEventListener('scroll', () => {
    const sections = ['home', 'projects', 'about', 'contact'];
    
    // Determine which section is currently in view
    for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            // If section is mostly visible in the viewport
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                currentSection = sectionId;
                break;
            }
        }
    }
});

/**
 * Track mouse movement for animations
 */
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    
    // Reset mouse movement timer
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
        isMouseMoving = false;
    }, 100); // Consider mouse stopped after 100ms of inactivity
});

/**
 * Main animation loop for background ellipses
 */
function animateEllipses() {
    ellipseElements.forEach((element, index) => {
        // Skip if element is a button or button container
        if (element.classList.contains('btn') || 
            element.classList.contains('projects-btn') || 
            element.classList.contains('about-btn')) {
            return;
        }
        
        const movement = randomMovements[index];
        const moveValue = parseFloat(element.getAttribute("data-value")) / 100;
        
        // Determine if this ellipse should be animated based on its section
        const parentSection = element.closest('section');
        const isInCurrentSection = parentSection && parentSection.id === currentSection;
        
        // Animate elements in the visible section or background ellipses
        const shouldAnimate = !parentSection || isInCurrentSection || element.classList.contains('section-bg-ellipse');
        
        if (shouldAnimate) {
            if (isMouseMoving) {
                // Follow cursor when mouse is moving
                const x = (mouseX * moveValue);
                const y = (mouseY * moveValue);
                
                // Smooth transition to mouse position
                movement.xPos += (x - movement.xPos) * 0.1;
                movement.yPos += (y - movement.yPos) * 0.1;
            } else {
                // Random slow movement when mouse is not moving
                movement.xPos += movement.xSpeed;
                movement.yPos += movement.ySpeed;
                
                // Change direction occasionally
                if (Math.random() < 0.005) {
                    movement.xSpeed = (Math.random() - 0.5) * 0.8;
                    movement.ySpeed = (Math.random() - 0.5) * 0.8;
                }
            }
            
            // Apply the transformation
            element.style.transform = `translateX(${movement.xPos}px) translateY(${movement.yPos}px)`;
        }
    });
    
    // Continue the animation loop
    requestAnimationFrame(animateEllipses);
}

// Start the background animation
animateEllipses();

// ======================================================
// 5. CURSOR EFFECTS
// ======================================================

/**
 * Custom cursor movement
 */
let mouseCursor = document.querySelector('.cursor');

window.addEventListener('mousemove', cursor);

function cursor(e) { 
    if (mouseCursor) {
        mouseCursor.style.top = e.pageY + 'px';
        mouseCursor.style.left = e.pageX + 'px';
    }
}

// ======================================================
// 6. HERO SECTION ANIMATIONS
// ======================================================

/**
 * Handle parallax effects for hero section
 */
if (hero && contianer) {
  // Calculate parallax effect based on mouse position
  contianer.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    // Apply transformations only to background elements, not text
    if (img2) img2.style.transform = `translateX(${xAxis}px) translateY(${yAxis}px)`;
    if (img3) img3.style.transform = `translateX(${-xAxis}px) translateY(${-yAxis}px)`;
    if (img4) img4.style.transform = `translateX(${xAxis}px) translateY(${yAxis}px)`;
    if (img5) img5.style.transform = `translateX(${-xAxis}px) translateY(${-yAxis}px)`;
  });

  // Handle entrance animations
  contianer.addEventListener('mouseenter', (e) => {
    if (title) title.style.transition = "none";
  });

  // Handle exit animations - reset positions
  contianer.addEventListener('mouseleave', (e) => {
    if (title) {
      title.style.transition = "all 0.5s ease";
      title.style.transform = "none";
    }
    
    // Reset all elements to original positions
    if (img2) img2.style.transform = "translateX(0px) translateY(0px)";
    if (img3) img3.style.transform = "translateX(0px) translateY(0px)";
    if (img4) img4.style.transform = "translateX(0px) translateY(0px)";
    if (img5) img5.style.transform = "translateX(0px) translateY(0px)";
  });
}

// ======================================================
// 7. FORM VALIDATION
// ======================================================

/**
 * Email validation for contact form
 */
document.addEventListener('DOMContentLoaded', function() {
  const emailInput = document.getElementById('email');
  const validationMessage = document.querySelector('.email-validation-message');
  
  if (emailInput && validationMessage) {
    // Add event listeners for real-time validation
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
    
    /**
     * Validate email format and provide feedback
     */
    function validateEmail() {
      const email = emailInput.value.trim();
      
      // Skip validation if field is empty
      if (email === '') {
        validationMessage.textContent = '';
        return;
      }
      
      // Standard email validation pattern
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!emailPattern.test(email)) {
        // Show error message for invalid email
        validationMessage.textContent = 'Please enter a valid email address';
        validationMessage.style.color = 'var(--red)';
      } else {
        // Show success message for valid email
        validationMessage.textContent = 'Valid email address!';
        validationMessage.style.color = '#4CAF50';
        
        // Clear the success message after a short delay
        setTimeout(() => {
          validationMessage.textContent = '';
        }, 2000);
      }
    }
  }
});