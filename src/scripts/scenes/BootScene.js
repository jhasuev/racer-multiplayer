import bgImg from "../../assets/bg.png"
export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot")
  }

  preload() {
    this.load.image("bg", bgImg)
  }

  create() {
    this.scene.start("Preload")
  }
}