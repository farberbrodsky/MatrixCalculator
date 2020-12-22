export class Real {
  className = "Real";

  constructor(x) {
    this.x = x;
  }

  add(y) {
    if (y.className === "Real") {
      return new Real(this.x + y.x);
    } else {
      return y.add(this);
    }
  }

  sub(y) {
    return this.add(y.neg());
  }

  mul(y) {
    if (y.className === "Real") {
      return new Real(this.x * y.x);
    } else {
      return y.mul(this);
    }
  }

  neg() {
    return new Real(-this.x);
  }

  opposite() {
    return new Real(1 / this.x);
  }

  toString() {
    return this.x.toString();
  }

  isZero() {
    return this.x === 0;
  }

  isOne() {
    return this.x === 1;
  }
}

export function ZnField(n) {
  return class Zn {
    className = "Z" + n.toString();

    constructor(x) {
      this.x = x % n;
    }

    add(y) {
      if (y.className === this.className) {
        return new Zn((this.x + y.x) % n);
      } else if (y.className === "Real") {
        return new Zn((this.x + Math.floor(y.x)) % n);
      } else {
        return y.add(this);
      }
    }

    sub(y) {
      return this.add(y.neg());
    }

    mul(y) {
      if (y.className === this.className) {
        return new Zn((this.x * y.x) % n);
      } else if (y.className === "Real") {
        return new Zn((this.x * Math.floor(y.x)) % n);
      } else {
        return y.mul(this);
      }
    }

    neg() {
      return new Zn(n - this.x);
    }

    opposite() {
      for (let i = 1; i < n; i++) {
        if ((this.x * i) % n === 1) {
          return new Zn(i);
        }
      }
    }

    toString() {
      return this.x.toString();
    }

    isZero() {
      return this.x === 0;
    }

    isOne() {
      return this.x === 1;
    }
  };
}

export class Matrix {
  className = "Matrix";

  constructor(mat, rows, cols) {
    this.mat = mat;
    this.rows = rows;
    this.cols = cols;
  }

  getItem(i, j) {
    return this.mat[i - 1 + (j - 1) * this.rows];
  }

  setItem(i, j, x) {
    this.mat[i - 1 + (j - 1) * this.rows] = x;
  }

  toString() {
    let colWidth = new Array(this.cols).fill(0);
    for (let i = 1; i <= this.rows; i++) {
      for (let j = 1; j <= this.cols; j++) {
        let strLen = this.getItem(i, j).toString().length;
        if (strLen > colWidth[j]) {
          colWidth[j] = strLen;
        }
      }
    }
    let result = "";
    for (let i = 1; i <= this.rows; i++) {
      for (let j = 1; j <= this.cols; j++) {
        let str = this.getItem(i, j).toString();
        str = str.padEnd(colWidth[j], " ");
        result += str;
        if (j !== this.cols) {
          result += " ";
        }
      }
      if (i !== this.rows) {
        result += "\n";
      }
    }
    return result;
  }

  add(other) {
    let result = Matrix.Zero(Math.min(this.rows, other.rows), Math.min(this.cols, other.cols));
    for (let i = 1; i <= result.rows; i++) {
      for (let j = 1; j <= result.cols; j++) {
        result.setItem(i, j, this.getItem(i, j).add(other.getItem(i, j)));
      }
    }
    return result;
  }

  mul(other) {
    let result = Matrix.Zero(this.rows, other.cols);
    for (let i = 1; i <= this.rows; i++) {
      for (let j = 1; j <= other.cols; j++) {
        // (AB)_i,j=sum(k=1,n,A_i,k * B_k,j)
        let val = new Real(0);
        for (let k = 1; k <= this.cols; k++) {
          let x = this.getItem(i, k).mul(other.getItem(k, j));
          val = val.add(x);
        }
        result.setItem(i, j, val);
      }
    }
    return result;
  }

  minor(iCut, jCut) {
    let mat = Matrix.Zero(this.rows - 1, this.cols - 1);
    for (let i = 1; i <= this.rows - 1; i++) {
      for (let j = 1; j <= this.cols - 1; j++) {
        let resultI = i;
        if (i >= iCut) {
          resultI += 1;
        }
        let resultJ = j;
        if (j >= jCut) {
          resultJ += 1;
        }
        mat.setItem(i, j, this.getItem(resultI, resultJ));
      }
    }
    return mat;
  }

  // detTmurot() {
  //   if (this.rows != this.cols) {
  //     return 0;
  //   }
  //   const n = this.rows;
  //   // Get the signed tmurot. e.g. [[1, [0, 1]], [-1, [1, 0]]]
  //   function getTmurot(n) {
  //     if (n == 1) {
  //       return [[1, [0]]];
  //     }
  //     let t = getTmurot(n - 1);
  //     let result = [];
  //     for (let tx of t) {
  //       result.push([tx[0], tx[1].concat([n - 1])]);
  //       for (let i = 0; i < (n - 1); i++) {
  //         let new_tmura = tx[1].slice();
  //         let temp = new_tmura[i];
  //         new_tmura[i] = n - 1;
  //         new_tmura.push(temp);
  //         result.push([-tx[0], new_tmura]);
  //       }
  //     }
  //     return result;
  //   }

  //   let tmurot = getTmurot(n);
  //   let result = new Real(0);
  //   for (let [sign, tmura] of tmurot) {
  //     let x = new Real(sign);
  //     for (let i = 1; i <= n; i++) {
  //       x = x.mul(this.getItem(i, tmura[i - 1] + 1));
  //     }
  //     result = result.add(x);
  //   }
  //   return result;
  // }

