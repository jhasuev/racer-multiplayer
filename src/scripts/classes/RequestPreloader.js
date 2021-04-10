import Phaser from "phaser"

export default class RequestPreloader {
  constructor(scene) {
    this.scene = scene
    this.create()
    this.scene.events.on("update", this.update, this)
  }

  create() {
    this.createWindow()
    this.createText()
    this.createCircle()
  }

  createWindow() {
    const style = {
      width: 800,
      height: 600,
    }

    this.popup = this.scene.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0x000, .8)
      .fillRect(
        (this.scene.game.config.width - style.width) / 2,
        (this.scene.game.config.height - style.height) / 2,
        style.width,
        style.height
      )
  }

  createText() {
    const styles = {
      font: "27px Arial",
      align: "center",
      fill: "#FAFADA",
    }

    const x = this.scene.game.config.width / 2
    const y = this.scene.game.config.height / 2 - 190

    this.textTitle = this.scene.add.text(x, y, "Looking for an opponent...", styles)
      .setScrollFactor(0)
      .setOrigin(.5)
  }

  createCircle() {
    const style = {
      width: 50,
      height: 5,
    }

    this.preloader = this.scene.add.graphics()
      .fillStyle(0xFFFFFF)
      .fillRect(
        0,
        0,
        style.width,
        style.height
      )
    this.preloader.setX(this.scene.game.config.width / 2)
    this.preloader.setY(this.scene.game.config.height / 2)
  }

  update() {
    this.preloader.angle += 3
  }
}
