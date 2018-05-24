import { sketch } from "../app";
import g from "../globals";
import Bird from "./bird";

export function nextGeneration() {
    resetGame();
    normalizeFitness(g.allBirds);
    g.activeBirds = generate(g.allBirds);
    g.allBirds = g.activeBirds.slice();
}

export function resetGame() {
    g.counter = 0;
    if (g.bestBird) {
        g.bestBird.score = 0;
    }
    g.pipes = [];
}

function normalizeFitness(birds: Bird[]) {
    for (let bird of birds) {
        bird.score = sketch.pow(bird.score, 2);
    }

    let sum = 0;
    for (let bird of birds) {
        sum += bird.score;
    }
    for (let bird of birds) {
        bird.fitness = bird.score / sum;
    }
}

function generate(oldBirds: Bird[]): Bird[] {
    let newBirds: Bird[] = [];
    for (let oldBird of oldBirds) {
        let bird = poolSelection(oldBirds);
        newBirds.push(bird);
    }
    return newBirds;
}

function poolSelection(birds: Bird[]): Bird {
    let index = 0;
    let r = sketch.random(1);
    while(r > 0) {
        r -= birds[index].fitness;
        index += 1;
    }
    index -= 1;

    return birds[index].clone();
}