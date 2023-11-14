document.addEventListener("DOMContentLoaded", () => {
    var mainCanvas = document.getElementById("game");
    var mainContext = mainCanvas.getContext("2d");

    mainCanvas.width = window.innerWidth;
    mainCanvas.height = window.innerHeight;

    class Player {
        constructor() {
            this.x = mainCanvas.width/2
            this.y = mainCanvas.height/2
            this.width = 30
            this.height = 30
            this.color = "red"
        }

        draw() {
            mainContext.fillStyle = this.color
            mainContext.fillRect(this.x, this.y, this.width, this.height)
        }

        clear() {
            mainContext.clearRect(this.x, this.y, this.width, this.height);
        }

    }

    class Enemy {
        constructor() {
            this.x = Math.round(Math.random() * window.innerWidth)
            this.y = -20; // Početak izvan ekrana
            this.width = 30;
            this.height = 30;
            this.color = 'grey';
            this.velocity = {
                x: (Math.random() - 0.5) * 4,
                y: Math.random() * 3 + 1
            };
        }

        draw() {
            mainContext.fillStyle = this.color;
            mainContext.fillRect(this.x, this.y, this.width, this.height);
        }

        clear() {
            mainContext.clearRect(this.x, this.y, this.width, this.height);
        }
    }
    const player = new Player();
    player.draw()

    const enemy = new Enemy();
    setInterval(newEnemy, 1000);

    function newEnemy() { 
        enemy.clear()
        enemy.y += 7
        enemy.draw()
    }

    window.addEventListener('keydown', (e) => {
        player.clear()
        switch (e.key) {
            case 'ArrowUp':
                if(player.y > 0) {
                    player.y -= 10
                }
                break;
            case 'ArrowDown':
                if(player.y < mainCanvas.height - player.height) {
                    player.y += 10
                }
                break;
            case 'ArrowLeft':
                if(player.x > 0) {
                    player.x -= 10
                }
                break;
            case 'ArrowRight':
                if(player.x < mainCanvas.width - player.width) {
                    player.x += 10
                }
                break;
        }
        player.draw()
    })
})

