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

            console.log("Scroll progress:", progress); // Log the progress
            // Update video and image visibility
            if (progress > 0.99) { // Changed from >= 1 to > 0.99
                console.log("Showing image"); // Log when image should show
                bgvideo.style.display = 'none';
                imageContainer.style.display = 'block';
            } else {
                console.log("Showing video"); // Log when video should show
                bgvideo.style.display = 'block';
                imageContainer.style.display = 'none';
            }
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

// Ensure image container is visible
imageContainer.style.display = 'none'; // Initially hide
