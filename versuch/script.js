
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: ".teil-drei",
    start: "top top",
    end: "bottom bottom",
    pin: ".main-drei",
    scrub: true,
    onEnter: () => {
        console.log("Gallery section entered.");
    },
    onLeave: () => {
        console.log("Exited gallery section.");
    }
  });