document.addEventListener("DOMContentLoaded", () => {
    var mainCanvas = document.getElementById("game");
    var mainContext = mainCanvas.getContext("2d");

    mainCanvas.width = window.innerWidth;
    mainCanvas.height = window.innerHeight;

    class Player {
        constructor() {
            this.x = mainCanvas.width/2
            this.y = mainCanvas.height/2
            this.width = 20
            this.height = 20
            this.color = "red"
        }

        draw() {
            mainContext.fillStyle = this.color
            mainContext.fillRect(this.x, this.y, this.width, this.height)
            print('huhue')
        }

    }

    const player = new Player();
    player.draw()
})

