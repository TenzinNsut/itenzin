// Navigation Bar

const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('nav-links')[0];
const balls = document.getElementsByClassName('object');
const intro_name = document.getElementsByClassName('name')[0];
const sections = document.getElementsByClassName('collapse');
// const body = document.getElementsByClassName('body')[0];

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    intro_name.classList.toggle('active');
    for (let i = 0; i < balls.length; i++) {
        balls[i].classList.toggle('active');
    }

    for (let i = 0; i < sections.length; i++) { 
        sections[i].classList.toggle('active');
    }
   

    // body.classList.toggle('active');
    // balls.classList.toggle('active');
})





// background 
document.addEventListener("mousemove", parallax);
function parallax(e) { 
    document.querySelectorAll(".object").forEach(function (move) {
        
        var moving_value = move.getAttribute("data-value");
        var x = (e.clientX * moving_value) / 200;
        var y = (e.clientY * moving_value) /200;

        move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";

    })
}





// cursor

let mouseCursor = document.querySelector('.cursor');

window.addEventListener('mousemove', cursor);

function cursor(e) { 
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
}

// let navLinks = document.querySelectorAll('.nav-links li')

// navLinks.forEach(link => {
//     link.addEventListener('mouseover', () => {
//         mouseCursor.classList.add('cursor-grow')
//     })
// })

// navLinks.forEach(link => {
//     link.addEventListener('mouseleave', () => {
//         mouseCursor.classList.remove('cursor-grow')
//     })
// })




// smooth scroll

const scroll = new SmoothScroll('navbar a[herf*="#"]', {
    speed: 800
})