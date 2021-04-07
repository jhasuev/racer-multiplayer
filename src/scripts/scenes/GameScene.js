import Map from "../classes/Map"
import Player from "../classes/Player"
const LAPS = 3

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game")
  }

  init() {
    this.setEvents()
  }

  preload() {
    console.log("GameScene preload()");
  }

  create() {
    console.log("GameScene create()");
    this.map = new Map(this)
    this.player = new Player(this, this.map)

    this.cameras.main.setBounds(0, 0, this.map.tilemap.widthInPixels, this.map.tilemap.heightInPixels)
    this.cameras.main.startFollow(this.player.car)

    this.player.car.on("lap", this.onLapComplete, this)
  }

  onLapComplete(lap) {
    if (lap > LAPS) {
      this.scene.restart()
    }

  }

  setEvents() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    this.player.move()
  }
}