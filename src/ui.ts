import { MDCSlider } from '@material/slider';
import { MDCTopAppBar } from '@material/top-app-bar';
import g from './globals';


export var highScoreSpan: p5.Element;
export var scoreBestSpan: p5.Element;
export var birdsAliveSpan: p5.Element;
export var playerScoreSpan: p5.Element;
export var playerHighscoreSpan: p5.Element;
export var speedSliderValue: number = 1;
export var totalPopulationValue: number = 500;
export var hiddenNodesValue: number = 8;

export function initUI(p: p5) {
    highScoreSpan = p.select('#hs');
    scoreBestSpan = p.select('#hsbest');
    birdsAliveSpan = p.select('#birdsAliveSpan');
}

// AppBar
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

// Spilder
const speedSlider = new MDCSlider(document.querySelector('#speedSlider'));
speedSlider.listen('MDCSlider:change', () => {
    speedSliderValue = speedSlider.value;
    document.getElementById('speedSpan').innerHTML = (Math.round(speedSliderValue * 10) / 10).toString();
});

const totalPopulationSlider = new MDCSlider(document.querySelector('#totalPopulationSlider'));
totalPopulationSlider.listen('MDCSlider:change', () => {
    totalPopulationValue = totalPopulationSlider.value;
    document.getElementById('totalPopulationSpan').innerHTML = totalPopulationValue.toString();
});
const hiddenNodesSlider = new MDCSlider(document.querySelector('#hiddenNodesSlider'));
hiddenNodesSlider.listen('MDCSlider:change', () => {
    hiddenNodesValue = hiddenNodesSlider.value;
    document.getElementById('hiddenNodesSpan').innerHTML = hiddenNodesValue.toString();
});


// Pipe
const pipeSpacingSlider = new MDCSlider(document.querySelector('#pipeSpacingSlider'));
pipeSpacingSlider.listen('MDCSlider:change', () => {
    g.pipeSpacing = pipeSpacingSlider.value;
    document.getElementById('pipeSpacingSpan').innerHTML = g.pipeSpacing.toString();
});
const pipeWidthSlider = new MDCSlider(document.querySelector('#pipeWidthSlider'));
pipeWidthSlider.listen('MDCSlider:change', () => {
    g.pipeWidth = pipeWidthSlider.value;
    document.getElementById('pipeWidthSpan').innerHTML = g.pipeWidth.toString();
});
const pipeSpeedSlider = new MDCSlider(document.querySelector('#pipeSpeedSlider'));
pipeSpeedSlider.listen('MDCSlider:change', () => {
    g.pipeSpeed = pipeSpeedSlider.value;
    document.getElementById('pipeSpeedSpan').innerHTML = g.pipeSpeed.toString();
});
const pipeDistanceSlider = new MDCSlider(document.querySelector('#pipeDistanceSlider'));
pipeDistanceSlider.listen('MDCSlider:change', () => {
    g.pipeDistance = pipeDistanceSlider.value;
    document.getElementById('pipeDistanceSpan').innerHTML = g.pipeDistance.toString();
});

//Bird
const birdRadiusSlider = new MDCSlider(document.querySelector('#birdRadiusSlider'));
birdRadiusSlider.listen('MDCSlider:change', () => {
    g.birdRadius = birdRadiusSlider.value;
    document.getElementById('birdRadiusSpan').innerHTML = g.birdRadius.toString();
});
const birdGravitySlider = new MDCSlider(document.querySelector('#birdGravitySlider'));
birdGravitySlider.listen('MDCSlider:change', () => {
    g.birdGravity = birdGravitySlider.value;
    document.getElementById('birdGravitySpan').innerHTML = (Math.round(g.birdGravity * 10) / 10).toString();
});
const birdLiftSlider = new MDCSlider(document.querySelector('#birdLiftSlider'));
birdLiftSlider.listen('MDCSlider:change', () => {
    g.birdLift = -birdLiftSlider.value;
    document.getElementById('birdLiftSpan').innerHTML = (-g.birdLift).toString();
});