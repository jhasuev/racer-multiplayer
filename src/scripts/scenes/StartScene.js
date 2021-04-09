import Client from "../classes/Client"

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("Start")
  }

  create() {
    this.createBackground()
    this.createButtons()
    this.createEvent()
  }
  
  createBackground() {
    this.add.sprite(0, 0, "bg").setOrigin(0)
    this.add.graphics()
      .fillStyle(0x000, .5)
      .fillRect(0, 0, this.game.config.width,this.game.config.height)
  }

  createButtons() {
    let centerY = this.game.config.height / 2
    const buttons = [
      {
        title: "ONE PLAYER",
        type: "one",
      },
      {
        title: "TWO PLAYERS",
        type: "two",
      },
    ]

    const styles = {
      align: "center",
      font: "70px Arial",
    }
    
    let offsetY = -50
    buttons.forEach(button => {
      button.text = this.add.text(this.game.config.width / 2, centerY + offsetY, button.title, styles)
        .setOrigin(.5)
        .setInteractive()

      button.text.button = button
      offsetY += 120
    })
  }

  createEvent() {
    this.input.on("gameobjectdown", this.onItemClicked, this)
  }

  onItemClicked(pointer, { button }) {
    switch (button.type) {
      case "one":
        this.startGame()
        break;
      case "two":
        this.requestGame()
        break;
    }
  }
  
  startGame() {
    this.scene.start("Game")
  }

  requestGame() {
    console.log("onTwoPlayer() ...");
    this.client = new Client()
    this.client.init()
    this.client.on("game", this.startGame, this)
  }
}