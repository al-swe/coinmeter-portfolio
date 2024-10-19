const tl = gsap.timeline();

tl.from("body", {
    opacity: 0,
    duration: 2,
    ease: "power1.in"
});

tl.from("#lottie", {
    opacity: 0,
    duration: 3,
    x: 100,
    ease: "power1.in"
}, "-=1.5");

tl.from(".hero-text", {
    opacity: 0,
    duration: 3,
    ease: "power1.in"
}, "-=1.5");

tl.from("#coins", {
    opacity: 0,
    duration: 2,
    y: 100,
    ease: "bounce.out"
}, "-=1.5");
