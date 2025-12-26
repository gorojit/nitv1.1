// Sticky Navigation Functionality
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navBar');
    const stickyNav = document.getElementById('sticky-nav');
    const topSection = document.getElementById('top-section');
    
    const topSectionHeight = topSection ? topSection.offsetHeight : 0;
    
    if (window.pageYOffset > topSectionHeight) {
        navbar.classList.add('sticky');
        stickyNav.style.position = 'fixed';
        stickyNav.style.top = '0';
        stickyNav.style.width = '100%';
        stickyNav.style.zIndex = '1000';
    } else {
        navbar.classList.remove('sticky');
        stickyNav.style.position = 'relative';
    }
});

// Counter Animation with Scroll Trigger
let valueDisplays = document.querySelectorAll(".num");
let counterSection = document.querySelector(".mainBD8");
let interval = 4000;
let hasAnimated = false;

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

function isPartiallyVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
        rect.top <= windowHeight * 0.75 &&
        rect.bottom >= 0
    );
}

function handleScroll() {
    if (hasAnimated) return;

    if (counterSection && isPartiallyVisible(counterSection)) {
        hasAnimated = true;
        startCounter();
        window.removeEventListener('scroll', handleScroll);
    }
}

window.addEventListener('scroll', handleScroll);
handleScroll();

// Notice Board Tab Switching
function showParagraph(paragraphId) {
    const paragraphs = document.querySelectorAll('.paragraph');
    paragraphs.forEach(p => p.classList.remove('active'));
    
    const selectors = document.querySelectorAll('.mySelector');
    selectors.forEach(s => s.classList.remove('active'));
    
    const selectedParagraph = document.getElementById(paragraphId);
    if (selectedParagraph) {
        selectedParagraph.classList.add('active');
    }
    
    const clickedSelector = event.target.closest('.mySelector');
    if (clickedSelector) {
        clickedSelector.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const firstSelector = document.getElementById('text1');
    const firstParagraph = document.getElementById('p1');
    
    if (firstSelector) {
        firstSelector.classList.add('active');
    }
    
    if (firstParagraph) {
        firstParagraph.classList.add('active');
    }
});

// Infinite Gallery Carousel - Responsive
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slider = document.querySelector('.rating-slider');
const carousel = document.querySelector('.rating-carousel');
const originalWrappers = document.querySelectorAll('.rating-wrapper');

if (slider && originalWrappers.length > 0) {
    const cloneBefore = [];
    const cloneAfter = [];
    
    originalWrappers.forEach(wrapper => {
        cloneBefore.push(wrapper.cloneNode(true));
        cloneAfter.push(wrapper.cloneNode(true));
    });
    
    cloneBefore.forEach(clone => slider.insertBefore(clone, slider.firstChild));
    cloneAfter.forEach(clone => slider.appendChild(clone));
    
    let allWrappers = document.querySelectorAll('.rating-wrapper');
    const totalOriginal = originalWrappers.length;
    let currentIndex = totalOriginal;
    
    function getCardWidth() {
        const screenWidth = window.innerWidth;
        const wrapper = document.querySelector('.rating-wrapper');
        if (!wrapper) return 300;
        
        const computedStyle = window.getComputedStyle(wrapper);
        const width = wrapper.offsetWidth;
        const margin = parseInt(computedStyle.marginLeft) + parseInt(computedStyle.marginRight);
        
        return width + margin;
    }
    
    function getVisibleCards() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) return 1;
        if (screenWidth <= 768) return 1;
        if (screenWidth <= 1024) return 2;
        return 3;
    }
    
    function updateFocused() {
        allWrappers.forEach((wrapper, index) => {
            wrapper.classList.remove('focused');
        });
        
        const middleCard = allWrappers[currentIndex];
        if (middleCard) {
            middleCard.classList.add('focused');
        }
    }
    
    function slideToIndex(index, smooth = true) {
        const cardWidth = getCardWidth();
        const carouselWidth = carousel.offsetWidth;
        const visibleCards = getVisibleCards();
        
        if (smooth) {
            slider.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            slider.style.transition = 'none';
        }
        
        const offset = (carouselWidth / 2) - (cardWidth / 2);
        const translateX = offset - (index * cardWidth);
        
        slider.style.transform = `translateX(${translateX}px)`;
        currentIndex = index;
        updateFocused();
    }
    
    function checkInfiniteLoop() {
        if (currentIndex >= totalOriginal * 2) {
            setTimeout(() => {
                slideToIndex(totalOriginal, false);
            }, 500);
        }
        else if (currentIndex < totalOriginal) {
            setTimeout(() => {
                slideToIndex(totalOriginal * 2 - 1, false);
            }, 500);
        }
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            slideToIndex(currentIndex + 1);
            checkInfiniteLoop();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            slideToIndex(currentIndex - 1);
            checkInfiniteLoop();
        });
    }
    
    slideToIndex(currentIndex, false);
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            allWrappers = document.querySelectorAll('.rating-wrapper');
            slideToIndex(currentIndex, false);
        }, 250);
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                slideToIndex(currentIndex + 1);
                checkInfiniteLoop();
            } else {
                slideToIndex(currentIndex - 1);
                checkInfiniteLoop();
            }
        }
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (prevBtn) prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            if (nextBtn) nextBtn.click();
        }
    });
}

