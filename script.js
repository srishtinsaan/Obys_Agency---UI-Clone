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


let videoContainer = document.querySelector(`#video-container`);
let video = document.querySelector(`#video-container video`);
let videoCursor = document.querySelector(`#video-cursor`);

videoContainer.addEventListener('mouseenter', function(){
    videoContainer.addEventListener('mousemove',function(dets){
        gsap.to(`#cursor`,{
            opacity:0
        })
        gsap.to(`#video-cursor`, {
            left: dets.x - 600,
            y:dets.y - 300
        })
    })
})

videoContainer.addEventListener('mouseleave',function(){
    gsap.to(`#cursor`,{
        opacity:1
    })
    gsap.to(`#video-cursor`,{
        top:'-15%',
        left: '70%'
    })
})

let flag = 0;

videoContainer.addEventListener('click', function(){
    if(flag == 0){
        video.play();
        video.style.opacity = 1;

        videoCursor.innerHTML = `<i class="ri-pause-mini-line"></i>`

        gsap.to(`#video-cursor`,{
            scale:0.8
        })
        flag = 1;
    }else{
        video.pause();
        video.style.opacity = 0;

        videoCursor.innerHTML = `<i class="ri-play-mini-line"></i>`

        gsap.to(`#video-cursor`,{
            scale:1
        })
        flag = 0;
    }
})
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


tl.to(`#loader`,{
    opacity: 0,
    duration:0.7,
    // delay:2.2,
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

tl.from(`#hero1` , {
    opacity:0,
},"-=1.2") // timeline me elem ko 1.2 pehle chalaega.yani hero1 ko pehle chalaega then baki sabhi ko

}

function magnetAnimation(){
    Shery.makeMagnet("#nav-part2 h4" /* Element to target.*/, {
  //Parameters are optional.
//   ease: "cubic-bezier(0.23, 1, 0.320, 1)",
//   duration: 1,
    });
}

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    gooey: true,
    // debug:true,
    config: {"a":{"value":0.46,"range":[0,30]},"b":{"value":-0.88,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.657904875198506},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.21,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.4,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.32,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
    
  });
}

function flagAnimation(){
    document.addEventListener('mousemove', function(dets){
        gsap.to(`#flag`,{
            x:dets.x,
            y: dets.y
        })
    })
    document.querySelector(`#hero3 h2`).addEventListener(`mouseenter`, function(){
    gsap.to(`#flag`,{
        opacity:1
    })
    })

document.querySelector(`#hero3 h2`).addEventListener(`mouseleave`, function(){
    gsap.to(`#flag`,{
        opacity:0
    })
})


}

function footerAnimation() {
    let clutter1 = ""
    let clutter2 = ""
    let footerText = document.querySelector("#footer-text")
    let h1 = document.querySelector("#footer h1")
    let h2 = document.querySelector("#footer h2")

    h1.textContent.split("").forEach(function (elem) {
        clutter1 += `<span>${elem}</span>`
    })
    h1.innerHTML = clutter1

    h2.textContent.split("").forEach(function (elem) {
        clutter2 += `<span>${elem}</span>`
    })
    h2.innerHTML = clutter2


    footerText.addEventListener("mouseenter", function () {
        gsap.to("#footer h1 span", {
            opacity: 0,
            stagger: 0.05
        })
        gsap.to("#footer h2 span", {
            delay: 0.35,
            opacity: 1,
            stagger: 0.1
        })
    })
    footerText.addEventListener("mouseleave", function () {
        gsap.to("#footer h1 span", {
            opacity: 1,
            stagger: 0.1,
            delay: 0.35,

        })
        gsap.to("#footer h2 span", {
            opacity: 0,
            stagger: 0.05
    })
  })
}


loco()
loadingAnimation()
cursorAnimation()
flagAnimation()
magnetAnimation()
sheryAnimation()
footerAnimation()

