console.clear();

document.addEventListener("DOMContentLoaded", function () {
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

  // 🎥 Animierter Pfad
  const animatedPath = document.querySelector("#animatedPath");
  const pathLength = animatedPath.getTotalLength();

  gsap.set(animatedPath, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength 
  });

  gsap.to(animatedPath, {
    strokeDashoffset: 0,
    scrollTrigger: {
      trigger: ".bodyteilfünfzwei",
      start: "top 70%",
      end: "top 0%",
      scrub: true,
    }
  });

  // 🎭 Textanimation mit Splitting.js
  Splitting();

  const INC = 50;
  const PADDING = 100;

  const BLURBEND_ONE = [...document.querySelectorAll(".blurbend--one .word")];
  const BLURBEND_TWO = [...document.querySelectorAll(".blurbend--two .word")];
  const BLURBEND_THREE = [...document.querySelectorAll(".blurbend--three .word")];
  const BLURBEND_FOUR = [...document.querySelectorAll(".blurbend--four .word")];

  gsap.set([...BLURBEND_ONE, ...BLURBEND_TWO, ...BLURBEND_THREE, ...BLURBEND_FOUR], { opacity: 0 });

  let currentBuffer = PADDING;

  function animateWords(words, startBuffer) {
    words.forEach((word, index) => {
      gsap.to(word, {
        scrollTrigger: {
          trigger: ".bodyteilfünfzwei",
          start: `top+=${startBuffer + index * INC}px bottom`,
          end: `top+=${startBuffer + index * INC + INC}px bottom`,
          scrub: true,
        },
        opacity: 1,
        duration: 0.5
      });
    });
    return startBuffer + words.length * INC;
  }

  currentBuffer = animateWords(BLURBEND_ONE, currentBuffer);
  currentBuffer = animateWords(BLURBEND_TWO, currentBuffer + PADDING);
  currentBuffer = animateWords(BLURBEND_THREE, currentBuffer + PADDING);
  currentBuffer = animateWords(BLURBEND_FOUR, currentBuffer + PADDING);

  document.body.style.height = `${currentBuffer + PADDING + window.innerHeight}px`;
});
