import * as React from 'react';

export var sketch: p5;

interface Props {
    start: () => void;
}

export default class Canvas extends React.Component<Props> {
    render() {
        return (
            <div id="canvas">
                <button id="start" className="mdc-button mdc-button--raised" onClick={this.props.start}>Start</button>
            </div>
        );
    }   
}