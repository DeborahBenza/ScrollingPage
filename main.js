// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Get the background video element
const bgvideo = document.querySelector('#bgvideo');

// Pause the video and set it to the beginning
bgvideo.pause();
bgvideo.currentTime = 0;

// Function to update the playback speed based on scroll velocity
let lastScrollTop = 0;

function handleScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = currentScrollTop - lastScrollTop;

    // Set video playback speed based on scroll direction and speed
    if (scrollDelta > 0) {
        bgvideo.playbackRate = Math.min(3, Math.max(1, scrollDelta / 10)); // Adjust speed as needed
        bgvideo.play();
    } else if (scrollDelta < 0) {
        bgvideo.playbackRate = Math.min(3, Math.max(1, Math.abs(scrollDelta / 10))); // Adjust speed as needed
        bgvideo.play();
    } else {
        bgvideo.pause();
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Prevent negative scroll
}

// Add an event listener for the scroll event
window.addEventListener('scroll', handleScroll);

// Ensure the video pauses when scrolling stops
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        bgvideo.pause(); // Pause the video when scrolling stops
    }, 200); // Adjust delay for stopping the video
});

// Create ScrollTrigger for each section (optional, for pinning behavior)
let sections = gsap.utils.toArray('.step');
sections.forEach((step) => {
    ScrollTrigger.create({
        trigger: step,
        start: 'top bottom',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
    });
});
