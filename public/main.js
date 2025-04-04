// Navigation Bar
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('nav-links')[0];
const balls = document.getElementsByClassName('object');
const intro_name = document.getElementsByClassName('name')[0];
const sections = document.getElementsByClassName('collapse');

// Toggle button functionality
toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    intro_name.classList.toggle('active');
    for (let i = 0; i < balls.length; i++) {
        balls[i].classList.toggle('active');
    }

    for (let i = 0; i < sections.length; i++) { 
        sections[i].classList.toggle('active');
    }
});

// CAROUSEL FUNCTIONALITY
// Simple global variables
let currentSlideIndex = 0;

// Functions to control carousel
function updateCarouselPosition() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  
  if (!track || !slides.length) return;
  track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

function prevSlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (!slides.length) return;
  
  currentSlideIndex--;
  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  updateCarouselPosition();
  console.log('Prev slide clicked. Current slide:', currentSlideIndex + 1);
}

function nextSlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (!slides.length) return;
  
  currentSlideIndex++;
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }
  updateCarouselPosition();
  console.log('Next slide clicked. Current slide:', currentSlideIndex + 1);
}

// Set up the carousel when the page loads
window.onload = function() {
  console.log('Window loaded, setting up carousel');
  
  // Initialize carousel position
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

// Background ellipses animation
let lastMouseX = 0;
let lastMouseY = 0;
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;
let mouseTimer;

// Select only ellipse elements, excluding button containers
const ellipseElements = document.querySelectorAll(".object");

// Initialize random movements for ellipses
const randomMovements = Array.from(ellipseElements).map(() => ({
    xSpeed: (Math.random() - 0.5) * 0.8,
    ySpeed: (Math.random() - 0.5) * 0.8,
    xPos: 0,
    yPos: 0
}));

// Track scroll position to ensure ellipses in current section are animated
let scrollContainer = document.querySelector('.scroll-container');
let currentSection = 'home';

// Update current section on scroll
scrollContainer.addEventListener('scroll', () => {
    const sections = ['home', 'projects', 'about', 'contact'];
    
    for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            // If section is mostly visible
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                currentSection = sectionId;
                break;
            }
        }
    }
});

// Track mouse movement
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    
    // Clear previous timer and set a new one
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
        isMouseMoving = false;
    }, 100); // Consider mouse stopped after 100ms of inactivity
});

// Animation loop
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
        
        // Always animate elements in the visible section or background ellipses regardless of section
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

// Start the animation
animateEllipses();

// cursor
let mouseCursor = document.querySelector('.cursor');

window.addEventListener('mousemove', cursor);

function cursor(e) { 
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
}

// Handle ellipse animation
const hero = document.querySelector('.section-one');
const contianer = document.querySelector('.contianer');
const title = document.querySelector('.name');
const img2 = document.querySelector('.object-2');
const img3 = document.querySelector('.object-3');
const img4 = document.querySelector('.object-4');
const img5 = document.querySelector('.object-5');

// Check if elements exist before adding event listeners
if (hero && contianer) {
  // Movement Animation to happen
  contianer.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    // Removed rotation for the title/text
    // Only animate the background ellipses
    if (img2) img2.style.transform = `translateX(${xAxis}px) translateY(${yAxis}px)`;
    if (img3) img3.style.transform = `translateX(${-xAxis}px) translateY(${-yAxis}px)`;
    if (img4) img4.style.transform = `translateX(${xAxis}px) translateY(${yAxis}px)`;
    if (img5) img5.style.transform = `translateX(${-xAxis}px) translateY(${-yAxis}px)`;
  });

  // Animate In
  contianer.addEventListener('mouseenter', (e) => {
    // Remove any animations for the title
    if (title) title.style.transition = "none";
  });

  // Animate Out
  contianer.addEventListener('mouseleave', (e) => {
    // Reset the title to its normal state without rotation
    if (title) {
      title.style.transition = "all 0.5s ease";
      title.style.transform = "none";
    }
    
    // Reset the ellipses
    if (img2) img2.style.transform = "translateX(0px) translateY(0px)";
    if (img3) img3.style.transform = "translateX(0px) translateY(0px)";
    if (img4) img4.style.transform = "translateX(0px) translateY(0px)";
    if (img5) img5.style.transform = "translateX(0px) translateY(0px)";
  });
}

// Scroll animations
window.addEventListener('scroll', () => {
  // Add any scroll animations here if needed
});

// Test global function availability 
console.log('Testing global functions:', 
  typeof prevSlide === 'function' ? 'prevSlide is available' : 'prevSlide NOT available',
  typeof nextSlide === 'function' ? 'nextSlide is available' : 'nextSlide NOT available'
);

// Email validation
document.addEventListener('DOMContentLoaded', function() {
  const emailInput = document.getElementById('email');
  const validationMessage = document.querySelector('.email-validation-message');
  
  if (emailInput && validationMessage) {
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
    
    function validateEmail() {
      const email = emailInput.value.trim();
      
      if (email === '') {
        validationMessage.textContent = '';
        return;
      }
      
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!emailPattern.test(email)) {
        validationMessage.textContent = 'Please enter a valid email address';
        validationMessage.style.color = 'var(--red)';
      } else {
        validationMessage.textContent = 'Valid email address!';
        validationMessage.style.color = '#4CAF50';
        
        // Clear the success message after 2 seconds
        setTimeout(() => {
          validationMessage.textContent = '';
        }, 2000);
      }
    }
  }
});