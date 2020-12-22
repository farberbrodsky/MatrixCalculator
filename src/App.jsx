import MatrixComponent from "./MatrixComponent.jsx";
import { Matrix, Real } from "./matrix.js";
import { useState } from "react";

function App() {
  let [M, setM] = useState(Matrix.Zero(3, 3, new Real(0)));
  return (
    <div className="App">
      <h1>Matrix Calculator</h1>
      <MatrixComponent
        matrix={M}
        editable={true}
        onChange={m => {
          setM(m)
        }}
      />
      <MatrixComponent matrix={M} />
    </div>
  );
}

export default App;
