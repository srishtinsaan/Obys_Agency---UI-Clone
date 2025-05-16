function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
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

function cursorAnimation(){
    const moveCursorX = gsap.quickTo("#cursor", "left", { duration: 0.2, ease: "power3" });
const moveCursorY = gsap.quickTo("#cursor", "top", { duration: 0.2, ease: "power3" });

document.addEventListener("mousemove", (e) => {
    moveCursorX(e.clientX);
    moveCursorY(e.clientY);
});
}

function loadingAnimation(){
    let tl = gsap.timeline()

tl.from(`.line h1`, {
    // x:100, .. left me 100 shift(khiskega)
    y : 100, // upar 100 shift
    stagger : 0.3, // ek ek line ek k baaad ke iss speed m show hogi.. will work only after providing x or y
    duration: 0.8,
    delay : 0.5
})

tl.from(`#line1-part1, .line h2`,{
    opacity:0,
    onstart : function(){
        let no = document.querySelector(`#line1-part1 h5`);
        let count = 1;
        setInterval(function(){
            if(count==101){
                return
            }
            no.textContent = count;
            count++;
        },20)
    }
})


// t1.to(`.line h2`,{
//     animationName: `anime`,
//     // opacity: 0,
//     // duration:2.1,
//     // delay:2.2,
// })


tl.to(`#loader`,{
    opacity: 0,
    duration:0.7,
    delay:2.2,
})


tl.from("#page1",{
    opacity:0,
    duration:1.2,
    y: 1600,
    ease: "power4"
})

tl.to(`#loader`,{
    display:`none`
})

tl.from(`#hero1 h1, #hero2 h1, #hero3 h2, #hero3 h3, #hero4 h1`,{
    y:120,
    stagger:0.1
})

tl.from(`#nav`,{
    opacity:0,
})

}

function magnetAnimation(){
    Shery.makeMagnet("#nav-part2 h4" /* Element to target.*/, {
  //Parameters are optional.
//   ease: "cubic-bezier(0.23, 1, 0.320, 1)",
//   duration: 1,
    });
}

function cursor2_Animation(){
    const moveCursorX = gsap.quickTo("#cursor2", "left", { duration: 0.2, ease: "power3" });
    const moveCursorY = gsap.quickTo("#cursor2", "top", { duration: 0.2, ease: "power3" });
    let container = document.querySelector(`video1`)
    container.addEventListener("mousemove", (e) => {
    moveCursorX(e.clientX);
    moveCursorY(e.clientY);
});
}

function playvideo(){
    let icon = document.querySelector(`#cursor2 i`);
    let video = document.querySelector(`#video1 video`);
    let overlayimage = document.querySelector(`#video1 img`)
    icon.addEventListener( `onclick`, function(){
        overlayimage.style.opacity = "0"; 
        video.play()
    })
}

loco()
loadingAnimation()
playvideo()
cursorAnimation()
cursorAnimation()
magnetAnimation()


