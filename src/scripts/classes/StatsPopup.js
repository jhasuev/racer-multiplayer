export default class StatsPopup {
  constructor(scene, stats) {
    this.scene = scene
    this.stats = stats

    this.create()
  }

  get text() {
    return [
      `Time: ${this.stats.time.toFixed(2)}`,
      `Best Lap: ${this.stats.timeBestLap.toFixed(2)}`,
    ].join("\n")
  }

  create() {
    this.createWindow()
    this.createText()
    this.createEvent()
  }

  createWindow() {
    const style = {
      width: 800,
      height: 600,
    }

   this.popup = this.scene.add.graphics()
    .setScrollFactor(0)
    .fillStyle(0x000, .5)
    .fillRect(
      (this.scene.game.config.width - style.width)  / 2,
      (this.scene.game.config.height - style.height) / 2,
      style.width,
      style.height
    )
  }

  createText() {
    const styles = {
      font: "22px Arial",
      lineSpacing: 25,
      align: "center",
      fill: "#FAFADA",
    }

    const x = this.scene.game.config.width / 2
    const centerY = this.scene.cameras.main.centerY

    this.textTitle = this.scene.add.text(x, centerY - 190, "Level Completed!", {
      ...styles,
      font: "46px Arial",
    })
      .setScrollFactor(0)
      .setOrigin(.5)

    this.textInfo = this.scene.add.text(x, centerY, this.text, styles)
      .setScrollFactor(0)
      .setOrigin(.5)

    this.textTapText = this.scene.add.text(x, centerY + 190, "Tap To Continue", styles)
      .setScrollFactor(0)
      .setOrigin(.5)
  }

  createEvent() {
    this.scene.input.once("pointerdown", () => {
      this.scene.scene.restart()
    })
  }
}