// ==================== PLACEMENT CAROUSEL FUNCTIONALITY ====================
const placementPrevBtn = document.querySelector('.placement-prev-btn');
const placementNextBtn = document.querySelector('.placement-next-btn');
const placementTrack = document.querySelector('.placement-track');
const placementCards = document.querySelectorAll('.placement-card');

if (placementTrack && placementCards.length > 0) {
    let currentPlacementIndex = 0;
    const totalPlacementCards = placementCards.length;
    
    function getPlacementCardWidth() {
        const card = placementCards[0];
        const style = window.getComputedStyle(card);
        const margin = parseInt(style.marginLeft) + parseInt(style.marginRight);
        return card.offsetWidth + margin + 30;
    }
    
    function getVisiblePlacementCards() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 576) return 1;
        if (screenWidth <= 992) return 2;
        if (screenWidth <= 1400) return 3;
        return 3;
    }
    
    function updatePlacementPosition(smooth = true) {
        const cardWidth = getPlacementCardWidth();
        const visibleCards = getVisiblePlacementCards();
        const maxIndex = Math.max(0, totalPlacementCards - visibleCards);
        
        if (currentPlacementIndex < 0) currentPlacementIndex = 0;
        if (currentPlacementIndex > maxIndex) currentPlacementIndex = maxIndex;
        
        if (smooth) {
            placementTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            placementTrack.style.transition = 'none';
        }
        
        const translateX = -(currentPlacementIndex * cardWidth);
        placementTrack.style.transform = `translateX(${translateX}px)`;
        
        updatePlacementButtons();
    }
    
    function updatePlacementButtons() {
        const visibleCards = getVisiblePlacementCards();
        const maxIndex = Math.max(0, totalPlacementCards - visibleCards);
        
        if (placementPrevBtn) {
            placementPrevBtn.disabled = currentPlacementIndex === 0;
            placementPrevBtn.style.opacity = currentPlacementIndex === 0 ? '0.5' : '1';
            placementPrevBtn.style.cursor = currentPlacementIndex === 0 ? 'not-allowed' : 'pointer';
        }
        
        if (placementNextBtn) {
            placementNextBtn.disabled = currentPlacementIndex >= maxIndex;
            placementNextBtn.style.opacity = currentPlacementIndex >= maxIndex ? '0.5' : '1';
            placementNextBtn.style.cursor = currentPlacementIndex >= maxIndex ? 'not-allowed' : 'pointer';
        }
    }
    
    if (placementNextBtn) {
        placementNextBtn.addEventListener('click', () => {
            const visibleCards = getVisiblePlacementCards();
            const maxIndex = Math.max(0, totalPlacementCards - visibleCards);
            if (currentPlacementIndex < maxIndex) {
                currentPlacementIndex++;
                updatePlacementPosition();
            }
        });
    }
    
    if (placementPrevBtn) {
        placementPrevBtn.addEventListener('click', () => {
            if (currentPlacementIndex > 0) {
                currentPlacementIndex--;
                updatePlacementPosition();
            }
        });
    }
    
    let placementTouchStartX = 0;
    let placementTouchEndX = 0;
    
    const placementCarousel = document.querySelector('.placement-carousel');
    
    if (placementCarousel) {
        placementCarousel.addEventListener('touchstart', (e) => {
            placementTouchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        placementCarousel.addEventListener('touchend', (e) => {
            placementTouchEndX = e.changedTouches[0].screenX;
            handlePlacementSwipe();
        }, { passive: true });
    }
    
    function handlePlacementSwipe() {
        const swipeThreshold = 50;
        const diff = placementTouchStartX - placementTouchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                if (placementNextBtn && !placementNextBtn.disabled) {
                    placementNextBtn.click();
                }
            } else {
                if (placementPrevBtn && !placementPrevBtn.disabled) {
                    placementPrevBtn.click();
                }
            }
        }
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && placementPrevBtn && !placementPrevBtn.disabled) {
            placementPrevBtn.click();
        } else if (e.key === 'ArrowRight' && placementNextBtn && !placementNextBtn.disabled) {
            placementNextBtn.click();
        }
    });
    
    updatePlacementPosition(false);
    
    let placementResizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(placementResizeTimeout);
        placementResizeTimeout = setTimeout(() => {
            updatePlacementPosition(false);
        }, 250);
    });
}

