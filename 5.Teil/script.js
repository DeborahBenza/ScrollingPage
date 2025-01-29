console.clear();

const container = document.querySelector(".bodyteilfünf");

// 🌲 Funktion, um Bäume statisch im Bildschirm zu halten
function keepLeavesStatic(leaves) {
  leaves.forEach((leaf) => {
    gsap.set(leaf, {
      position: "fixed",
      bottom: "0px",
      transform: "rotate(0deg)"
    });
  });
}

// 🌲 Funktion, um Bäume zu duplizieren und zu verteilen
function distributeLeaves(originalId, count, direction) {
  const original = document.getElementById(originalId);
  const duplicates = [];

  for (let i = 0; i < count; i++) {
    const clone = original.cloneNode(true);
    clone.id = `${originalId}-clone-${i + 1}`;
    clone.style.position = "fixed";

    if (direction === "right") {
      clone.style.left = `${parseInt(original.style.left || 0) + 100 * (i + 1)}px`;
    } else if (direction === "left") {
      clone.style.left = `${parseInt(original.style.left || 0) - 100 * (i + 1)}px`;
    }

    clone.style.transform = "rotate(0deg)";
    container.appendChild(clone);
    duplicates.push(clone);
  }

  return duplicates;
}

// 🌲 Bäume animieren
function animateLeaves(leaves) {
  leaves.forEach((leaf, index) => {
    gsap.fromTo(
      leaf,
      { scale: 1.2, x: 0 },
      {
        scale: 1.7,
        x: index % 2 === 0 ? -window.innerWidth : window.innerWidth,
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}

// Originale Elemente & Duplikate vorbereiten
const leftLeaves = [
  document.querySelector("#leftLeave"),
  ...distributeLeaves("leftLeave", 5, "right")
];

const rightLeaves = [
  document.querySelector("#rightLeave"),
  ...distributeLeaves("rightLeave", 5, "left")
];

keepLeavesStatic(leftLeaves);
keepLeavesStatic(rightLeaves);

animateLeaves(leftLeaves);
animateLeaves(rightLeaves);

console.clear();

const animatedPath = document.querySelector("#animatedPath");
const pathLength = animatedPath.getTotalLength();

// Setze die anfänglichen Werte für die Strichanimation
gsap.set(animatedPath, {
  strokeDasharray: pathLength,
  strokeDashoffset: pathLength // Startet mit verstecktem Pfad
});

// ScrollTrigger für die Pfad-Animation, von unten nach oben
gsap.to(animatedPath, {
  strokeDashoffset: 0,  // Der Pfad wird vollständig freigelegt
  scrollTrigger: {
    trigger: ".bodyteilfünfzwei",  // Den Bereich, der den Pfad enthält
    start: "top 70%",   // Beginnt bei 70% des Viewports
    end: "top 0%",     // Endet bei 20%
    scrub: true,        // Macht die Animation an den Scrollvorgang gebunden
   
  }
});





const INC = 100;
const PADDING = 200;

const BLURBEND_ONE = [...document.querySelectorAll(".blurbend--one .word")];
const BLURBEND_TWO = [...document.querySelectorAll(".blurbend--two .word")];
const BLURBEND_THREE = [...document.querySelectorAll(".blurbend--three .word")];
const BLURBEND_FOUR = [...document.querySelectorAll(".blurbend--four .word")];

const BUFFEND_ONE = PADDING;
// Once upon a time
BLURBEND_ONE.forEach((word, index) => {
  to(word, {
    scrollTrigger: {
      scrub: true,
      start: () => BUFFEND_ONE + index * INC,
      end: () => BUFFEND_ONE + index * INC + INC,
      markers: true
    },
    opacity: 0
  });
});
// There was a marionette
const BUFFEND_TWO = BLURBEND_ONE.length * INC + INC + PADDING;
BLURBEND_TWO.forEach((word, index) => {
  to(word, {
    scrollTrigger: {
      scrub: true,
      start: () => BUFFEND_TWO + index * INC,
      end: () => BUFFEND_TWO + index * INC + INC,
      markers: true
    },
    opacity: 1
  });
});

// Hide the marionette text
const BUFFEND_THREE = BUFFEND_TWO + BLURBEND_TWO.length * INC + INC + PADDING;
BLURBEND_TWO.forEach((word, index) => {
  to(word, {
    scrollTrigger: {
      scrub: true,
      start: () => BUFFEND_THREE + index * INC,
      end: () => BUFFEND_THREE + index * INC + INC,
      markers: true
    },
    opacity: 0
  });
});

// And they lied
const BUFFEND_FOUR = BUFFEND_THREE + BLURBEND_TWO.length * INC + INC;
BLURBEND_THREE.forEach((word, index) => {
  to(word, {
    scrollTrigger: {
      scrub: true,
      start: () => BUFFEND_FOUR + index * INC,
      end: () => BUFFEND_FOUR + index * INC + INC,
      markers: true
    },
    opacity: 1
  });
});
const BUFFEND_FIVE = BUFFEND_FOUR + BLURBEND_THREE.length * INC + INC + PADDING;


BLURBEND_FOUR.forEach((word, index) => {
  to(word, {
    opacity: 1,
    scrollTrigger: {
      scrub: true,
      start: () => BUFFEND_FIVE + index * INC,
      end: () => BUFFEND_FIVE + index * INC + INC,
      markers: false
    }
  });
});

document.body.style.height = `${
  BUFFEND_FIVE + BLURBEND_FOUR.length * INC + INC + PADDING + window.innerHeight
}px`;
