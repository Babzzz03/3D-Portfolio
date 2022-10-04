import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    this.room.children.forEach((child) => {
      if (child.type === 'RectAreaLight' ) {
        this.rectLight = child;
      }
    })
    this.circleFirst = this.experience.world.floor.circleFirst;
    this.circleSecond = this.experience.world.floor.circleSecond;
    this.circleThird = this.experience.world.floor.circleThird;
    GSAP.registerPlugin(ScrollTrigger);
    this.setSmoothScroll();
    this.setScrollTrigger();

    // this.progress = 0;
    // this.dummyCurve = new THREE.Vector3(0, 0, 0);
    // this.lerp = {
    //   current: 0,
    //   target: 0,
    //   ease: 0.1,
    // };
    //   this.position = new THREE.Vector3(0, 0, 0);
    //   this.lookAtPosition = new THREE.Vector3(0, 0, 0);

    //   this.directionalVector = new THREE.Vector3(0, 0, 0);
    //   this.staticVector = new THREE.Vector3(0, 1, 0);
    //   this.crossVector = new THREE.Vector3(0, 0, 0);
    // this.setPath();
    // this.onWheel();
  }
 setupASScroll() {
  // https://github.com/ashthornton/asscroll
  const asscroll = new ASScroll({
    ease: 0.3,
    disableRaf: true });


  GSAP.ticker.add(asscroll.update);

  ScrollTrigger.defaults({
    scroller: asscroll.containerElement });


  ScrollTrigger.scrollerProxy(asscroll.containerElement, {
    scrollTop(value) {
      if (arguments.length) {
        asscroll.currentPos = value;
        return;
      }
      return asscroll.currentPos;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    fixedMarkers: true });


  asscroll.on("update", ScrollTrigger.update);
  ScrollTrigger.addEventListener("refresh", asscroll.resize);

  requestAnimationFrame(() => {
    asscroll.enable({
      newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });

  });
  return asscroll;
}


setSmoothScroll(){
this.asscroll = this.setupASScroll(); 
}
  setScrollTrigger() {
    ScrollTrigger.matchMedia({
	

  "(min-width: 969px)": () => {

   this.room.scale.set(0.11, 0.11, 0.11);
   this.rectLight.width = 0.5;
   this.rectLight.height = 0.7;
   this.room.position.set(0,0,0)
   this.firstMoveTimeline = new GSAP.timeline({
     scrollTrigger: {
       trigger: ".first-move",
       start: "top top",
       end: "bottom bottom",
       scrub: 0.6,
       invalidateOnRefresh: true,
     },
   });
   this.firstMoveTimeline.to(this.room.position, {
    x: () => {
      return this.sizes.width * 0.0024;
    },
   });

    this.secondMoveTimeline = new GSAP.timeline({
      scrollTrigger: {
        trigger: ".second-move",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    }).to(this.room.position, {
      x: () => {
        return 1;
      },
      z: () => {
        return this.sizes.height * 0.0032;
      },
    }, 'same').to(
         this.room.scale,
         {
           x: 0.4,
           y: 0.4,
           z: 0.4,
         },
         "same"
       ).to(
          this.rectLight,
          {
            width: 0.5 * 4,
            height: 0.7 * 4,
          },
          "same"
        );

        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.camera.orthographicCamera.position, {
          y: 0.5,
          x: -4.1,
        });


  },



  "(max-width: 968px)": () => {


   this.room.scale.set(0.07, 0.07, 0.07);
   this.rectLight.width = 0.3;
    this.rectLight.height = 0.3;
   this.firstMoveTimeline = new GSAP.timeline({
     scrollTrigger: {
       trigger: ".first-move",
       start: "top top",
       end: "bottom bottom",
       scrub: 0.6,
       invalidateOnRefresh: true,
     },
   }).to(this.room.scale, {
    x: 0.1,
    y: 0.1,
    z: 0.1
   });





 this.secondMoveTimeline = new GSAP.timeline({
   scrollTrigger: {
     trigger: ".second-move",
     start: "top top",
     end: "bottom bottom",
     scrub: 0.6,
     invalidateOnRefresh: true,
   },
 })
   .to(
     this.room.scale,
     {
       x: 0.25,
       y: 0.25,
       z: 0.25,
     },
     "same"
   )
   .to(
     this.rectLight,
     {
       width: 0.3 * 3.4,
       height: 0.4 * 3.4,
     },
     "same"
   )
   .to(
     this.room.position,
     {
       x: 1.5,
     },
     "same"
   );

        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.room.position, {
          z: -4.5
        })
  },


	

  "all": () => {


     this.sections = document.querySelectorAll(".section");
     this.sections.forEach((section) => {
      this.progressWrapper =
      section.querySelector(".progress-wrapper");
      this.progressBar = section.querySelector(".progress-bar");
     if(section.classList.contains("right")){
      GSAP.to(section, {
        borderTopLeftRadius: 10,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top top",
          scrub: 0.6,
        }
      } )
      GSAP.to(section, {
        borderBottomLeftRadius: 700,
        scrollTrigger: {
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 0.6,
        }
      } 
        )
     }else{
       GSAP.to(section, {
         borderTopRightRadius: 10,
         scrollTrigger: {
           trigger: section,
           start: "top bottom",
           end: "top top",
           scrub: 0.6,
         },
       });
       GSAP.to(section, {
         borderBottomRightRadius: 700,
         scrollTrigger: {
           trigger: section,
           start: "bottom bottom",
           end: "bottom top",
           scrub: 0.6,
         },
       });
     } 
     GSAP.from(this.progressBar, {
      scaleY: 0,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        pin: this.progressWrapper,
        pinSpacing: false 
      }
     })
    });
      
   
// circle animations

   this.room.position.set(0, 0, 0);
   this.firstMoveTimeline = new GSAP.timeline({
     scrollTrigger: {
       trigger: ".first-move",
       start: "top top",
       end: "bottom bottom",
       scrub: 0.6,
       invalidateOnRefresh: true,
     },
   }).to(this.circleFirst.scale, {
    x: 3,
    y: 3,
    z: 3,
   })
  

   this.secondMoveTimeline = new GSAP.timeline({
     scrollTrigger: {
       trigger: ".second-move",
       start: "top top",
       end: "bottom bottom",
       scrub: 0.6,
       invalidateOnRefresh: true,
     },
   }).to(this.circleSecond.scale, {
     x: 3,
     y: 3,
     z: 3,
   }, 'same'
   ).to(this.room.position, {
    y: 0.7,
   }, 'same')
    

   this.thirdMoveTimeline = new GSAP.timeline({
     scrollTrigger: {
       trigger: ".third-move",
       start: "top top",
       end: "bottom bottom",
       scrub: 0.6,
       invalidateOnRefresh: true,
     },
   })
     .to(
       this.circleThird.scale,
       {
         x: 3,
         y: 3,
         z: 3,
       },
       "same"
     )
     .to(
       this.room.position,
       {
         y: 0.7,
       },
       "same"
     );
   









    this.secondPartTimeline = new GSAP.timeline({
      scrollTrigger: {
        trigger: ".third-move",
        start: "center center",
     
      },
    });
    console.log(this.room.children);
    this.room.children.forEach(child => {
      if(child.name === "mini_floor") {
       this.first = GSAP.to(child.position, {
          x: 8.23508,
          z:  -8.25465,
          duration: 0.3
        })
      }
       if (child.name === "mail_box") {
        this.second = GSAP.to(child.scale, {
          x: 0.7,
          y: 1,
          z: 0.7, ease: "back.out(2)",
          duration: 0.3,
        });
       }
       if (child.name === "lamp") {
        this.third = GSAP.to(child.scale, {
          x: 0.004,
          y: 0.004,
          z: 0.004, ease: "back.out(2)",
          duration: 0.3,
        });
       }
       if (child.name === "floorfirst") {
       this.fourth = GSAP.to(child.scale, {
         x: 0.7,
         y: 1,
         z: 1.4, ease: "back.out(2)",
         duration: 0.3,
       });
       }
       if (child.name === "floorsecond") {
        this.fifth = GSAP.to(child.scale, {
          x: 0.7,
          y: 1,
          z: 1.4, ease: "back.out(2)",
          duration: 0.3,
        });
       }
       if (child.name === "floorthird") {
        this.sixth = GSAP.to(child.scale, {
          x: 0.7,
          y: 1,
          z: 1.4, ease: "back.out(2)",
          duration: 0.3,
        });
       }
       if (child.name === "flowerone") {
        console.log(child.name, child.scale);
        this.seventh = GSAP.to(child.scale, {
          x: 0.0003222080751787871,
          y: 0.0003222080751787871,
          z: 0.0003222080751787871,
          ease: "back.out(2)",
          duration: 0.3,
        });
       }
       if (child.name === "flowertwo") {
  console.log(child.name, child.scale);
        this.eight = GSAP.to(child.scale, {
          x: 0.3,
          y:0.3,
          z: 0.3, ease: "back.out(2)",
          duration: 0.3,
        });
       }
       if (child.name === "dirt") {
        this.ninth = GSAP.to(child.scale, {
          x: 1.7,
          y: 1,
          z: 0.8, ease: "back.out(2)",
          duration: 0.3,
        });
       }
    });
     this.secondPartTimeline.add(this.first);
     this.secondPartTimeline.add(this.second, '-=0.2');
     this.secondPartTimeline.add(this.third, '-=0.2');
     this.secondPartTimeline.add(this.fourth, '-=0.2');
     this.secondPartTimeline.add(this.fifth, '-=0.2');
     this.secondPartTimeline.add(this.sixth);
     this.secondPartTimeline.add(this.seventh);
     this.secondPartTimeline.add(this.eight, '-=0.1');
     this.secondPartTimeline.add(this.ninth, "-=0.2");
  },
	
}); 



    // this.timeline = new GSAP.timeline();
    // this.timeline.to(this.room.position, {
    //   x: () => {
    //     return this.sizes.width * 0.0019;
    //   },
    //   scrollTrigger: {
    //     trigger: ".first-move",
    //     start: "top top",
    //     end: "bottom bottom",
    //     scrub: 0.6,
    //     invalidateOnRefresh: true,
    //   },
    // });
  }

  //   setPath() {
  //     this.curve = new THREE.CatmullRomCurve3(
  //       [
  //         new THREE.Vector3(-5, 0, 0),
  //         new THREE.Vector3(0, 0, -5),
  //         new THREE.Vector3(5, 0, 0),
  //         new THREE.Vector3(0, 0, 5),

  //       ],
  //       true
  //     );

  //      const points = this.curve.getPoints(50);
  //      const geometry = new THREE.BufferGeometry().setFromPoints(points);

  //      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  //      // Create the final object to add to the scene
  //      const curveObject = new THREE.Line(geometry, material);
  //      this.scene.add(curveObject);
  //   }
  //   onWheel() {
  //     window.addEventListener('wheel', (e) => {
  //        if (e.deltaY > 0){
  //         this.lerp.target += 0.01;
  //         this.back = false;
  //        } else {
  //         this.lerp.target -= 0.01;
  //          this.back = true;
  //        }
  //     })
  //   }
  resize() {}

  update() {
    // if(this.back){
    //     this.lerp.target -= 0.001;
    // } else {
    //      this.lerp.target += 0.001;
    // }
    //  this.lerp.target = GSAP.utils.clamp(
    //    0,
    //    1,
    //    this.lerp.target
    //  );
    // this.lerp.current =    GSAP.utils.clamp(0, 1, this.lerp.current);
    // //  this.progress -= 0.01;
    // this.curve.getPointAt(this.lerp.current, this.position);
    //     this.curve.getPointAt(this.lerp.current+0.00001, this.lookAtPosition);
    //  this.camera.orthographicCamera.position.copy(this.position);
    //  this.camera.orthographicCamera.lookAt(this.lookAtPosition);
    //  this.curve.getPointAt(this.lerp.current % 1, this.position );
    //  this.camera.orthographicCamera.position.copy(this.position);
    //  this.directionalVector.subVectors( this.curve.getPointAt((this.lerp.current%1) + 0.000001), this.position);
    //  this.directionalVector.normalize();
    //  this.crossVector.crossVectors(
    //     this.directionalVector,
    //     this.staticVector,
    //  );
    //  this.crossVector.multiplyScaler(100000);
    //  this.camera.orthographicCamera.lookAt(this.crossVector);
  }
}
