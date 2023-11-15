document.addEventListener("DOMContentLoaded", () => {
    //dohvacanje glavnog canvasa
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
        //za crtanje player-a
        draw() {
            mainContext.shadowBlur = 15
            mainContext.shadowColor = "white"
            mainContext.fillStyle = this.color
            mainContext.fillRect(this.x, this.y, this.width, this.height)
        }
        //za brisanje player-a
        clear() {
            const shadowOffset = 20; // Additional area to clear, adjust as needed
            mainContext.shadowBlur = 0;
            mainContext.shadowColor = "transparent";
            mainContext.clearRect(this.x - shadowOffset, this.y - shadowOffset, this.width + 2 * shadowOffset, this.height + 2 * shadowOffset);
        }        

    }

    class Enemy {
        constructor(direction) {
            //ovisno o vrijednosti varijable direction, odreduje se odakle enemy krece (svakako uvijek krece izvan ekrana)
            if (direction === "top") {
                this.x = Math.round(Math.random() * window.innerWidth)
                this.y = -20; 
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
        //za crtanje enemy-a
        draw() {
            mainContext.shadowBlur = 15
            mainContext.shadowColor = "white"
            mainContext.fillStyle = this.color
            mainContext.fillRect(this.x, this.y, this.width, this.height)
        }
        //za brisanje enemy-a
        clear() {
            const shadowOffset = 20; // Additional area to clear, adjust as needed
            mainContext.shadowBlur = 0;
            mainContext.shadowColor = "transparent";
            mainContext.clearRect(this.x - shadowOffset, this.y - shadowOffset, this.width + 2 * shadowOffset, this.height + 2 * shadowOffset);
        }
    }
    //odmah na pocetku nacrtaj playera
    const player = new Player()
    player.draw()

    //enemy-je koji su prisutni na ekranu spremamo u enemies
    const enemies = []
    //svake 4 sekunde generiraj nove enemy-je
    setInterval(generateEnemies, 4000)
    //svakih 100 milisekundi provjeri da li se player dotaknuo s nekim od enemy-a
    setInterval(checkForOverlapps, 100)

    let startTime = new Date()
    //svakih 50 milisekundi pozovi f-ju checkTimePassed koja racuna koliko je vremena proslo, brise stari text i upisuje drugi (azurira vrijeme)
    setInterval(checkTimePassed, 50)

    function checkTimePassed() {
        let timeNow = new Date()
        let timeElapsed = timeNow - startTime

        let minutes = Math.floor(timeElapsed / 60000)
        let seconds = Math.floor((timeElapsed % 60000) / 1000)
        let milliseconds = timeElapsed % 1000 

        let formattedMinutes = minutes.toString().padStart(2, '0')
        let formattedSeconds = seconds.toString().padStart(2, '0')
        let formattedMilliseconds = milliseconds.toString().padStart(3, '0')

        var text = `Vrijeme: ${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`
        var textWidth = mainContext.measureText(text).width
    
        mainContext.fillStyle = "white"
        mainContext.font = "bold 20px Arial"

        var xPosition = mainCanvas.width - textWidth - 10
        var yPosition = 50

        mainContext.clearRect(xPosition, yPosition - 30, textWidth + 10, 40)
        mainContext.fillText(text, xPosition, yPosition)
    }

 

    function generateEnemies() {
        //sa svakog ruba ekrana dolazi po 1 enemy
        const enemyTop = new Enemy('top')
        const enemyLeft = new Enemy('left')
        const enemyRight = new Enemy('right')
        const enemyDown = new Enemy('down')
        enemies.push(enemyTop)
        enemies.push(enemyLeft)
        enemies.push(enemyRight)
        enemies.push(enemyDown)

        //svaki od enemy-a pomicemo svakih 100 milisekundi (kretanje enemy-a)
        var topInterval = setInterval(newEnemyFromTop, 100);
        var leftInterval = setInterval(newEnemyFromLeft, 100);
        var rightInterval = setInterval(newEnemyFromRight, 100);
        var downInterval = setInterval(newEnemyFromDown, 100);

        function newEnemyFromTop() {
            //ako enemy izade iz ekrana zaustavljamo njegovo pomicanje i izbacujemo ga iz enemies
            if (enemyTop.y > window.innerHeight) {
                clearInterval(topInterval)
                let index = enemies.indexOf(enemyTop);
                if (index > -1) {
                    enemies.splice(index, 1); 
                }
                enemyTop.clear()
            } else {
                //obrisemo stari rect i crtamo novi 7px udaljen (kretanje enemy-a)
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
    
    //funkcija koja provjere da li se 2 rect-a doticu (intersect)
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
    

    //funkcija koja poziva areRectanglesOverlapping za player-a i svakog enemy-a iz enemies
    function checkForOverlapps() {
        for (let enemy of enemies) {
            if (areRectanglesOverlapping(enemy, player)) {
                console.log("Colision detected")
            }
        }
    }

    //listener za pritiskivanje tipki, sluzi za pomicanje player-a koristeci strijelice na tipkovnici
    window.addEventListener('keydown', (e) => {
        //obrisi player-a sa stare pozicije
        player.clear()
        switch (e.key) {
            case 'ArrowUp':
                //ako player nije dosao do ruba pomici ga, a kad dode do ruba tijelo if-a se nece izvrsit pa ne moze proc rub
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
        //nacrtaj player-a ponovo svaki put kad je pritisnuta neka tipka
        player.draw()
    })
})

