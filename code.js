document.addEventListener("DOMContentLoaded", () => {
    var mainCanvas = document.getElementById("game");
    var mainContext = mainCanvas.getContext("2d");

    mainCanvas.width = window.innerWidth;
    mainCanvas.height = window.innerHeight;

    class Player {
        constructor() {
            this.x = Math.round(mainCanvas.width / 2)
            this.y = Math.round(mainCanvas.height / 2)
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
            if (direction === "top") {
                this.x = Math.round(Math.random() * window.innerWidth)
                this.y = -20; // Početak izvan ekrana
            } else if (direction === "left") {
                this.x = -20
                this.y = Math.round(Math.random() * window.innerHeight)
            } else if (direction === "right") {
                this.x = window.innerWidth + 20
                this.y = Math.round(Math.random() * window.innerHeight)
            } else {
                this.x = Math.round(Math.random() * window.innerWidth)
                this.y = window.innerHeight + 20
            }
            this.width = 30
            this.height = 30
            this.color = 'grey'
        }

        draw() {
            mainContext.fillStyle = this.color;
            mainContext.fillRect(this.x, this.y, this.width, this.height)
        }

        clear() {
            mainContext.clearRect(this.x, this.y, this.width, this.height)
        }
    }
    const player = new Player()
    player.draw()

    const enemies = []
    setInterval(generateEnemies, 4000)

    setInterval(checkForOverlapps, 100)

    let startTime = new Date()

    setInterval(checkTimePassed, 1000)
    function checkTimePassed() {
        let timeNow = new Date()
        let timeElapsed = timeNow - startTime

        var text = "Vrijeme: " + timeElapsed
        var textWidth = mainContext.measureText(text).width
    
        mainContext.fillStyle = "white"
        mainContext.font = "bold 18px Arial"

        mainContext.clearRect(50, 28, textWidth, 30)
        mainContext.fillText(text, 50, 50)
        
    }

 

    function generateEnemies() {
        const enemyTop = new Enemy('top')
        const enemyLeft = new Enemy('left')
        const enemyRight = new Enemy('right')
        const enemyDown = new Enemy('down')
        enemies.push(enemyTop)
        enemies.push(enemyLeft)
        enemies.push(enemyRight)
        enemies.push(enemyDown)

        var topInterval = setInterval(newEnemyFromTop, 100);
        var leftInterval = setInterval(newEnemyFromLeft, 100);
        var rightInterval = setInterval(newEnemyFromRight, 100);
        var downInterval = setInterval(newEnemyFromDown, 100);

        function newEnemyFromTop() {
            if (enemyTop.y > window.innerHeight) {
                clearInterval(topInterval)
                let index = enemies.indexOf(enemyTop);
                if (index > -1) {
                    enemies.splice(index, 1); 
                }
                enemyTop.clear()
            } else {
                enemyTop.clear()
                enemyTop.y += 7
                enemyTop.draw()
            }
        }

        function newEnemyFromLeft() {
            if (enemyLeft.x > window.innerWidth) {
                clearInterval(leftInterval)
                let index = enemies.indexOf(enemyLeft);
                if (index > -1) {
                    enemies.splice(index, 1); 
                }
                enemyLeft.clear()
            } else {
                enemyLeft.clear()
                enemyLeft.x += 7
                enemyLeft.draw()
            }
        }

        function newEnemyFromRight() {
            if (enemyRight.x < 0) {
                clearInterval(rightInterval)
                let index = enemies.indexOf(enemyRight);
                if (index > -1) {
                    enemies.splice(index, 1); 
                }
                enemyRight.clear()
            } else {
                enemyRight.clear()
                enemyRight.x -= 7
                enemyRight.draw()
            }
        }

        function newEnemyFromDown() {
            if (enemyDown.y < 0) {
                clearInterval(downInterval)
                let index = enemies.indexOf(enemyDown);
                if (index > -1) {
                    enemies.splice(index, 1); 
                }
                enemyDown.clear()
            } else {
                enemyDown.clear()
                enemyDown.y -= 7
                enemyDown.draw()
            }
        }
    }
    
    function areRectanglesOverlapping(rect1, rect2) {
        let minAx = rect1.x;
        let minAy = rect1.y;
        let maxAx = rect1.x + rect1.width;
        let maxAy = rect1.y + rect1.height;
    
        let minBx = rect2.x;
        let minBy = rect2.y;
        let maxBx = rect2.x + rect2.width;
        let maxBy = rect2.y + rect2.height;
    
        let aLeftOfB = maxAx < minBx;
        let aRightOfB = minAx > maxBx;
        let aAboveB = minAy > maxBy;
        let aBelowB = maxAy < minBy;
    
        return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
    }
    

    function checkForOverlapps() {
        for (let enemy of enemies) {
            if (areRectanglesOverlapping(enemy, player)) {
                console.log("Colision detected")
            }
        }
    }




    window.addEventListener('keydown', (e) => {
        player.clear()
        switch (e.key) {
            case 'ArrowUp':
                if (player.y > 0) {
                    player.y -= 10
                }
                break;
            case 'ArrowDown':
                if (player.y < mainCanvas.height - player.height) {
                    player.y += 10
                }
                break;
            case 'ArrowLeft':
                if (player.x > 0) {
                    player.x -= 10
                }
                break;
            case 'ArrowRight':
                if (player.x < mainCanvas.width - player.width) {
                    player.x += 10
                }
                break;
        }
        player.draw()
    })
})

