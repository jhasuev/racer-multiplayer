export default class StatsPanel {
  constructor(scene, stats) {
    this.scene = scene
    this.stats = stats

    this.create()
  }

  get text() {
    return [
      `Laps: ${this.stats.lap}/${this.stats.laps}`,
      `Time: ${this.stats.time.toFixed(2)}`,
      `Lap time: ${this.stats.timeLap.toFixed(2)}`,
      `Best lap: ${this.stats.timeBestLap.toFixed(2)}`,
    ].join("\n")
  }

  create() {
    const styles = {
      fontSize: "20px",
      color: "#000",
      lineSpacing: 15,
      shadow: {
        color: '#fff',
        blur: 5,
        fill: true,
      },
    }

    this.textInfo = this.scene.add.text(15, 15, this.text, styles).setScrollFactor(0)
  }

  render() {
    this.textInfo.setText(this.text)
  }
}