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
    delay:4,
    duration:3,
    y: 400,
    ease: "elastic.out(1, 0.3)"
})


tl.to(`#loader`,{
    delay:0.2,
    display:`none`
})


