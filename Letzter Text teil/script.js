const {
  gsap,
  ScrollTrigger,
  gsap: { timeline, set, to, from },
  Splitting
} = window;

Splitting();
set(".blurbend", { visibility: "visible" });
gsap.registerPlugin(ScrollTrigger);
window.scrollTo(0, 0);


const INC = 100;
const PADDING = 200;

const BLURBEND_ONE = [...document.querySelectorAll(".blurbend--one .word")];
const BLURBEND_TWO = [...document.querySelectorAll(".blurbend--two .word")];
const BLURBEND_THREE = [...document.querySelectorAll(".blurbend--three .word")];
const BLURBEND_FOUR = [...document.querySelectorAll(".blurbend--four .word")];

const BUFF_ONE = PADDING;
// Once upon a time
BLURBEND_ONE.forEach((word, index) => {
  to(word, {
    scrollTrigger: {
      scrub: true,
      start: () => BUFF_ONE + index * INC,
      end: () => BUFF_ONE + index * INC + INC,
      markers: false // Add markers for debugging
    },
    opacity: 0
  });
});
// There was a marionette
const BUFF_TWO = BLURBEND_ONE.length * INC + INC + PADDING;
BLURBEND_TWO.forEach((word, index) => {
  to(word, {
    scrollTrigger: {
      scrub: true,
      start: () => BUFF_TWO + index * INC,
      end: () => BUFF_TWO + index * INC + INC,
      markers: false
    },
    opacity: 1
  });
});


// Hide the marionette text
const BUFF_THREE = BUFF_TWO + BLURBEND_TWO.length * INC + INC + PADDING;
BLURBEND_TWO.forEach((word, index) => {
  to(word, {
    scrollTrigger: {
      scrub: true,
      start: () => BUFF_THREE + index * INC,
      end: () => BUFF_THREE + index * INC + INC,
      markers: false
    },
    opacity: 0
  });
});

// And they lied
const BUFF_FOUR = BUFF_THREE + BLURBEND_TWO.length * INC + INC;
BLURBEND_THREE.forEach((word, index) => {
  to(word, {
    scrollTrigger: {
      scrub: true,
      start: () => BUFF_FOUR + index * INC,
      end: () => BUFF_FOUR + index * INC + INC,
      markers: false
    },
    opacity: 1
  });
});
const BUFF_FIVE = BUFF_FOUR + BLURBEND_THREE.length * INC + INC + PADDING;


BLURBEND_FOUR.forEach((word, index) => {
  to(word, {
    opacity: 1,
    scrollTrigger: {
      scrub: true,
      start: () => BUFF_FIVE + index * INC,
      end: () => BUFF_FIVE + index * INC + INC,
      markers: false
    }
  });
});


document.body.style.height = `${
  BUFF_FIVE + BLURBEND_FOUR.length * INC + INC + PADDING + window.innerHeight
}px`;


let isScrolling = false;

// Scroll-Event hinzufügen
window.addEventListener('scroll', () => {
    // Verhindere mehrfaches Auslösen während des Scrollens
    if (isScrolling) return;

    // Prüfen, ob der Benutzer am Anfang der Seite ist
    if (window.scrollY === 0) {
        isScrolling = true; // Blockiere weitere Scroll-Events
        
        // Weiterleiten zur anderen Seite und dort ans Ende scrollen
        window.location.href = '../5.Teil/index.html#end'; // `#end`-Anker markieren
    }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          // Footer ist sichtbar, leite weiter
          window.location.href = '../4.Teil/index.html';
      }
  });
});

observer.observe(footer);






