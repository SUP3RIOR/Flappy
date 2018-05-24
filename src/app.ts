import Bird from "./game/bird";
import { nextGeneration, resetGame } from "./game/game";
import Pipe from "./game/pipe";
import g from "./globals";

export var speedSlider: p5.Element;
export var speedSpan: p5.Element;
export var highScoreSpan: p5.Element;
export var allTimeHighScoreSpan: p5.Element;
export var runBestButton: p5.Element;

function init(p: p5) {
    p.preload = () => {

    }
    
    p.setup = () => {
        let canvas = p.createCanvas(600, 400);
        canvas.parent('root');
        speedSlider = p.select('#speedSlider');
        speedSpan = p.select('#speed');
        highScoreSpan = p.select('#hs');
        allTimeHighScoreSpan = p.select('#ahs');
        runBestButton = p.select('#best');
        runBestButton.mousePressed(toggleState);

        // Create a population
        for (let i = 0; i < g.totalPopulation; i++) {
            let bird = new Bird();
            g.activeBirds.push(bird);
            g.allBirds.push(bird);
        }
    }
    
    p.draw = () => {
        p.background(0);

        let cycles: number = +speedSlider.value();
        speedSpan.html(cycles.toString());

        for (let n = 0; n < cycles; n++) {
            showAllPipes();
            if (g.runBest) {
                runBestBird();
            } else {
                runAllBirds();
            }

            addPipe();
        }

        getBest();

        // Draw everything!
        for (let pipe of g.pipes) {
            pipe.draw();
        }
    
        if (g.runBest) {
            g.bestBird.draw();
        } else {
            for (let bird of g.activeBirds) {
                bird.draw();
            }
            if (g.activeBirds.length == 0) {
                nextGeneration();
            }
        }
    }
}

function toggleState() {
    g.runBest = !g.runBest;
    // Show the best bird
    if (g.runBest) {
      resetGame();
      runBestButton.html('continue training');
      // Go train some more
    } else {
      nextGeneration();
      runBestButton.html('run best');
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
    if (g.counter % 75 == 0) {
        g.pipes.push(new Pipe());
    }
    g.counter += 1;
}

function runBestBird() {
    g.bestBird.think(g.pipes);
    g.bestBird.update();
    for (let j = 0; j < g.pipes.length; j++) {
        if (g.pipes[j].collision(g.bestBird)) {
            resetGame();
            break;
        }
    }
    if (g.bestBird.bottop()) {
        resetGame();
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
    if (!g.runBest) {
        // Which is the best bird?
        let tempBestBird = null;
        for (let i = 0; i < g.activeBirds.length; i++) {
            let s = g.activeBirds[i].score;
            if (s > tempHighScore) {
                tempHighScore = s;
                tempBestBird = g.activeBirds[i];
            }
        }

        // Is it the all time high scorer?
        if (tempHighScore > g.highScore) {
            g.highScore = tempHighScore;
            g.bestBird = tempBestBird;
        }
    } else {
        // Just one bird, the best one so far
        tempHighScore = g.bestBird.score;
        if (tempHighScore > g.highScore) {
            g.highScore = tempHighScore;
        }
    }

    highScoreSpan.html(tempHighScore.toString());
    allTimeHighScoreSpan.html(g.highScore.toString());
}

export const sketch = new p5(init);