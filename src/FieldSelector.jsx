import { Rational, ZnField } from "./matrix.js";
import { useState } from "react";

export default function FieldSelector({ fieldName, setField }) {
  let [num, setNum] = useState(2);
  return (
    <div>
      <select value={fieldName} onChange={(event) => {
        let name = event.target.value;
        if (name === "Rational") {
          setField(name, Rational);
        } else if (name === "Zn") {
          setField(name, ZnField(num));
        }
      }}>
        <option value="Rational">Q</option>
        <option value="Zn">Zn</option>
      </select>
      { fieldName === "Zn" ? (
        <input value={num} onChange={(event) => {
          let x = parseInt(event.target.value);
          try {
            x = parseInt(x);
          } catch { return; }
          
          if (x >= 2) {
            setNum(x);
            setField("Zn", ZnField(x));
          }
        }} />
      ) : null }
   </div>
  );
}
