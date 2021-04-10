import Map from "../classes/Map"
import Player from "../classes/Player"
import Stats from "../classes/Stats"
import StatsPanel from "../classes/StatsPanel"
import StatsPopup from "../classes/StatsPopup"
const LAPS = 3
const CARS = {
  BLUE: {
    sprite: "car_blue_1",
    position: 'player',
  },
  RED: {
    sprite: "car_red_1",
    position: 'enemy',
  },
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game")
  }

  init(data) {
    if (data.client) {
      this.client = data.client
    }
    this.setEvents()
  }

  create() {
    this.map = new Map(this)
    
    const car = this.getCarsConfig()
    this.player = new Player(this, this.map, car.player)
    if (this.client) {
      this.enemy = new Player(this, this.map, car.enemy)
      this.client.on("data", data => {
        this.enemy.car.setX(data.x)
        this.enemy.car.setY(data.y)
        this.enemy.car.setAngle(data.angle)
      })
    }

    this.stats = new Stats(this, LAPS)
    this.statsPanel = new StatsPanel(this, this.stats)

    this.cameras.main.setBounds(0, 0, this.map.tilemap.widthInPixels, this.map.tilemap.heightInPixels)
    this.cameras.main.startFollow(this.player.car)

    this.player.car.on("lap", this.onLapComplete, this)
    this.matter.world.on("collisionactive", (event, a, b) => {
      if (b.gameObject === this.player.car && a.gameObject.frame.name == "oil") {
        this.player.slide()
      }
    })
  }

  getCarsConfig() {
    const config = { player: CARS.BLUE, enemy: CARS.RED }

    if (this.client && !this.client.master) {
      config.player = CARS.RED
      config.enemy = CARS.BLUE
    }

    return config
  }

  onLapComplete(lap) {
    this.stats.onLapComplete()
    
    if (this.stats.complete) {
      this.statsPopup = new StatsPopup(this, this.stats)
    }
  }

  setEvents() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update(time, dt) {
    this.stats.update(dt)
    this.player.move()
    this.statsPanel.render()
    this.sync()
  }

  sync() {
    if (this.client) {
      this.client.send({
        x: this.player.car.x,
        y: this.player.car.y,
        angle: this.player.car.angle,
      })
    }
  }
}