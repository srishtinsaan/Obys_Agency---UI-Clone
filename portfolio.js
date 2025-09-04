let locoScroll;
function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

 locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function loadingAnimation(){

let tl = gsap.timeline()

tl.from(`#loader h1`, {
    duration: 3,
    opacity: 1,
    ease: "power2"
})

tl.to(`#loader`,{
    ease: "power4",
    display:`none`,
    // delay: 1,
    duration: 1.3,
})

// tl.to(`#loader`,{
//     delay: 1,
//     display:`none`
// })

tl.from("#page1",{
    opacity:0,
    duration:0.2,
    y: 1600,
    ease: "power2",
    // delay:0.2
})
tl.from('.progress',{
    opacity:0,
})

tl.from(`#nav`,{
    opacity:0,
})




}
function magnetAnimation(){
    Shery.makeMagnet("#nav-part2 a" /* Element to target.*/, {

    });
}

function progressBar(){

    const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });

  const bar = document.querySelector('.progress');

  scroller.on('scroll', ({ limit, scroll }) => {
  const progress = (scroll.y / limit * 100).toFixed(2);
  bar.style.width = `${progress}%`;
  })
  
    
}


loco()
loadingAnimation()
magnetAnimation()
progressBar()
