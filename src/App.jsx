import MatrixComponent from "./MatrixComponent.jsx";
import { Matrix, Real } from "./matrix.js";
import { useState } from "react";

function App() {
  let [M, setM] = useState(Matrix.Zero(3, 3, new Real(0)));
  return (
    <div className="App">
      <h1>Matrix Calculator</h1>
      <MatrixComponent matrix={M} editable={true} onCellChange={({i, j, value}) => {
        let x = parseInt(value);
        let nextM = M.clone();
        if (isNaN(x)) {
          nextM.setItem(i, j, new Real(0));
        } else {
          nextM.setItem(i, j, new Real(x));
        }
        setM(nextM);
      }} />
      <MatrixComponent matrix={M} />
    </div>
  );
}

export default App;
