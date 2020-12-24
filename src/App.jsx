import MatrixComponent from "./MatrixComponent.jsx";
import MatrixWithButtons from "./MatrixWithButtons.jsx";
import FieldSelector from "./FieldSelector.jsx";
import { Matrix, Rational } from "./matrix.js";
import { useState } from "react";
import styles from "./App.module.css"

function App() {
  let [M1, setM1] = useState(Matrix.Zero(3, 3, new Rational(0)));
  let [M2, setM2] = useState(Matrix.Zero(3, 3, new Rational(0)));
  let [result, setResult] = useState(undefined);
  let [fieldName, setFieldName] = useState("Rational");
  let [fieldClass, setFieldClass] = useState([Rational]);

  function fieldChanged(fieldName, fieldClass) {
    setM1(Matrix.Zero(3, 3, new fieldClass(0)));
    setM2(Matrix.Zero(3, 3, new fieldClass(0)));
    setFieldClass([fieldClass]);
    setFieldName(fieldName);
  }

  let formattedResult = undefined;
  if (result && result.type === "matrix") {
    formattedResult =  (
      <div>
        <MatrixComponent
          matrix={result.value}
        />
        <br /><br />
        <button onClick={() => setM1(result.value)}>Save as A</button>
        <button onClick={() => setM2(result.value)}>Save as B</button>
      </div>
     );
  } else if (result && result.type === "text") {
    formattedResult = (<p>{ result.value }</p>)
  } else if (result && result.type === "element") {
    formattedResult = result.value;
  }

  return (
    <div className="App">
      <div style={{display: "flex"}}>
        <div className={styles.flexGrow}>
          <FieldSelector fieldName={fieldName} setField={fieldChanged} />
        </div>
        <h1 className={styles.title}>Matrisha</h1>
        <div className={styles.flexGrow}></div>
      </div>
      <div className={styles.twoMatrices}>
        <div className={styles.leftMatrix}>
          <MatrixWithButtons
            matrix={M1}
            editable={true}
            field={fieldClass[0]}
            onChange={m => {
              setM1(m);
            }}
            setResult={setResult}
          />
        </div>
        <div className={styles.twoMatricesOperators}>
          <button onClick={() => { let temp = M1; setM1(M2); setM2(temp); }}>Swap A, B</button>
          { M1.cols === M2.rows ? (
            <button onClick={() => setResult({"type": "matrix", "value": M1.mul(M2)})}>A × B</button>
          ) : null}
          { M1.rows === M2.rows && M1.cols === M2.cols ? (
            <button onClick={() => setResult({"type": "matrix", "value": M1.add(M2)})}>A + B</button>
          ) : null}
        </div>
        <div className={styles.rightMatrix}>
          <MatrixWithButtons
            matrix={M2}
            editable={true}
            field={fieldClass[0]}
            onChange={m => {
              setM2(m);
            }}
            setResult={setResult}
          />
        </div>
      </div>
      <h1>Result:</h1>
      {formattedResult}
    </div>
  );
}

export default App;
