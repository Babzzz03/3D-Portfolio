import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
     this.time = this.experience.time;
    this.room = this.resources.items.room;
     this.actualRoom = this.room.scene;
     this.roomChildren = {};
   this.lerp = {
     current: 0,
     target: 0,
     ease: 0.1,
   };

 this.setModel();
   this.setAnimation(); 
   this.onMouseMove();  
  }
  setModel() {

    console.log(this.actualRoom.children);
    this.actualRoom.children.forEach(child => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        })
      }

      if (child.name === "aquarium"){
        child.children[0].material = new THREE.MeshPhysicalMaterial();
        child.children[0].material.roughness = 0;
        child.children[0].material.color.set(0x549dd2);
        child.children[0].material.ior = 3;
        child.children[0].material.transmission = 1;
        child.children[0].material.opacity = 1;
      }
      if (child.name === 'computer') {
        child.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        })
      }
       if (child.name === 'mini_floor'){
         child.position.x = 2.85493;
         child.position.z = 3.02681;
       }
        if (
          child.name === "mail_box" ||
          child.name === "lamp" ||
          child.name === "floorfirst" ||
          child.name === "floorsecond" ||
          child.name === "floorthird" ||
          child.name === "dirt" ||
          
          child.name === "flowertwo"
        ) {
  
          child.scale.set(0, 0, 0);

        }
     if(child.name === "flowerone"){
     
    
       child.scale.set(
         0.000,
         0.000,
         0.000
       ); 
     }



// set the scale on the children 

            // child.scale.set(0, 0, 0); 
            // if (child.name === "Cube") {
            //   //  child.scale.set(1.7, 1.7, 1.7);
            //   child.position.set(0, -1.9, 0);
            //   child.rotation.y = Math.PI / 4;
            // }
            //  this.roomChildren[child.name.toLowerCase()] = child;
    });
     
const width = 0.5;
const height = 0.7;
const intensity = 1.7;
const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
rectLight.position.set(-6.01108, 7, 5.47202);
rectLight.rotation.x = -Math.PI / 2;
rectLight.rotation.z = Math.PI / 4;
this.actualRoom.add(rectLight);
this.roomChildren["rectLight"] = rectLight;
// const rectLightHelper = new RectAreaLightHelper(rectLight);
// rectLight.add(rectLightHelper);


    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);

  }
  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    //this.room.animations[8]
  
    this.swim = this.mixer.clipAction(this.room.animations[2]);

    this.swim.play();
  }
  onMouseMove(){
   window.addEventListener("mousemove", (e) => {
    
    this.rotation =
    ((e.clientX - window.innerWidth/2 ) * 2) / window.innerWidth;
  this.lerp.target = this.rotation * 0.1;
   })
  }
  resize() {}

  update() {
      this.lerp.current = GSAP.utils.interpolate(
        this.lerp.current,
        this.lerp.target,
        this.lerp.ease
      );
      this.actualRoom.rotation.y = this.actualRoom.rotation.y =
        Math.PI + this.lerp.current;
    this.mixer.update(this.time.delta * 0.0004)
  }
}
