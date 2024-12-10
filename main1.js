gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


const smoother = ScrollSmoother.create({
  wrapper: ".smooth-wrapper",
  content: ".smooth-content",
  smooth: 1.5, // Scroll-Glätte
});

console.log("ScrollSmoother initialized:", smoother);

// Debug: ScrollTrigger aktivieren
ScrollTrigger.defaults({ markers: true });

// Horizontal scroll
gsap.to(".horizontal-container", {
  xPercent: -300,
  scrollTrigger: {
    trigger: ".horizontal-scroll",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true,
  },
});

// Text reveal
gsap.utils.toArray(".text-block").forEach((block, i) => {
  gsap.from(block, {
    opacity: 0,
    y: 50,
    scrollTrigger: {
      trigger: block,
      start: "top 90%",
      end: "top 60%",
      scrub: true,
    },
  });
});

// Image fade-in
gsap.utils.toArray(".image-item").forEach((item, i) => {
  gsap.from(item, {
    opacity: 0,
    scale: 0.8,
    scrollTrigger: {
      trigger: item,
      start: "top 90%",
      end: "top 60%",
      scrub: true,
    },
  });
});

// Parallax effect
gsap.to(".parallax-layer:nth-child(1)", {
  yPercent: -20,
  scrollTrigger: {
    trigger: ".parallax",
    start: "top bottom",
    scrub: true,
  },
});
gsap.to(".parallax-layer:nth-child(2)", {
  yPercent: -40,
  scrollTrigger: {
    trigger: ".parallax",
    start: "top bottom",
    scrub: true,
  },
});
gsap.to(".parallax-layer:nth-child(3)", {
  yPercent: -60,
  scrollTrigger: {
    trigger: ".parallax",
    start: "top bottom",
    scrub: true,
  },
});
