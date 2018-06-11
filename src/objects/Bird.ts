import { sketch } from "../components/Game";
import g from "../globals";
import Brain from "./Brain";
import Pipe from "./pipe";

export default class Bird {
    brain: Brain;
    
    positionX: number = 64;
    positionY: number = sketch.height/2;
    radius: number = g.birdRadius;

    gravity: number = g.birdGravity;
    lift: number = g.birdLift;
    velocity: number = 0;
    cooldown: number = 0;

    score: number = 0;
    fitness: number = 0;

    constructor(brain?: Brain) {
        if (brain) {
            this.brain = brain.copy();
            this.brain.mutate(Bird.mutate)
        } else {
            this.brain = new Brain(5, 8, 2);
        }
    }

    //Klont den Vogel
    clone(): Bird {
        return new Bird(this.brain);
    }

    //Zeichnet den Vogel
    draw(buffer: any): void {
        buffer.image(
            g.birgImg, 
            this.positionX - this.radius, 
            this.positionY - this.radius, 
            this.radius * 2 + this.radius * 2/3, 
            this.radius * 2
        );
    }

    //Die funktion mit der der Vogel denkt
    think(pipes: Pipe[]): void {
        let closest = null;
        let record = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let diff = pipes[i].position - this.positionX;
            if (diff > 0 && diff < record) {
                record = diff;
                closest = pipes[i];
            }
        }

        if (closest) {
            let inputs = [];
            inputs[0] = sketch.map(closest.position, this.positionX, sketch.width, 0, 1);
            inputs[1] = sketch.map(closest.top, 0, sketch.height, 0, 1);
            inputs[2] = sketch.map(closest.bot, 0, sketch.height, 0, 1);
            inputs[3] = sketch.map(this.positionY, 0, sketch.height, 0, 1);
            inputs[4] = sketch.map(this.velocity, -5, 5, 0, 1);

            // Get the outputs from the network
            if (this.brain.think(inputs)) {
                this.jump();
            }
        }
    }

    //Lässte den Vogel Springen
    jump(): void {
        if (this.cooldown === 0) {
            this.velocity += this.lift;
            this.cooldown = 30;
        }
    }

    //Berührt der Vogel Oberen oder unteren Rand
    bottop(): boolean {
        return (this.positionY > sketch.height || this.positionY < 0);
    }

    //Aktualisiert den Vogel
    update() {
        this.velocity += this.gravity;
        this.positionY += this.velocity;

        if (this.cooldown > 0) {
            this.cooldown--;
        }

        this.score++;
    }

    //Funktion die den Vogel mutieren lässt
    static mutate(x: number): number {
        return Brain.mutate(x);
    }
}