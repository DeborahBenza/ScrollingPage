gsap.registerPlugin(ScrollTrigger)

const bgvideo = document.querySelector('#bgvideo')

bgvideo.pause();
bgvideo.currentTime = 0;

let sections = gsap.utils.toArry('.step');
sections.forEach((step, i) => {
    ScrollTrigger.create({
        trigger: step,
        start: 'bottom bottom',
        end: '+=10000',
        pin: true,
        anticipatePin: 1,
    });

    gsap.fromTo(bgvideo, { currentTime: 3 * i }, {
        ScrollTrigger: {
            trigger: step,
            scrub: 2,
            start: 'top bottom',
            end: 'bottom bottom',
            scrambleText: true,
        }

    })

})
