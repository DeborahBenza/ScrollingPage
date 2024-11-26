// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Get the elements
const bgvideo = document.querySelector('#bgvideo');
const imageContainer = document.querySelector('#image-container');
const scrollContainer = document.querySelector('#scroll-container');

// Variables to track state
let isVideoLoaded = false;
let placeholderDuration = 10; // Default duration for placeholder video

// Preload video
bgvideo.preload = 'auto';

// Function to initialize the scroll trigger
function initScrollTrigger(videoDuration) {
    console.log("Initializing with video duration: " + videoDuration + " seconds");

    // Set the scroll container height based on video duration
    const scrollHeight = videoDuration * 60; // 60vh per second
    scrollContainer.style.height = `${scrollHeight}vh`;

    // Create a ScrollTrigger for smooth scrolling
    ScrollTrigger.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true, // Smooth scrubbing
        onUpdate: (self) => {
            const progress = self.progress; // Scroll progress
            bgvideo.currentTime = progress * videoDuration;

            // Update video and image opacity
            const opacity = 1 - Math.abs(progress);
            bgvideo.style.opacity = opacity;
            imageContainer.style.opacity = 1 - opacity;
        }
    });
}

// Function to check and initialize with placeholder duration
function initializeWithPlaceholder() {
    if (!isVideoLoaded) {
        console.log("Initializing with placeholder duration...");
        initScrollTrigger(placeholderDuration);
    }
}

// Event listener for when video metadata is loaded
bgvideo.addEventListener('loadedmetadata', function () {
    isVideoLoaded = true;
    const videoDuration = bgvideo.duration || placeholderDuration;
    initScrollTrigger(videoDuration); // Reinitialize ScrollTrigger with actual duration
});

// If video is taking too long to load, initialize with placeholder
setTimeout(initializeWithPlaceholder, 2000); // 2-second timeout

// Optimize video playback
bgvideo.addEventListener('canplay', function () {
    bgvideo.play().then(() => {
        bgvideo.pause(); // Pause to wait for user scroll
    }).catch(error => {
        console.error("Error attempting to play video:", error);
    });
});
