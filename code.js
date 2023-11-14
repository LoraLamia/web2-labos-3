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
        constructor(direction) {
            if(direction === "top") {
                this.x = Math.round(Math.random() * window.innerWidth)
                this.y = -20; // Početak izvan ekrana
            } else if(direction === "left") {
                this.x = -20
                this.y = Math.round(Math.random() * window.innerHeight)
            } else if(direction === "right") {
                this.x = window.innerWidth + 20
                this.y = Math.round(Math.random() * window.innerHeight)
            } else {
                this.x = Math.round(Math.random() * window.innerWidth)
                this.y = window.innerHeight + 20
            }
            this.width = 30;
            this.height = 30;
            this.color = 'grey';
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

    const enemies = []
    setInterval(generateEnemies, 8000);

    function generateEnemies() {
        const enemyTop = new Enemy('top');
        const enemyLeft = new Enemy('left');
        const enemyRight = new Enemy('right');
        const enemyDown = new Enemy('down');
        enemies.push(enemyTop)
        enemies.push(enemyLeft)
        enemies.push(enemyRight)
        enemies.push(enemyDown)

        var topInterval = setInterval(newEnemyFromTop, 100);
        var leftInterval = setInterval(newEnemyFromLeft, 100);
        var rightInterval = setInterval(newEnemyFromRight, 100);
        var downInterval = setInterval(newEnemyFromDown, 100);
     
        function newEnemyFromTop() { 
            if(enemyTop.y > window.innerHeight) {
                clearInterval(topInterval)
                enemies.pop(enemyTop)
                enemyTop.clear()
            } else {
                enemyTop.clear()
                enemyTop.y += 7
                enemyTop.draw()
            }
        }

        function newEnemyFromLeft() {
            if(enemyLeft.x > window.innerWidth) {
                clearInterval(leftInterval)
                enemies.pop(enemyLeft)
                enemyLeft.clear()
            } else {
                enemyLeft.clear()
                enemyLeft.x += 7
                enemyLeft.draw()
            }
        }

        function newEnemyFromRight() { 
            if(enemyRight.x < 0) {
                clearInterval(rightInterval)
                enemies.pop(enemyRight)
                enemyRight.clear()
            } else {
                enemyRight.clear()
                enemyRight.x -= 7
                enemyRight.draw()
            }
        }

        function newEnemyFromDown() {
            if(enemyDown.y < 0) {
                clearInterval(downInterval)
                enemies.pop(enemyDown)
                enemyDown.clear()
            } else {
                enemyDown.clear()
                enemyDown.y -= 7
                enemyDown.draw()
            }
        }
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