// Clock Display
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        clockElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

setInterval(updateClock, 1000);
updateClock();

const buttons = document.querySelectorAll(".mySelector");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const butt = document.querySelectorAll("#text1");
        butt.forEach(btn => {
            btn.style.backgroundColor = "";
            btn.style.color = "";
        });

        buttons.forEach(btn => {
            btn.style.backgroundColor = "";
            btn.style.color = "";
        });

        this.style.backgroundColor = "#315335";
        this.style.color = "white";
    });
});

// Font size changer 
let currentFontSize = 100;
const minSize = 80;
const maxSize = 150;
const step = 10;

const savedSize = localStorage.getItem('fontSize');
if (savedSize) {
    currentFontSize = parseInt(savedSize);
    applyFontSize();
}

function applyFontSize() {
    document.documentElement.style.fontSize = currentFontSize + '%';
    localStorage.setItem('fontSize', currentFontSize);
}

function increaseFont() {
    if (currentFontSize < maxSize) {
        currentFontSize += step;
        applyFontSize();
    }
}

function decreaseFont() {
    if (currentFontSize > minSize) {
        currentFontSize -= step;
        applyFontSize();
    }
}

function resetFont() {
    currentFontSize = 100;
    applyFontSize();
}

// ==================== SCREEN READER FUNCTIONALITY ====================
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let ttsEnabled = false;
let speechRate = 1.0;
let isReading = false;
let screenReaderButton = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeScreenReader();
    console.log('Screen Reader initialized');
    console.log('Keyboard shortcuts available:');
    console.log('Alt + R: Read entire page');
    console.log('Alt + S: Stop reading');
    console.log('Alt + +: Increase speed');
    console.log('Alt + -: Decrease speed');
});

function initializeScreenReader() {
    const allLinks = document.querySelectorAll('.nav-link');
    
    allLinks.forEach(link => {
        if (link.textContent.trim() === 'Screen Reader') {
            screenReaderButton = link;
        }
    });
    
    if (screenReaderButton) {
        screenReaderButton.style.cursor = 'pointer';
        screenReaderButton.setAttribute('role', 'button');
        screenReaderButton.setAttribute('aria-label', 'Toggle screen reader');
        screenReaderButton.setAttribute('id', 'screen-reader-btn');
        
        screenReaderButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleScreenReader();
        });
        
        updateButtonAppearance(false);
    }
}

function toggleScreenReader() {
    ttsEnabled = !ttsEnabled;
    
    if (ttsEnabled) {
        enableScreenReader();
        showNotification('🔊 Screen Reader Enabled - Hover over text to hear it read aloud', 'success');
        speak('Screen Reader enabled. Hover over any text to hear it read aloud.');
    } else {
        disableScreenReader();
        showNotification('🔇 Screen Reader Disabled', 'info');
        stopSpeaking();
    }
    
    updateButtonAppearance(ttsEnabled);
}

