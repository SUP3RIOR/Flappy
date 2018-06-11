import g from '../globals';
import Bird from './Bird';
import { nextGeneration } from './ai';
import Pipe from './pipe';
export var sketch: p5;

export default class Game {
    private tempCycles: number = 0;
    private bufferLeft: any;
    private bufferRight: any;
    private updateScore: (birdsAlive: number, scoreBest: number, highscore: number) => void;

    constructor(updateScore: (birdsAlive: number, scoreBest: number, highscore: number) => void) {
        this.updateScore = updateScore;
        document.getElementById('start').style.display = 'none';
        sketch = new p5(this.init);
    }

    private init = (p: p5) => {
        p.preload = () => this.preload(p);
        p.setup = () => this.setup(p);
        p.draw = () => this.draw(p);
    }

    private preload = (p: p5) => {
        g.bgImg = p.loadImage('./bg.png');
        g.birgImg = p.loadImage('./bird.png');
        g.pipeTopImg = p.loadImage('./pipeTop.png');
        g.pipeBotImg = p.loadImage('./pipeBot.png');
    }

    private setup = (p: p5) => {
        let canvas = p.createCanvas(1201, 400);
        canvas.parent('canvas');
        this.bufferLeft = p.createGraphics(600, 400);
        this.bufferRight = p.createGraphics(600, 400);

        // Create a population
        for (let i = 0; i < 500; i++) {
            let bird = new Bird();
            g.activeBirds.push(bird);
            g.allBirds.push(bird);
        }
    }

    private draw = (p: p5) => {
        this.getBest();
        p.background(0);
        this.bufferLeft.image(g.bgImg,0,0,600,400);
        this.bufferRight.image(g.bgImg,0,0,600,400);        
        
        let cycles: number = g.gameSpeed + this.tempCycles;
        if (cycles >= 1) {
            this.tempCycles = 0;
            for (let n = 0; n < cycles; n++) {
                this.updateAllPipes();
                
                this.runAllBirds();
                if (g.bestBird) {
                    this.runBestBird();
                }
            }
        } else {
            this.tempCycles += cycles;
        }

        // Draw everything!
        for (let pipe of g.pipes) {
            pipe.draw(this.bufferLeft);
            pipe.draw(this.bufferRight);
        }    
        // Left
        for (let bird of g.activeBirds) {
            bird.draw(this.bufferLeft);
        }
        // Right
        if (g.bestBird) {
            g.bestBird.draw(this.bufferRight);
        }

        // DrawBuffer to canvas
        p.image(this.bufferLeft, 0, 0);
        p.image(this.bufferRight, 601, 0);

        // nextGeneration?
        if (g.activeBirds.length == 0) {
            nextGeneration();
        }
    }

    private getBest() {
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
        
        let scoreBest = 0;
        if (g.bestBird) {
            scoreBest = g.bestBird.score;
        }
        this.updateScore(g.activeBirds.length, scoreBest, g.highScore);
    }

    private updateAllPipes() {
        for (let i = g.pipes.length - 1; i >= 0; i--) {
            g.pipes[i].update();
            if (g.pipes[i].offscreen()) {
                g.pipes.splice(i, 1);
            }
        }

        // Add new Pipe
        if (g.frameCounter % g.pipeDistance == 0) {
            g.pipes.push(new Pipe());
        }
        g.frameCounter += 1;
    }

    private drawAllPipes(bufferLeft: any, bufferRight: any) {
        for (let pipe of g.pipes) {
            pipe.draw(bufferLeft);
            pipe.draw(bufferRight);
        }   
    }

    private runBestBird() {
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

    private runAllBirds() {
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
}