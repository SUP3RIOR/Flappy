import { sketch } from "./Game";
import g from "../globals";
import Bird from "./bird";

export default class Pipe {
    top: number;
    bot: number;
    position: number = sketch.width;
    width: number = g.pipeWidth;
    speed: number = g.pipeSpeed;

    constructor() {
        let center = sketch.random(g.pipeSpacing, sketch.height - g.pipeSpacing);
        this.top = center - g.pipeSpacing / 2;
        this.bot = sketch.height - (center + g.pipeSpacing / 2);
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
    draw(buffer: any): void {
        buffer.image(g.pipeTopImg, this.position,-(g.pipeTopImg.height - this.top), this.width);
        buffer.image(g.pipeBotImg, this.position, sketch.height - this.bot, this.width);
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