function updateButtonAppearance(enabled) {
    if (!screenReaderButton) return;
    
    if (enabled) {
        screenReaderButton.style.backgroundColor = '#27ae60';
        screenReaderButton.style.color = 'white';
        screenReaderButton.style.padding = '8px 15px';
        screenReaderButton.style.borderRadius = '8px';
        screenReaderButton.style.fontWeight = 'bold';
        screenReaderButton.style.border = '2px solid #fff';
        screenReaderButton.innerHTML = '🔊 Screen Reader ON';
        screenReaderButton.style.transition = 'all 0.3s ease';
        
        document.body.classList.add('screen-reader-active');
    } else {
        screenReaderButton.style.backgroundColor = '';
        screenReaderButton.style.color = '';
        screenReaderButton.style.padding = '';
        screenReaderButton.style.borderRadius = '';
        screenReaderButton.style.fontWeight = '';
        screenReaderButton.style.border = '';
        screenReaderButton.textContent = 'Screen Reader';
        
        document.body.classList.remove('screen-reader-active');
    }
}

function enableScreenReader() {
    const readableSelectors = [
        'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
        'li', 'button', 'a', 'label', 'td', 'th',
        'span', '.paragraph', '.bubble-label', 
        '.dropdown-item', '.nav-link'
    ];
    
    const readableElements = document.querySelectorAll(readableSelectors.join(', '));
    
    readableElements.forEach(element => {
        if (element.id === 'screen-reader-btn') return;
        
        element.addEventListener('mouseenter', handleElementHover);
        element.addEventListener('focus', handleElementHover);
        
        element.style.cursor = 'help';
        element.setAttribute('data-sr-enabled', 'true');
    });
    
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function disableScreenReader() {
    stopSpeaking();
    
    const readableElements = document.querySelectorAll('[data-sr-enabled="true"]');
    
    readableElements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementHover);
        element.removeEventListener('focus', handleElementHover);
        element.style.cursor = '';
        element.removeAttribute('data-sr-enabled');
    });
    
    document.removeEventListener('keydown', handleKeyboardShortcuts);
}

function handleElementHover(event) {
    if (!ttsEnabled) return;
    
    stopSpeaking();
    
    let text = '';
    const element = event.target;
    
    if (element.getAttribute('aria-label')) {
        text = element.getAttribute('aria-label');
    } else if (element.alt) {
        text = element.alt;
    } else {
        text = element.textContent.trim();
    }
    
    if (text.length < 2) return;
    
    if (element.tagName === 'svg' || element.closest('svg')) return;
    
    if (text.length > 300) {
        text = text.substring(0, 300) + '... hover longer to hear more';
    }
    
    element.classList.add('sr-reading');
    
    speak(text, function() {
        element.classList.remove('sr-reading');
    });
}

function speak(text, onEnd) {
    if (!text || text.length === 0) return;
    
    text = text.replace(/\s+/g, ' ').trim();
    
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.rate = speechRate;
    currentUtterance.pitch = 1.0;
    currentUtterance.volume = 1.0;
    currentUtterance.lang = 'en-US';
    
    currentUtterance.onstart = function() {
        isReading = true;
    };
    
    currentUtterance.onend = function() {
        currentUtterance = null;
        isReading = false;
        if (onEnd) onEnd();
    };
    
    currentUtterance.onerror = function(event) {
        console.error('Speech error:', event);
        currentUtterance = null;
        isReading = false;
        if (onEnd) onEnd();
    };
    
    speechSynthesis.speak(currentUtterance);
}

function stopSpeaking() {
    if (speechSynthesis.speaking || isReading) {
        speechSynthesis.cancel();
        currentUtterance = null;
        isReading = false;
        
        document.querySelectorAll('.sr-reading').forEach(el => {
            el.classList.remove('sr-reading');
        });
    }
}

