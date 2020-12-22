import MatrixComponent from "./MatrixComponent.jsx";
import { Matrix, Real, ZnField } from "./matrix.js";
import { useState } from "react";
import styles from "./App.module.css"

function App() {
  let [M1, setM1] = useState(Matrix.Zero(3, 3, new Real(0)));
  let [M2, setM2] = useState(Matrix.Zero(3, 3, new Real(0)));
  let [result, setResult] = useState(undefined);
  let [field, setField] = useState("R");
  let [fieldN, setFieldN] = useState(2);

  let fieldClass;

  if (field === "R") {
    fieldClass = Real;
  } else if (field === "Zn") {
    fieldClass = ZnField(fieldN);
  }

  function fieldChanged() {
    setM1(Matrix.Zero(3, 3, new fieldClass(0)));
    setM2(Matrix.Zero(3, 3, new fieldClass(0)));
  }

  return (
    <div className="App">
      <select value={field} onChange={(event) => {setField(event.target.value); fieldChanged();}}>
        <option value="R">R</option>
        <option value="Zn">Zn</option>
      </select>
      <input
        disabled={field !== "Zn"}
        value={fieldN}
        onChange={(event) => {setFieldN(event.target.value); fieldChanged();}}
        type="number"
        min="2"
      />
      <h1 className={styles.title}>Misha's Matrix Calculator</h1>
      <div className={styles.twoMatrices}>
        <div className={styles.leftMatrix}>
          <MatrixComponent
            matrix={M1}
            editable={true}
            field={fieldClass}
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
            field={fieldClass}
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
