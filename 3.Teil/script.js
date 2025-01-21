'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Splitting
  Splitting();

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Marionette animation
  gsap.to('.marionette', {
    y: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.marionette__container',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    onComplete: () => console.log('Marionette animation complete'),
    onError: (err) => console.error('Marionette animation error:', err)
  });

  // Text animations
  gsap.utils.toArray('.blurb').forEach((blurb, index) => {
    gsap.from(blurb.querySelectorAll('.char'), {
      opacity: 0,
      y: 20,
      rotateX: -90,
      stagger: 0.02,
      scrollTrigger: {
        trigger: blurb,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        markers: true, // Remove this in production
      }
    });
  });
});