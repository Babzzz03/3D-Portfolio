import * as THREE from "three";

import Experience from "../Experience.js";

import Room from "./Room.js";
import Environment from "./Environment.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      this.enviroment = new Environment();
        this.room = new Room();
    })
  
  }



  resize() {

  }

  update() {

  }
}