  det() {
    let [ops, res] = this.rowReduce();
    for (let i = 1; i <= res.rows; i++) {
      if (res.getItem(i, i).isZero()) {
        return new Real(0); // not invertible
      }
    }
    let result = new Real(1);
    for (let op of ops) {
      if (op[0] === "swap") {
        result = result.neg();
      } else if (op[0] === "mul") {
        result = result.mul(op[2].opposite());
      }
    }
    return result;
  }

  adj() {
    let result = Matrix.Zero(this.cols, this.rows);
    for (let i = 1; i <= this.rows; i++) {
      for (let j = 1; j <= this.cols; j++) {
        let x = new Real(Math.pow(-1, j + i)).mul(this.minor(j, i).det());
        result.setItem(i, j, x);
      }
    }
    return result;
  }

  swapRowsInplace(i, j) {
    /// R_i <-> R_j
    for (let k = 1; k <= this.cols; k++) {
      let temp = this.getItem(i, k);
      this.setItem(i, k, this.getItem(j, k));
      this.setItem(j, k, temp);
    }
  }

  addRowInplace(i, j, x) {
    /// R_i -> R_i + x*R_j
    for (let k = 1; k <= this.cols; k++) {
      this.setItem(i, k, this.getItem(i, k).add(x.mul(this.getItem(j, k))));
    }
  }

  multiplyRowInplace(i, x) {
    /// R_i -> x*R_i
    for (let k = 1; k <= this.cols; k++) {
      this.setItem(i, k, x.mul(this.getItem(i, k)));
    }
  }

  applyRowOperation(name, ...args) {
    if (name === "swap") {
      this.swapRowsInplace(...args);
    } else if (name === "add") {
      this.addRowInplace(...args);
    } else if (name === "mul") {
      this.multiplyRowInplace(...args);
    }
  }

  rowReduce() {
    // Move zero rows to the bottom
    let res = this.clone();
    let actions = [];
    let lastZeroRow = res.rows + 1;
    for (let i = 1; i <= (lastZeroRow - 1); i++) {
      let good = true;
      for (let k = 1; k <= res.cols; k++) {
        if (!res.getItem(i, k).isZero()) {
          good = false;
          break;
        }
      }
      if (good) {
        lastZeroRow -= 1;
        res.swapRowsInplace(i, lastZeroRow);
        actions.push(["swap", i, lastZeroRow]);
      }
    }
    
    let i = 1;
    for (let j = 1; j <= res.cols; j++) {
      // Find the first row with this coefficient
      let r, found = false;
      for (r = i; r <= res.rows; r++) {
        if (!res.getItem(r, j).isZero()) {
          found = true;
          break;
        }
      }
      if (found) {
        if (r !== i) {
          // Swap to get the coefficient on the right row
          res.swapRowsInplace(r, i);
          actions.push(["swap", r, i]);
          r = i;
        }
        i += 1;
        // Divide row to get it to be one
        let rx = res.getItem(r, j);
        if (!rx.isOne() && !rx.isZero()) {
          let x = rx.opposite();
          res.multiplyRowInplace(r, x);
          actions.push(["mul", r, x]);
        }
        // Remove row from all others to cancel the coefficient
        for (let k = 1; k <= res.rows; k++) {
          if (k !== r && !res.getItem(k, j).isZero()) {
            let x = res.getItem(k, j).neg();
            res.addRowInplace(k, r, x);
            actions.push(["add", k, r, x]);
          }
        }
      }
    }
    return [actions, res];
  }

  linearlyIndependentRows() {
    const [ops] = this.rowReduce();
    // Apply ops but not swaps
    const res = this.clone();
    let swaps = [0]; // Current swap order
    for (let i = 1; i <= this.cols; i++) {
      swaps.push(i);
    }
    for (let op of ops) {
      if (op[0] === "mul") {
        res.applyRowOperation("mul", swaps[op[1]], op[2]);
      } else if (op[0] === "add") {
        res.applyRowOperation("add", swaps[op[1]], swaps[op[2]], op[3]);
      } else if (op[0] === "swap") {
        let temp = swaps[op[1]];
        swaps[op[1]] = swaps[op[2]];
        swaps[op[2]] = temp;
      }
    }
    // Remove all zero rows
    let mat = [];
    let matRows = 0;
    for (let i = 1; i <= res.rows; i++) {
      let row = [];
      let isZeroRow = true;
      for (let j = 1; j <= res.cols; j++) {
        if (!res.getItem(i, j).isZero()) {
          isZeroRow = false;
        }
        row.push(this.getItem(i, j));
      }
      if (!isZeroRow) {
        matRows += 1;
        mat = mat.concat(row);
      }
    }
    return new Matrix(mat, this.cols, matRows).transpose();
  }
  
  transpose() {
    let result = Matrix.Zero(this.cols, this.rows);
    for (let i = 1; i <= this.cols; i++) {
      for (let j = 1; j <= this.rows; j++) {
        result.setItem(i, j, this.getItem(j, i));
      }
    }
    return result;
  }

  inverse() {
    if (this.rows !== this.cols) {
      return;
    }
    const n = this.rows;
    let [ops, res] = this.rowReduce();
    for (let i = 1; i <= n; i++) {
      if (!res.getItem(i, i).isOne()) {
        return;
      }
    }
    // Do ops on res, in the opposite order
    for (let op of ops) {
      res.applyRowOperation(...op);
    }
    return res;
  }

  clone() {
    return new Matrix(this.mat.slice(), this.rows, this.cols);
  }

  static Identity(n, zero, one) {
    let mat = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        mat.push(j === i ? (one || new Real(1)) : (zero || new Real(0)));
      }
    }
    return new Matrix(mat, n, n);
  }

  static Zero(m, n, zero) {
    let mat = new Array(m * n).fill(zero || new Real(0));
    return new Matrix(mat, m, n)
  }
}
