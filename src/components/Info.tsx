import * as React from 'react';
import Slider from './Slider';

interface Props {
    highscore: number;
    birdsAlive: number;
    scoreBest: number;
    gameSpeed: number;
    onSpeedChange: (value: number) => void;
}

export default class Info extends React.Component<Props> {
    render() {
        return (
            <div>
                <div id="info">
                    <div>
                        <span className="mdc-typography--subtitle1">Highscore: </span>
                        <span className="mdc-typography--subtitle2">{this.props.highscore}</span>
                    </div>
                    <div>
                        <span className="mdc-typography--subtitle1">Birds Alive: </span>
                        <span className="mdc-typography--subtitle2">{this.props.birdsAlive}</span>
                    </div>
                    <div>
                        <span className="mdc-typography--subtitle1">Score of Best: </span>
                        <span className="mdc-typography--subtitle2">{this.props.scoreBest}</span>
                    </div>
                </div>
                <Slider 
                    title="Game Speed" 
                    name="game_speed" 
                    valuemin={0} 
                    valuemax={5} 
                    valuenow={this.props.gameSpeed} 
                    step={0.2} 
                    onChange={(name, value) => this.props.onSpeedChange(value)} 
                />
            </div>
        );
    }
}