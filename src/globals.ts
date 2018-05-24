import Bird from "./game/bird";
import Pipe from "./game/pipe";

export default class g {
    private static _totalPopulation: number = 500;
    private static _activeBirds: Bird[] = [];
    private static _allBirds: Bird[] = [];
    private static _bestBird: Bird = null;
    private static _pipes: Pipe[] = [];
    private static _counter: number = 0;
    private static _highScore = 0;
    private static _runBest = false;

    static get totalPopulation() {
        return this._totalPopulation;
    }
    static set totalPopulation(totalPopulation) {
        this._totalPopulation = totalPopulation;
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
    static get counter() {
        return this._counter;
    }
    static set counter(counter) {
        this._counter = counter;
    }
    static get highScore() {
        return this._highScore;
    }
    static set highScore(highScore) {
        this._highScore = highScore;
    }
    static get runBest() {
        return this._runBest;
    }
    static set runBest(runBest) {
        this._runBest = runBest;
    }
}