function readEntirePage() {
    if (!ttsEnabled) {
        showNotification('Please enable Screen Reader first', 'warning');
        return;
    }
    
    stopSpeaking();
    
    const mainSections = [
        '.mainBD1', '.mainBD2', '.mainBD3', 
        '.mainBD4', '.mainBD5'
    ];
    
    let fullText = '';
    
    mainSections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            const text = section.textContent
                .replace(/\s+/g, ' ')
                .trim();
            if (text.length > 0) {
                fullText += text + '. ';
            }
        }
    });
    
    if (fullText.length > 0) {
        showNotification('📖 Reading entire page... Press Alt+S to stop', 'info');
        speak(fullText);
    }
}

function changeSpeechRate(delta) {
    speechRate = Math.max(0.5, Math.min(2.0, speechRate + delta));
    showNotification(`🎚️ Speech rate: ${speechRate.toFixed(1)}x`, 'info');
    
    if (isReading && currentUtterance) {
        const remainingText = currentUtterance.text;
        stopSpeaking();
        speak(remainingText);
    }
}

function handleKeyboardShortcuts(event) {
    if (event.altKey && event.key.toLowerCase() === 'r') {
        event.preventDefault();
        readEntirePage();
    }
    
    if (event.altKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        stopSpeaking();
        showNotification('⏹️ Reading stopped', 'info');
    }
    
    if (event.altKey && event.key.toLowerCase() === 't') {
        event.preventDefault();
        toggleScreenReader();
    }
    
    if (event.altKey && (event.key === '+' || event.key === '=')) {
        event.preventDefault();
        changeSpeechRate(0.2);
    }
    
    if (event.altKey && event.key === '-') {
        event.preventDefault();
        changeSpeechRate(-0.2);
    }
}

function showNotification(message, type = 'info') {
    let notification = document.getElementById('sr-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'sr-notification';
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            font-size: 16px;
            font-weight: 500;
            max-width: 350px;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            transform: translateY(-20px);
            font-family: Arial, sans-serif;
        `;
        document.body.appendChild(notification);
    }
    
    const colors = {
        'success': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        'error': 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
        'warning': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'info': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    };
    
    notification.style.background = colors[type] || colors['info'];
    notification.textContent = message;
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
    }, 4000);
}

window.addEventListener('beforeunload', function() {
    stopSpeaking();
    if (ttsEnabled) {
        disableScreenReader();
    }
});

function createStatusIndicator() {
    if (document.getElementById('sr-status-indicator')) return;
    
    const indicator = document.createElement('div');
    indicator.id = 'sr-status-indicator';
    indicator.className = 'sr-status-indicator';
    indicator.innerHTML = '🔊 Screen Reader Active';
    indicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 10px 20px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
        z-index: 9999;
        animation: pulse 2s infinite;
        display: none;
    `;
    
    document.body.appendChild(indicator);
}

function updateStatusIndicator() {
    let indicator = document.getElementById('sr-status-indicator');
    if (!indicator) {
        createStatusIndicator();
        indicator = document.getElementById('sr-status-indicator');
    }
    
    indicator.style.display = ttsEnabled ? 'block' : 'none';
}

const originalToggle = toggleScreenReader;
toggleScreenReader = function() {
    originalToggle();
    updateStatusIndicator();
};


// Infinite loop for cards - automatically clones cards for seamless scrolling
function initInfiniteScroll() {
    const carousel = document.getElementById('cardsCarousel');
    const originalCards = Array.from(carousel.children);
    
    // Clone all original cards and append them
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        carousel.appendChild(clone);
    });
    
    // Add click events to all cards (including clones)
    document.querySelectorAll('.placement-card').forEach(card => {
        card.addEventListener('click', function(e) {
            console.log('Navigating to: ' + this.href);
        });
    });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    initInfiniteScroll();
});

// Pause animation on hover
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('cardsCarousel');
    
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
});



         // Clone content for seamless infinite scroll
        const marqueeContent = document.getElementById('marquee-content');
        const originalItems = marqueeContent.innerHTML;
        marqueeContent.innerHTML += originalItems;

       // Clone content for seamless infinite scroll
        const track = document.getElementById('track');
        const originalContent = track.innerHTML;
        track.innerHTML += originalContent; // Append clone for seamless loop