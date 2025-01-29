console.clear();

const container = document.querySelector(".bodyteilfünf");

// Funktion, um Bäume statisch im Bildschirm zu halten
function keepLeavesStatic(leaves) {
  leaves.forEach((leaf) => {
    gsap.set(leaf, {
      position: "fixed", // Stelle sicher, dass sie fixiert sind
      bottom: "0px", // Position am unteren Bildschirmrand
      transform: "rotate(0deg)" // Sicherstellen, dass die Bäume nicht auf dem Kopf stehen
    });
  });
}

// Funktion, um Bäume zu duplizieren und mit 100px Abstand zu positionieren
function distributeLeaves(originalId, count, direction) {
  const original = document.getElementById(originalId);
  const duplicates = [];

  for (let i = 0; i < count; i++) {
    const clone = original.cloneNode(true);
    clone.id = `${originalId}-clone-${i + 1}`;
    clone.style.position = "fixed"; // Fixiere die Position der Kopien
    if (direction === "right") {
      clone.style.left = `${parseInt(original.style.left || 0) + 100 * (i + 1)}px`; // Abstand von 100px pro Kopie nach rechts
    } else if (direction === "left") {
      clone.style.left = `${parseInt(original.style.left || 0) - 100 * (i + 1)}px`; // Abstand von 100px pro Kopie nach links
    }
    clone.style.transform = "rotate(0deg)"; // Sicherstellen, dass die Bäume korrekt ausgerichtet sind
    container.appendChild(clone);
    duplicates.push(clone);
  }

  return duplicates;
}

// Animation der Skalierung und Bewegung beim Scrollen
function animateLeaves(leaves) {
  leaves.forEach((leaf, index) => {
    const scale = 1.2; // Vordergrund größer

    gsap.fromTo(
      leaf,
      { scale: scale, x: 0 },
      {
        scale: scale + 0.5, // Bäume werden während des Scrollens größer
        x: index % 2 === 0 ? -window.innerWidth : window.innerWidth, // Bewegung nach links/rechts
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

// Originale Elemente und Duplikate vorbereiten
const leftLeaves = [
  document.querySelector("#leftLeave"),
  ...distributeLeaves("leftLeave", 5, "right") // Linke Bäume 5x nach rechts duplizieren
];

const rightLeaves = [
  document.querySelector("#rightLeave"),
  ...distributeLeaves("rightLeave", 5, "left") // Rechte Bäume 5x nach links duplizieren
];

// Linke und rechte Bäume statisch positionieren
keepLeavesStatic(leftLeaves);
keepLeavesStatic(rightLeaves);

// Animationen anwenden
animateLeaves(leftLeaves); // Animation für linke Bäume
animateLeaves(rightLeaves); // Gleiche Animation für rechte Bäume

