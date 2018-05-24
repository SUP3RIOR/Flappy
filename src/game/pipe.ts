import { sketch } from "../app";
import Bird from "./bird";

const PipeConfig = {
    spacing: 125,
    width: 80,
    speed: 6
};


export default class Pipe {
    top: number;
    bot: number;
    position: number = sketch.width;
    width: number = PipeConfig.width;
    speed: number = PipeConfig.speed;

    constructor() {
        let center = sketch.random(PipeConfig.spacing, sketch.height - PipeConfig.spacing);
        this.top = center - PipeConfig.spacing / 2;
        this.bot = sketch.height - (center + PipeConfig.spacing / 2);
    }

    //Kollision mit Vogel?
    collision(bird: Bird): boolean {
        if ((bird.positionY - bird.radius) < this.top || (bird.positionY + bird.radius) > (sketch.height - this.bot)) {
            if (bird.positionX > this.position && bird.positionX < this.position + this.width) {
                return true;
            }
        }
        return false;
    }

    //Zeichnet das Rohr
    draw(): void {
        sketch.stroke(255);
        sketch.fill(200);
        sketch.rect(this.position, 0, this.width, this.top);
        sketch.rect(this.position, sketch.height - this.bot, this.width, this.bot);
    }

    //Ist das Rohr noch zu sehen
    offscreen(): boolean {
        if (this.position < -this.width) {
            return true;
        } else {
            return false;
        }
    }

    //Aktualisiert das Rohr
    update(): void {
        this.position -= this.speed;
    }
}