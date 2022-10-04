import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import Experience from "../Experience.js";
import GSAP from "gsap";
export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;


      this.resources = this.experience.resources;
     this.room = this.resources.items.room;
  this.actualRoom = this.room.scene;
 

    this.setFloor();
   this.setCircles();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.47;
    this.plane.receiveShadow = true;





    // const width = 0.4;
    // const height = 0.7;
    // const intensity = 0.4;
    // const rectLight = new THREE.RectAreaLight(
    //   0xffffff,
    //   intensity,
    //   width,
    //   height
    // );
    // rectLight.position.set(8.76494, 0.5, -4.88473);
    // rectLight.rotation.x = -Math.PI / 2;
    // rectLight.rotation.z = Math.PI / 4;
    // this.actualRoom.add(rectLight);

    
  }
 setCircles(){
  const geometry = new THREE.CircleGeometry(5, 64);
  const material = new THREE.MeshStandardMaterial({ color: 0xe5a1aa });
  const material2 = new THREE.MeshStandardMaterial({ color: 0x8395CD });
  const material3 = new THREE.MeshStandardMaterial({ color: 0x7ad0ac });
  this.circleFirst = new THREE.Mesh(geometry, material);
  this.circleSecond = new THREE.Mesh(geometry, material2);
  this.circleThird = new THREE.Mesh(geometry, material3);
 
  this.circleFirst.position.y = -0.41;
  this.circleSecond.position.y = -0.40;
  this.circleSecond.position.x = 2;
  this.circleThird.position.y = -0.39;

  this.circleFirst.scale.set(0, 0, 0);
  this.circleSecond.scale.set(0, 0, 0);
  this.circleThird.scale.set(0, 0, 0);

   this.circleFirst.rotation.x =
     this.circleSecond.rotation.x =
     this.circleThird.rotation.x =
       -Math.PI / 2;

   this.circleFirst.receiveShadow =
     this.circleSecond.receiveShadow =
     this.circleThird.receiveShadow =
       true;
  this.scene.add(this.circleFirst);
  this.scene.add(this.circleSecond);
  this.scene.add(this.circleThird);
 }
  resize() {}

  update() {
 
  }
}
