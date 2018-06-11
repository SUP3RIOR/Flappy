import { sketch } from "../components/Game";
import Matrix from "./matrix";

interface ActivationFunction {
    func: (x: number) => number;
    dfunc: (y: number) => number;
}

let sigmoid: ActivationFunction = {
    func: x => 1 / (1 + Math.exp(-x)),
    dfunc: y => y * (1 - y)
};

let tanh: ActivationFunction = {
    func: x => Math.tanh(x),
    dfunc: y => 1 - (y * y)
}

export default class Brain {
    learning_rate: number;
    activation_function: ActivationFunction;
    input_nodes: number;
    hidden_nodes: number;
    output_nodes: number;

    weights_input_hidden: Matrix;
    weights_hidden_output: Matrix;
    
    bias_hidden: Matrix;
    bias_output: Matrix;
    constructor(input: number, hidden: number, output: number) {
        this.input_nodes = input;
        this.hidden_nodes = hidden;
        this.output_nodes = output;

        this.weights_input_hidden = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_hidden_output = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weights_input_hidden.randomize();
        this.weights_hidden_output.randomize();

        this.bias_hidden = new Matrix(this.hidden_nodes, 1);
        this.bias_output = new Matrix(this.output_nodes, 1);
        this.bias_hidden.randomize();
        this.bias_output.randomize();

        this.setLearningRate();
        this.setActivationFunction();
    }

    setLearningRate(learning_rate: number = 0.1) {
        this.learning_rate = learning_rate;
    }
    setActivationFunction(func = sigmoid) {
        this.activation_function = func;
    }

    think(input_array: number[]): boolean {
        // Generating the Hidden Outputs
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_input_hidden, inputs);
        hidden.add(this.bias_hidden);
        hidden.map(this.activation_function.func);

        // Generating the output's output!
        let output = Matrix.multiply(this.weights_hidden_output, hidden);
        output.add(this.bias_output);
        output.map(this.activation_function.func);

        let action = output.toArray();
        if (action[1] > action[0]) {
            return true;
        } else {
            return false;
        }
    }

    train(input_array: number[], target_array: number[]) {
        // Generating the Hidden Outputs
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_input_hidden, inputs);
        hidden.add(this.bias_hidden);
        hidden.map(this.activation_function.func);
        
        // Generating the output's output!
        let outputs = Matrix.multiply(this.weights_hidden_output, hidden);
        outputs.add(this.bias_output);
        outputs.map(this.activation_function.func);
        
        // Convert array to matrix object
        let targets = Matrix.fromArray(target_array);
        
        // Calculate the error
        // ERROR = TARGETS - OUTPUTS
        let output_errors = targets.subtract(outputs);
        
        let gradients = outputs.map(this.activation_function.dfunc);
        gradients.multiply(output_errors);
        gradients.multiplyValue(this.learning_rate);
        
        
        // Calculate deltas
        let hidden_T = Matrix.transpose(hidden);
        let weights_hidden_output_deltas = Matrix.multiply(gradients, hidden_T);
        
        // Adjust the weights by deltas
        this.weights_hidden_output.add(weights_hidden_output_deltas);
        // Adjust the bias by its deltas (which is just the gradients)
        this.bias_output.add(gradients);
        
        // Calculate the hidden layer errors
        let who_t = Matrix.transpose(this.weights_hidden_output);
        let hidden_errors = Matrix.multiply(who_t, output_errors);
        
        // Calculate hidden gradient
        let hidden_gradient = hidden.map(this.activation_function.dfunc);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiplyValue(this.learning_rate);
        
        // Calcuate input->hidden deltas
        let inputs_T = Matrix.transpose(inputs);
        let weights_input_hidden_deltas = Matrix.multiply(hidden_gradient, inputs_T);
        
        this.weights_input_hidden.add(weights_input_hidden_deltas);
        // Adjust the bias by its deltas (which is just the gradients)
        this.bias_hidden.add(hidden_gradient);
    }

    serialize(): string {
        return JSON.stringify(this);
    }
    
    static deserialize(value: string) {
        let data = JSON.parse(value);
        let nn = new Brain(data.input_nodes, data.hidden_nodes, data.output_nodes);
        nn.weights_input_hidden = Matrix.deserialize(data.weights_ih);
        nn.weights_hidden_output = Matrix.deserialize(data.weights_ho);
        nn.bias_hidden = Matrix.deserialize(data.bias_h);
        nn.bias_output = Matrix.deserialize(data.bias_o);
        nn.learning_rate = data.learning_rate;
        return nn;
    }
    
    copy() {
        let nn = new Brain(this.input_nodes,this.hidden_nodes,this.output_nodes);
        nn.weights_input_hidden = this.weights_input_hidden.copy();
        nn.weights_hidden_output = this.weights_hidden_output.copy();
        nn.bias_hidden = this.bias_hidden.copy();
        nn.bias_output = this.bias_output.copy();
        return nn;   
    }
    
    mutate(func: (element: number, i: number, j: number) => number) {
        this.weights_input_hidden.map(func);
        this.weights_hidden_output.map(func);
        this.bias_hidden.map(func);
        this.bias_output.map(func);
    }

    static mutate(x: number): number {
        if (sketch.random(1) < 0.1) {
            let offset = sketch.randomGaussian(0,1) * 0.5;
            let newx = x + offset;
            return newx;
        } else {
            return x;
        }
    }
}