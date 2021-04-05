import Map from "../classes/Map"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game")
  }

  preload() {
    console.log("GameScene preload()");
  }

  create() {
    console.log("GameScene create()");
    this.map = new Map(this)
  }
}