import LoadingBar from "../classes/LoadingBar"
import tilesetPng from "../../assets/tileset.png"
import tilesetJson from "../../assets/tilemap.json"

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload")
  }

  preload() {
    this.add.sprite(0, 0, "bg").setOrigin(0)
    this.LoadingBar = new LoadingBar(this)

    this.load.spritesheet("tileset", tilesetPng, { frameWidth: 64, frameHeight: 64 })
    this.load.tilemapTiledJSON("tilemap", tilesetJson)
  }

  create() {
    this.scene.start("Game")
  }
}