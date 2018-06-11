import Bird from "./objects/Bird";
import Pipe from "./objects/Pipe";

interface Config {
    pipeSpacing: number;
    pipeWidth: number;
    pipeSpeed: number;
    pipeDistance: number;
    birdRadius: number;
    birdGravity: number;
    birdLift: number;
    jumpCooldown: number;
}

export default class g {
    private static _activeBirds: Bird[] = [];
    private static _allBirds: Bird[] = [];
    private static _bestBird: Bird = null;
    private static _pipes: Pipe[] = [];
    private static _frameCounter: number = 0;
    private static _highScore = 0;
    private static _generationCounter: number = 0;
    private static _bgImg: p5.Image;
    private static _birgImg: p5.Image;
    private static _pipeTopImg: p5.Image;
    private static _pipeBotImg: p5.Image;
    //Editable
    private static _pipeSpacing: number;
    private static _pipeWidth: number;
    private static _pipeSpeed: number;
    private static _pipeDistance: number;
    private static _birdRadius: number;
    private static _birdGravity: number;
    private static _birdLift: number;
    private static _jumpCooldown: number;
    
    static config(c: Config) {
        this._pipeSpacing = c.pipeSpacing;
        this._pipeWidth = c.pipeWidth;
        this._pipeSpeed = c.pipeSpeed;
        this._pipeDistance = c.pipeDistance;
        this._birdRadius = c.birdRadius;
        this._birdGravity = c.birdGravity;
        this._birdLift = c.birdLift;
        this._jumpCooldown = c.jumpCooldown;
    }

    static get pipeSpacing() {
        return this._pipeSpacing;
    }
    static set pipeSpacing(pipeSpacing) {
        this._pipeSpacing = pipeSpacing;
    }
    static get pipeWidth() {
        return this._pipeWidth;
    }
    static set pipeWidth(pipeWidth) {
        this._pipeWidth = pipeWidth;
    }
    static get pipeSpeed() {
        return this._pipeSpeed;
    }
    static set pipeSpeed(pipeSpeed) {
        this._pipeSpeed = pipeSpeed;
    }
    static get pipeDistance() {
        return this._pipeDistance;
    }
    static set pipeDistance(pipeDistance) {
        this._pipeDistance = pipeDistance;
    }
    static get birdRadius() {
        return this._birdRadius;
    }
    static set birdRadius(birdRadius) {
        this._birdRadius = birdRadius;
    }
    static get birdGravity() {
        return this._birdGravity;
    }
    static set birdGravity(birdGravity) {
        this._birdGravity = birdGravity;
    }
    static get birdLift() {
        return this._birdLift;
    }
    static set birdLift(birdLift) {
        this._birdLift = birdLift;
    }
    static get activeBirds() {
        return this._activeBirds;
    }
    static set activeBirds(activeBirds) {
        this._activeBirds = activeBirds;
    }
    static get allBirds() {
        return this._allBirds;
    }
    static set allBirds(allBirds) {
        this._allBirds = allBirds;
    }
    static get bestBird() {
        return this._bestBird;
    }
    static set bestBird(bestBird) {
        this._bestBird = bestBird;
    }
    static get pipes() {
        return this._pipes;
    }
    static set pipes(pipes) {
        this._pipes = pipes;
    }
    static get frameCounter() {
        return this._frameCounter;
    }
    static set frameCounter(counter) {
        this._frameCounter = counter;
    }
    static get highScore() {
        return this._highScore;
    }
    static set highScore(highScore) {
        this._highScore = highScore;
    }
    static get birgImg() {
        return this._birgImg;
    }
    static set birgImg(birgImg) {
        this._birgImg = birgImg;
    }
    static get pipeTopImg() {
        return this._pipeTopImg;
    }
    static set pipeTopImg(pipeTopImg) {
        this._pipeTopImg = pipeTopImg;
    }
    static get pipeBotImg() {
        return this._pipeBotImg;
    }
    static set pipeBotImg(pipeBotImg) {
        this._pipeBotImg = pipeBotImg;
    }
    static get bgImg() {
        return this._bgImg;
    }
    static set bgImg(bgImg) {
        this._bgImg = bgImg;
    }
    static get generationCounter() {
        return this._generationCounter;
    }
    static set generationCounter(generationCounter) {
        this._generationCounter = generationCounter;
    }
    static get jumpCooldown() {
        return this._jumpCooldown;
    }
    static set jumpCooldown(jumpCooldown) {
        this._jumpCooldown = jumpCooldown;
    }
}