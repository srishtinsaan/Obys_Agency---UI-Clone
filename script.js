function cursorAnimation(){
    document.addEventListener("mousemove",function(dets){
    gsap.to(`#cursor`,{
        left: dets.x,
        top: dets.y
    })
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


// t1.to(`.line h2`,{
//     animationName: `anime`,
//     // opacity: 0,
//     // duration:2.1,
//     // delay:2.2,
// })


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

tl.from(`#hero1 h1, #hero2 h1, #hero3 h2,#hero4 h1`,{
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


loadingAnimation()
cursorAnimation()
magnetAnimation()


