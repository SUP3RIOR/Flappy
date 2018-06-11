import Bird from "./game/bird";
import { nextGeneration } from "./game/game";
import Pipe from "./game/pipe";
import g from "./globals";
import { birdsAliveSpan, highScoreSpan, initUI, scoreBestSpan, speedSliderValue, totalPopulationValue } from "./ui";

export var sketch: p5;
var allBirdsBuffer: any;
var bestBirdBuffer: any;
var tempCycles: number = 0;

g.config();

function start() {
    document.getElementById('start').style.display = 'none';
    sketch = new p5(init);
}
document.getElementById('startBtn').addEventListener('click', start);

function restart() {
    sketch.noLoop();
    document.getElementById('canvas').innerHTML = '';
    sketch = new p5(init);
}

function init(p: p5) {
    p.preload = () => {
        g.bgImg = p.loadImage('./bg.png');
        g.birgImg = p.loadImage('./bird.png');
        g.pipeTopImg = p.loadImage('./pipeTop.png');
        g.pipeBotImg = p.loadImage('./pipeBot.png');
    }
    
    p.setup = () => {
        let canvas = p.createCanvas(1201, 400);
        canvas.parent('canvas');
        allBirdsBuffer = p.createGraphics(600, 400);
        bestBirdBuffer = p.createGraphics(600, 400);
        initUI(p);

        // Create a population
        for (let i = 0; i < totalPopulationValue; i++) {
            let bird = new Bird();
            g.activeBirds.push(bird);
            g.allBirds.push(bird);
        }
    }
    
    p.draw = () => {
        getBest();
        p.background(0);
        allBirdsBuffer.image(g.bgImg,0,0,600,400);
        bestBirdBuffer.image(g.bgImg,0,0,600,400);        
        
        let cycles: number = speedSliderValue + tempCycles;
        if (cycles >= 1) {
            tempCycles = 0;
            for (let n = 0; n < cycles; n++) {
                showAllPipes();
                
                runAllBirds();
                if (g.bestBird) {
                    runBestBird();
                }
    
                addPipe();
            }
        } else {
            tempCycles += cycles;
        }

        // Draw everything!
        birdsAliveSpan.html(g.activeBirds.length.toString());

        for (let pipe of g.pipes) {
            pipe.draw(allBirdsBuffer);
            pipe.draw(bestBirdBuffer);
        }    
        if (g.bestBird) {
            g.bestBird.draw(bestBirdBuffer);
        }
        for (let bird of g.activeBirds) {
            bird.draw(allBirdsBuffer);
        }

        // DrawBuffer to canvas
        p.image(allBirdsBuffer, 0, 0);
        p.image(bestBirdBuffer, 601, 0);

        // nextGeneration?
        if (g.activeBirds.length == 0) {
            nextGeneration();
        }
    }
}

function showAllPipes() {
    for (let i = g.pipes.length - 1; i >= 0; i--) {
        g.pipes[i].update();
        if (g.pipes[i].offscreen()) {
            g.pipes.splice(i, 1);
        }
    }
}
function addPipe() {
    if (g.frameCounter % g.pipeDistance == 0) {
        g.pipes.push(new Pipe());
    }
    g.frameCounter += 1;
}

function runBestBird() {
    g.bestBird.think(g.pipes);
    g.bestBird.update();
    for (let j = 0; j < g.pipes.length; j++) {
        if (g.pipes[j].collision(g.bestBird)) {
            g.bestBird = null;
            return;
        }
    }
    if (g.bestBird.bottop()) {
        g.bestBird = null;
    }
}
function runAllBirds() {
    for (let i = g.activeBirds.length - 1; i >= 0; i--) {
        let bird = g.activeBirds[i];
        bird.think(g.pipes);
        bird.update();

        for (let j = 0; j < g.pipes.length; j++) {
            if (g.pipes[j].collision(g.activeBirds[i])) {
                g.activeBirds.splice(i, 1);
                break;
            }
        }

        if (bird.bottop()) {
            g.activeBirds.splice(i, 1);
        }
    }
}
function getBest() {
    let tempHighScore = 0;
    let tempBestBird = null;
    for (let bird of g.activeBirds) {
        if (bird.score > tempHighScore) {
            tempHighScore = bird.score;
            tempBestBird = bird;
        }
    }
    g.bestBird = tempBestBird;
    if (tempHighScore > g.highScore) {
        g.highScore = tempHighScore;        
    }
    
    highScoreSpan.html(g.highScore.toString());
    if (g.bestBird) {
        scoreBestSpan.html(g.bestBird.score.toString());
    }
}