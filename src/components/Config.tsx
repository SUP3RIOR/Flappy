import * as React from 'react';
import g from '../globals';
import Slider from './Slider';

interface Props {
}
interface State {
    pipeSpacing: number;
    pipeWidth: number;
    pipeSpeed: number;
    pipeDistance: number;
    birdRadius: number;
    birdGravity: number;
    birdLift: number;
    jumpCooldown: number;
}

export default class Config extends React.Component<Props,State> {
    constructor(props: Props) {
        super(props);
        g.config(this.state);
    }
    state: State = {
        pipeSpacing: 150,
        pipeWidth: 80,
        pipeSpeed: 6,
        pipeDistance: 50,
        birdRadius: 12,
        birdGravity: 0.4,
        birdLift: -14,
        jumpCooldown: 30
    }

    handleChange = (name: string, value: number) => {
        switch (name) {
            case 'pipe_spacing':
                g.pipeSpacing = value;
                this.setState({pipeSpacing: value});
            break;
            case 'pipe_width':
                g.pipeWidth = value;
                this.setState({pipeWidth: value});
            break;
            case 'pipe_speed':
                g.pipeSpeed = value;
                this.setState({pipeSpeed: value});
            break;
            case 'pipe_distance':
                g.pipeDistance = value;
                this.setState({pipeDistance: value});
            break;
            case 'bird_radius':
                g.birdRadius = value;
                this.setState({birdRadius: value});
            break;
            case 'bird_gravity':
                g.birdGravity = value;
                this.setState({birdGravity: value});
            break;
            case 'bird_lift':
                g.birdLift = value;
                this.setState({birdLift: value});
            break;
            case 'jump_cooldown':
                g.jumpCooldown = value;
                this.setState({jumpCooldown: value});
            break;
        }
    }
    
    render() {
        return (
            <div id="controls-wrapper" className="mdc-card mdc-elevation--z12">
            <div id="pipe-controls">
                <Slider 
                    title="Pipe Spacing" 
                    name="pipe_spacing"
                    valuemin={25} 
                    valuemax={300} 
                    valuenow={this.state.pipeSpacing} 
                    step={25} 
                    onChange={this.handleChange} 
                />
                <Slider 
                    title="Pipe Width" 
                    name="pipe_width"
                    valuemin={10} 
                    valuemax={200} 
                    valuenow={this.state.pipeWidth} 
                    step={10} 
                    onChange={this.handleChange} 
                />
                <Slider 
                    title="Pipe Speed" 
                    name="pipe_speed"
                    valuemin={1} 
                    valuemax={20} 
                    valuenow={this.state.pipeSpeed} 
                    step={1} 
                    onChange={this.handleChange} 
                />
                <Slider 
                    title="Pipe Distance" 
                    name="pipe_distance"
                    valuemin={20} 
                    valuemax={100} 
                    valuenow={this.state.pipeDistance} 
                    step={10} 
                    onChange={this.handleChange} 
                />
            </div>
            <div id="bird-controls">
                <Slider 
                    title="Bird Radius" 
                    name="bird_radius"
                    valuemin={10} 
                    valuemax={30} 
                    valuenow={this.state.birdRadius} 
                    step={1} 
                    onChange={this.handleChange} 
                />
                <Slider 
                    title="Bird Gravity" 
                    name="bird_gravity"
                    valuemin={0.1} 
                    valuemax={1} 
                    valuenow={this.state.birdGravity} 
                    step={0.1} 
                    onChange={this.handleChange} 
                />
                <Slider 
                    title="Bird Lift" 
                    name="bird_lift"
                    valuemin={-25} 
                    valuemax={-10} 
                    valuenow={this.state.birdLift} 
                    step={1} 
                    onChange={this.handleChange} 
                />
                <Slider 
                    title="Jump Cooldown" 
                    name="jump_cooldown"
                    valuemin={10} 
                    valuemax={60} 
                    valuenow={this.state.jumpCooldown} 
                    step={5} 
                    onChange={this.handleChange} 
                />
            </div>
        </div>
        );
    }
}