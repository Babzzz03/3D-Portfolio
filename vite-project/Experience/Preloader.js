import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";


export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;

    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;
    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });
    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }
  setAssets() {
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
    console.log(this.roomChildren);
  }
  firstIntro() {
    return new Promise ((resolve) => {
          this.timeline = new GSAP.timeline();
         if (this.device === "desktop") {
      this.timeline
        .to(this.roomChildren.cube.scale, {
          x: 1.7,
          y: 1.7,
          z: 1.7,
          ease: "back.out(2.5)",
          duration: 0.7,
        })
        .to(this.room.position, {
          x: -1.7,
          ease: "power1.out",
          duration: 0.7,
          onComplete: resolve,
        });
    } else {
      this.timeline
        .to(this.roomChildren.cube.scale, {
          x: 1.7,
          y: 1.7,
          z: 1.7,
          ease: "back.out(2.5)",
          duration: 0.7,
        })
        .to(this.room.position, {
          z: -1.7,
          ease: "power1.out",
          duration: 0.7,
          onComplete: resolve,
        });
    }
    } )
    
  }

 
  

  secondIntro() {

       return new Promise ((resolve) => {
    this.secondTimeline = new GSAP.timeline();
    if (this.device === "desktop") {
        this.secondTimeline
          .to(
            this.room.position,
            {
              x: 0,
              y: 0,
              z: 0,
              ease: "power1.out",
            },
            "same"
          )
          .to(
            this.roomChildren.cube.rotation,
            {
              y: 2 * Math.PI + Math.PI / 4,
            },
            "same"
          )
          .to(
            this.roomChildren.cube.scale,
            {
              x: 11,
              y: 11,
              z: 11,
            },
            "same"
          )
          .to(
            this.camera.orthographicCamera.position,
            {
              y: 6.5,
            },
            "same"
          )
          .to(
            this.roomChildren.cube.position,
            {
              x: 0.175162,
              y: 44.74659,
              z: -11.6269,
            },
            "same"
          )
          .set(this.roomChildren.body.scale, {
            x: 0.4,
            y: 0.4,
            z: 0.4,
          })
          .to(this.roomChildren.cube.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(this.roomChildren.aquarium.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.clock.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.shelves.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.floor_items.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.desks.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.table_stuff.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.computer.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.chair.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          })
          .to(this.roomChildren.chair.rotation, {
            y: 4 * Math.PI + Math.PI / 4,
            ease: "power2.out",
            duration: 0.5,
          });
    } else {
        this.secondTimeline.to(this.room.position, {
          x:0,
          y:0,
          z: 0,
          ease: "power1.out",
          duration: 0.7,
        })
      
    }
       });
}

  onScroll(e) {
    if (e.deltaY > 0) {
      window.removeEventListener("wheel", this.scrollOnceEvent);
      this.playSecondIntro();
    }
  }
  async playIntro() {
   await this.firstIntro();
    this.scrollOnceEvent = this.onScroll.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
  }
  async playSecondIntro() {
    await this.secondIntro();
  }
}
