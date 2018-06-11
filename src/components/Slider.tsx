import { MDCSlider } from '@material/slider';
import * as React from 'react';

interface Props {
    title: string;
    name: string;
    valuemin: number;
    valuemax: number;
    valuenow: number;
    step: number;
    onChange: (name: string, value: number) => void;
}

export default class Slider extends React.Component<Props> {
    slider: MDCSlider;

    componentDidMount() {
        this.slider = new MDCSlider(document.querySelector('#' + this.props.name + 'Slider'));
        this.slider.listen('MDCSlider:change', () => {
            this.props.onChange(this.props.name,this.slider.value);
        });
    }

    render() {
        return (
            <div>
                <div>
                    <span className="mdc-typography--subtitle1">{this.props.title}: </span>
                    <span className="mdc-typography--subtitle2">{this.props.valuenow}</span>
                </div>
                <div 
                    id={this.props.name + 'Slider'} 
                    className="mdc-slider" 
                    tabIndex={0}
                    role="slider" 
                    aria-valuemin={this.props.valuemin} 
                    aria-valuemax={this.props.valuemax} 
                    aria-valuenow={this.props.valuenow} 
                    data-step={this.props.step}
                >
                    <div className="mdc-slider__track-container">
                        <div className="mdc-slider__track"></div>
                    </div>
                    <div className="mdc-slider__thumb-container">
                        <div className="mdc-slider__pin">
                            <span className="mdc-slider__pin-value-marker"></span>
                        </div>
                        <svg className="mdc-slider__thumb" width="21" height="21">
                            <circle cx="10.5" cy="10.5" r="7.875"></circle>
                        </svg>
                        <div className="mdc-slider__focus-ring"></div>
                    </div>
                </div>
            </div>
        );
    }
}