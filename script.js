 window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navBar');
    if (window.scrollY > 0) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });

const topSection = document.getElementById('top-section');
const vid = document.getElementById('vid');
const vidContainer = document.querySelector('.vid');
vid.style.top = topSection.offsetHeight + "px";

const observer = new ResizeObserver(() => {
  vidContainer.style.top = topSection.offsetHeight + "px";
});




observer.observe(topSection);


 function updateClock() {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      document.getElementById('clock').textContent = now.toLocaleString('en-IN', options);
    }

    setInterval(updateClock, 1000); // Update every second
    updateClock(); // Initial call


     function showParagraph(paragraphId) {
      // 1. Get all paragraphs inside the contentDiv
      const paragraphs = document.querySelectorAll('#contentDiv .paragraph');

      // 2. Loop through all paragraphs and hide them (remove the 'active' class)
      paragraphs.forEach(p => {
        p.classList.remove('active');
      });

      // 3. Find the requested paragraph and show it (add the 'active' class)
      const newParagraph = document.getElementById(paragraphId);
      if (newParagraph) {
        newParagraph.classList.add('active');
       

      }
    }


    // Rating swiper
const carousel = document.querySelector('.rating-carousel');
const slider = document.querySelector('.rating-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const allSlides = document.querySelectorAll('.rating-wrapper');
const mediaQuery = window.matchMedia('(max-width: 1160px)');

if(!mediaQuery.matches) {
    slider.firstElementChild.nextElementSibling.classList.add('focused');
}

var direction = -1;
prevBtn.addEventListener('click', () => {
    if(direction === -1) {
        slider.appendChild(slider.firstElementChild);
        direction = 1;
    }

    allSlides.forEach(slide => {
        slide.classList.remove('focused');
    });

    carousel.style.justifyContent = 'flex-end';
    slider.style.transform = 'translate(20%)';
    if(!mediaQuery.matches) {
        slider.lastElementChild.previousElementSibling.previousElementSibling.classList.add('focused');
    }
});

nextBtn.addEventListener('click', () => {
    if(direction === 1) {
        slider.prepend(slider.lastElementChild);
        direction = -1;
    }

    allSlides.forEach(slide => {
        slide.classList.remove('focused');
    });

    carousel.style.justifyContent = 'flex-start';
    slider.style.transform = 'translate(-20%)';
    if(!mediaQuery.matches) {
        slider.firstElementChild.nextElementSibling.nextElementSibling.classList.add('focused');
    }
});

slider.addEventListener('transitionend', () => {
    if(direction === -1) {
        slider.appendChild(slider.firstElementChild);
    }
    else if(direction === 1) {
        slider.prepend(slider.lastElementChild);
    }

    slider.style.transition = 'none';
    slider.style.transform = 'translate(0)';
    setTimeout(() => {
        slider.style.transition = 'all 0.3s ease';
    })
});

// Get all counter elements
let valueDisplays = document.querySelectorAll(".num");
let counterSection = document.querySelector(".mainBD8"); // The section to watch
let interval = 4000; // Animation duration in milliseconds
let hasAnimated = false; // Flag to ensure animation runs only once

// Function to start the counter animation
function startCounter() {
    valueDisplays.forEach((valueDisplay) => {
        let startValue = 0;
        let endValue = parseInt(valueDisplay.getAttribute("data-val"));
        let duration = Math.floor(interval / endValue);

        let counter = setInterval(function () {
            startValue += 1;
            valueDisplay.textContent = startValue;

            if (startValue == endValue) {
                clearInterval(counter);
            }
        }, duration);
    });
}

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Alternative: Check if element is partially visible (more common use case)
function isPartiallyVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
        rect.top <= windowHeight * 0.75 && // Trigger when 75% down the viewport
        rect.bottom >= 0
    );
}

// Scroll event listener
function handleScroll() {
    if (hasAnimated) return; // Prevent multiple animations

    // Check if the counter section is visible
    if (counterSection && isPartiallyVisible(counterSection)) {
        hasAnimated = true;
        startCounter();
        // Remove scroll listener after animation starts
        window.removeEventListener('scroll', handleScroll);
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Check on page load in case section is already visible
handleScroll();


  const buttons = document.querySelectorAll(".mySelector");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      // Reset all buttons to default
      const butt = document.querySelectorAll("#text1");
      butt.forEach(btn => {
        btn.style.backgroundColor = "";
        btn.style.color = "";
      });

      buttons.forEach(btn => {
        btn.style.backgroundColor = "";
        btn.style.color = "";
      });

      // Highlight the clicked button
      this.style.backgroundColor = "#315335";
      this.style.color = "white";
    });
  });


  //interver
  const btn = document.getElementById("invertBtn");
  btn.addEventListener("click", () => {
    document.body.classList.toggle("invert");
  });
