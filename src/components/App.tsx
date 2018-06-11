import * as React from 'react';
import Config from './Config';
import Game from './Game';
import Info from './Info';

interface State {
    birdsAlive: number;
    scoreBest: number;
    highscore: number;
    gameSpeed: number;
}

export default class App extends React.Component<{},State> {
    state: State = { 
        birdsAlive: 0,
        scoreBest: 0,
        highscore: 0,
        gameSpeed: 1,
    }

    updateScore = (birdsAlive: number, scoreBest: number, highscore: number) => {
        this.setState({birdsAlive: birdsAlive, scoreBest: scoreBest, highscore: highscore});
    }

    handleSpeedChange = (value: number) => {
        this.setState({gameSpeed: value});
    }

    render() {
        return (
            <div>
                <header className="mdc-top-app-bar mdc-elevation--z6">
                    <div className="mdc-top-app-bar__row">
                        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                            <span className="mdc-top-app-bar__title">Flappy</span>
                        </section>
                    </div>
                </header>

                <div className="mdc-top-app-bar--fixed-adjust">
                    <div id="canvas-wrapper" className="mdc-card mdc-elevation--z12">
                        <Game gameSpeed={this.state.gameSpeed} updateScore={this.updateScore} />
                    
                        <Info 
                            birdsAlive={this.state.birdsAlive} 
                            scoreBest={this.state.scoreBest} 
                            highscore={this.state.highscore} 
                            gameSpeed={this.state.gameSpeed} 
                            onSpeedChange={this.handleSpeedChange}
                        />
                    </div>
                </div>

                <Config />
            </div>
        );
    }   
}