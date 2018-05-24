export default class Matrix {
    rows: number;
    cols: number;
    data: number[][];

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array<number>(this.rows).fill(0).map(() => Array<number>(this.cols).fill(0));
    }

    subtract(other: Matrix): Matrix {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            return;
        }
        return this.map((e, i, j) => e - other.data[i][j]);
    }
    randomize(): Matrix {
        return this.map(e => Math.random() * 2 - 1);
    }
    add(other: Matrix): Matrix {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            return;
        }
        return this.map((e, i, j) => e + other.data[i][j]);
    }
    addValue(n: number): Matrix {
        return this.map(e => e + n);
    }
    static multiply(a: Matrix, b: Matrix): Matrix {
        if (a.cols !== b.rows) {
            return;
        }
        return new Matrix(a.rows, b.cols).map((e, i, j) => {
            let sum = 0;
            for (let k = 0; k < a.cols; k++) {
              sum += a.data[i][k] * b.data[k][j];
            }
            return sum;
        });
    }
    multiply(other: Matrix): Matrix {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            return;
        }
        return this.map((e,i,j) => e * other.data[i][j]);
    }
    multiplyValue(n: number): Matrix {
        return this.map(e => e * n);
    }

    copy(): Matrix {
        let matrix = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                matrix.data[i][j] = this.data[i][j];
            }
        }
        return matrix;
    }

    static transpose(matrix: Matrix): Matrix {
        return new Matrix(matrix.cols, matrix.rows).map((e, i, j) => matrix.data[j][i]);
    }

    toArray(): number[] {
        let array = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                array.push(this.data[i][j]);
            }
        }
        return array;
    }
    static fromArray(array: number[]): Matrix {
        return new Matrix(array.length, 1).map((e,i) => array[i]);
    }

    //Führt eine Funktion für jedes element in der Matrix durch
    map(func: (element: number, i: number, j: number) => number): Matrix {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let val = this.data[i][j];
                this.data[i][j] = func(val, i, j);
            }
        }
        return this;
    }

    print(): Matrix {
        console.table(this.data);
        return this;
    }

    serialize(): string {
        return JSON.stringify(this);
    }

    static deserialize(value: string): Matrix {
        let data = JSON.parse(value);
        let matrix = new Matrix(data.rows, data.cols);
        matrix.data = data.data;
        return matrix;
    }
}