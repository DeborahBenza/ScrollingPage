// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Get the background video element
const bgvideo = document.querySelector('#bgvideo');

// Pause the video and set it to the beginning
bgvideo.pause();
bgvideo.currentTime = 0;

// Variables to track scroll state
let lastScrollTop = 0;
let isScrolling = false;
let scrollTimeout;

function handleScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = currentScrollTop - lastScrollTop;

    // Clear the previous timeout
    clearTimeout(scrollTimeout);

    // Set isScrolling to true
    isScrolling = true;

    // Calculate the video progress based on scroll position
    const scrollProgress = currentScrollTop / (document.documentElement.scrollHeight - window.innerHeight);
    bgvideo.currentTime = scrollProgress * bgvideo.duration;

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Prevent negative scroll

    // Set a timeout to pause the video when scrolling stops
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
        bgvideo.pause();
    }, 50); // Adjust this value to change how quickly the video pauses after scrolling stops
}

// Add an event listener for the scroll event
window.addEventListener('scroll', handleScroll);

// Create a ScrollTrigger for smooth scrolling
ScrollTrigger.create({
    trigger: ".scroll-container",
    start: "top top",
    end: "bottom bottom",
    scrub: true
});

function hideContent() {
    contents.forEach(content => {
        content.classList.remove('visible');
    });
}

function showContent() {
    contents.forEach(content => {
        content.classList.add('visible');
    });
}
// Add an event listener for the scroll event
window.addEventListener('scroll', handleScroll);

// Listen for video end
bgvideo.addEventListener('ended', showContent);
// Create ScrollTrigger for each section (optional, for pinning behavior)
let sections = gsap.utils.toArray('.step');
sections.forEach((step) => {
    ScrollTrigger.create({
        trigger: step,
        start: 'top top',
        pin: true,
        pinSpacing: false
    });
});

// Wähle das Element aus
const textContainer = document.querySelector('.text-container');

// Text-Animation: Skalieren und Einfaden
gsap.to(textContainer, {
    opacity: 1, // Sichtbarkeit herstellen
    scale: 1, // Von kleiner zu normaler Größe skalieren
    duration: 5, // Dauer der Animation
    ease: 'power2.out', // Sanfter Übergang
});