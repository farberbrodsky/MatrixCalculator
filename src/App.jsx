import MatrixComponent from "./MatrixComponent.jsx";
import { Matrix, Real } from "./matrix.js";
import { useState } from "react";
import styles from "./App.module.css"

function App() {
  let [M1, setM1] = useState(Matrix.Zero(3, 3, new Real(0)));
  let [M2, setM2] = useState(Matrix.Zero(3, 3, new Real(0)));
  let [result, setResult] = useState(undefined);

  return (
    <div className="App">
      <h1 className={styles.title}>Misha's Matrix Calculator</h1>
      <div className={styles.twoMatrices}>
        <div className={styles.leftMatrix}>
          <MatrixComponent
            matrix={M1}
            editable={true}
            onChange={m => {
              setM1(m);
            }}
          />
        </div>
        <div className={styles.twoMatricesOperators}>
          <button onClick={() => { let temp = M1; setM1(M2); setM2(temp); }}>Swap A, B</button>
          { M1.cols === M2.rows ? (
            <button onClick={() => setResult(M1.mul(M2))}>A ⨉ B</button>
          ) : null}
          { M1.rows === M2.rows && M1.cols === M2.cols ? (
            <button onClick={() => setResult(M1.add(M2))}>A + B</button>
          ) : null}
          <button onClick={() => setResult(M1.transpose())}>A transpose</button>
          { M1.rows === M1.cols ? (
            <div className={styles.twoMatricesOperators}>
              <p><b>Square Matrix Operations</b></p>
              <button onClick={() => setResult(M1.inverse())}>Inverse A</button>
              <button onClick={() => setResult(new Matrix([M1.det()], 1, 1))}>det(A)</button>
              <button onClick={() => setResult(M1.adj())}>adj(A)</button>
            </div>
            ) : null}
        </div>
        <div className={styles.rightMatrix}>
          <MatrixComponent
            matrix={M2}
            editable={true}
            onChange={m => {
              setM2(m);
            }}
          />
        </div>
      </div>
      <h1>Result:</h1>
      { result ? (
        <div>
          <MatrixComponent
            matrix={result}
          />
          <br /><br />
          <button onClick={() => setM1(result)}>Save as A</button>
          <button onClick={() => setM2(result)}>Save as B</button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
