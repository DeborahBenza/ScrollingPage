
// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);



let speed = 100;
let height = document.querySelector("svg").getBBox().height;
//let svgCord = screenToSVG(document.querySelector("svg"), window.innerWidth / 2, window.innerHeight / 2);

gsap.set("#h2-1", { opacity: 0 });
gsap.set("#bg_grad", { attr: { cy: "-50" } });
gsap.set(["#dinoL", "#dinoR"], { y: 80 });
gsap.set("#dinoL", { x: -10 });

const mm = gsap.matchMedia();
mm.add("(max-width: 1922px)", () => {
    gsap.set(["#cloudStart-L", "#cloudStart-R"], { x: 10, opacity: 1 });
});

/*  SCENE 1 */
let scene1 = gsap.timeline();
ScrollTrigger.create({
    animation: scene1,
    trigger: ".scrollElement",
    start: "top top",
    end: "45% 100%",
    scrub: 3
});

// hills animation
scene1.to("#h1-1", { y: 3 * speed, x: 1 * speed, scale: 0.9, ease: "power1.in" }, 0);
scene1.to("#h1-2", { y: 2.6 * speed, x: -0.6 * speed, ease: "power1.in" }, 0);
scene1.to("#h1-3", { y: 1.7 * speed, x: 1.2 * speed }, 0.03);
scene1.to("#h1-4", { y: 3 * speed, x: 1 * speed }, 0.03);
scene1.to("#h1-5", { y: 2 * speed, x: 1 * speed }, 0.03);
scene1.to("#h1-6", { y: 2.3 * speed, x: -2.5 * speed }, 0);
scene1.to("#h1-7", { y: 5 * speed, x: 1.6 * speed }, 0);
scene1.to("#h1-8", { y: 3.5 * speed, x: 0.2 * speed }, 0);
scene1.to("#h1-9", { y: 3.5 * speed, x: -0.2 * speed }, 0);
scene1.to("#cloudsBig-L", { y: 4.5 * speed, x: -0.2 * speed }, 0);
scene1.to("#cloudsBig-R", { y: 4.5 * speed, x: -0.2 * speed }, 0);
scene1.to("#cloudStart-L", { x: -300 }, 0);
scene1.to("#cloudStart-R", { x: 300 }, 0);

//animate text
//scene1.to("#info", { y: 5 * speed }, 0);
// Optimierte Animation mit GSAP
// Typewriter-Effekt für das #info-Element
// Typewriter-Effekt für das #info-Element
// Function to animate text with ScrollTrigger
//animate text
//scene1.to("#info", { y: 5 * speed }, 0);
// Optimierte Animation mit GSAP


/*   Bird   */
gsap.fromTo(
    "#bird",
    { opacity: 1 },
    {
        y: -250,
        x: 800,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".scrollElement",
            start: "15% top",
            end: "60% 100%",
            scrub: 4,
            onEnter: function () {
                gsap.to("#bird", { scaleX: 1, rotation: 0 });
            },
            onLeave: function () {
                gsap.to("#bird", { scaleX: -1, rotation: -15 });
            }
        }
    }
);

/* Clouds  */
let clouds = gsap.timeline();
ScrollTrigger.create({
    animation: clouds,
    trigger: ".scrollElement",
    start: "top top",
    end: "70% 100%",
    scrub: 1
});

clouds.to("#cloud1", { x: 500 }, 0);
clouds.to("#cloud2", { x: 1000 }, 0);
clouds.to("#cloud3", { x: -1000 }, 0);
clouds.to("#cloud4", { x: -700, y: 25 }, 0);

/* Sun motion Animation  */
let sun = gsap.timeline();
ScrollTrigger.create({
    animation: sun,
    trigger: ".scrollElement",
    start: "1% top",
    end: "2150 100%",
    scrub: 2
    //markers: true,
    //preventOverlaps: true, //if true, it will affect all preceding ScrollTriggers (you can use for example 'scrollTrigger1')
    //fastScrollEnd: true,   //(default 2500px/s)
});

//sun motion
sun.fromTo("#bg_grad", { attr: { cy: "-50" } }, { attr: { cy: "330" } }, 0);
//bg change
//sun.to("#sun", { attr: { offset: "0.15" } }, 0);
sun.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.15" } }, 0);
sun.to("#bg_grad stop:nth-child(3)", { attr: { offset: "0.18" } }, 0);
sun.to("#bg_grad stop:nth-child(4)", { attr: { offset: "0.25" } }, 0);
sun.to("#bg_grad stop:nth-child(5)", { attr: { offset: "0.46" } }, 0);
sun.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#FF9171" } }, 0);

/*   SCENE 2  */
let scene2 = gsap.timeline();
ScrollTrigger.create({
    animation: scene2,
    trigger: ".scrollElement",
    start: "15% top",
    end: "40% 100%",
    scrub: 3
});

scene2.fromTo("#h2-1", { y: 500, opacity: 0 }, { y: 0, opacity: 1 }, 0);
scene2.fromTo("#h2-2", { y: 500 }, { y: 0 }, 0.1);
scene2.fromTo("#h2-3", { y: 700 }, { y: 0 }, 0.1);
scene2.fromTo("#h2-4", { y: 700 }, { y: 0 }, 0.2);
scene2.fromTo("#h2-5", { y: 800 }, { y: 0 }, 0.3);
scene2.fromTo("#h2-6", { y: 900 }, { y: 0 }, 0.3);



/* Sun increase */
let sun2 = gsap.timeline();
ScrollTrigger.create({
    animation: sun2,
    trigger: ".scrollElement",
    start: "2000 top",
    end: "5000 100%",
    scrub: 2
});

sun2.to("#sun", { attr: { offset: "1.4" } }, 0);
sun2.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.7" } }, 0);
sun2.to("#sun", { attr: { "stop-color": "#ffff00" } }, 0);
sun2.to("#lg4 stop:nth-child(1)", { attr: { "stop-color": "#623951" } }, 0);
sun2.to("#lg4 stop:nth-child(2)", { attr: { "stop-color": "#261F36" } }, 0);
sun2.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#45224A" } }, 0);

// Make the sun small again at the end
sun2.to("#sun", { attr: { offset: "0.1" } }, 0.5); // Decrease offset to make sun smaller
sun2.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.2" } }, 0.5); // Adjust background gradient
sun2.to("#sun", { attr: { "stop-color": "#FDB813" } }, 0.5); // Change color back to original


// New final scene with upward movement and fade-out
let finalScene = gsap.timeline();
ScrollTrigger.create({
    animation: finalScene,
    trigger: ".scrollElement",
    start: "85% top",
    end: "bottom bottom",
    scrub: 1,
    onEnter: () => {
        gsap.to("body", { backgroundColor: "#00a86b", duration: 1 });
    }
});

// Move all SVG elements up and fade them out
finalScene.to("svg > *", { 
    y: "-100%", // Moves all elements completely out of view upward
    opacity: 0, // Fades out all elements
    duration: 2, // Slightly increased duration for smoother animation
    stagger: 0.05, // Adds a cascading delay between each element
    ease: "power2.inOut" // Easing for smoother motion
}, 0);







