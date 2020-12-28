import styles from "./MatrixComponent.module.css";
import { useState } from "react";
import { Matrix } from "./matrix.js";

function rangeInclusive(i, j) {
  let result = [];
  for (let x = i; x <= j; x++) {
    result.push(x);
  }
  return result;
}

export default function MatrixComponent({ matrix: M, editable, field: Field, onChange }) {
  function changeCell(i, j, event) {
    let x = event.target.value;
    let nextM = M.clone();
    nextM.setItem(i, j, new Field(x));
    onChange(nextM);
  }

  function changeDim(n, m) {
    let nextM = Matrix.Zero(n, m);
    for (let i = 1; i <= M.rows; i++) {
      for (let j = 1; j <= M.cols; j++) {
        nextM.setItem(i, j, M.getItem(i, j))
      }
    }
    onChange(nextM);
  }

  let [elements, setElements] = useState({});

  let table = (
    <table>
      <tbody>
        {
          rangeInclusive(1, M.rows).map(i => (
            <tr key={i}>
              {
                rangeInclusive(1, M.cols).map(j => {
                  let x = M.getItem(i, j).toString();
                  let el = editable ?
                    (<input
                      style={{width: x.length + "ch"}}
                      onChange={changeCell.bind(null, i, j)}
                      key={i.toString() + "," + j.toString()}
                      ref={input => setElements(Object.assign(elements, { [`${i},${j}`]: input }))}
                      onClick={() => elements[`${i},${j}`].select()}
                      onKeyDown={event => {
                       try {
                          const t = event.target;
                          const n = t.value.length;
                          const selStart = t.selectionStart;
                          const selEnd = t.selectionEnd;
                          if (selStart === n && selEnd === n && event.key === "ArrowRight") {
                            elements[`${i},${j+1}`].select();
                            event.preventDefault();
                          } else if (selStart === 0 && selEnd === 0 && event.key === "ArrowLeft") {
                            elements[`${i},${j-1}`].select();
                            event.preventDefault();
                          } else if (event.key === "ArrowDown") {
                            elements[`${i+1},${j}`].select();
                            event.preventDefault();
                          } else if (event.key === "ArrowUp") {
                            elements[`${i-1},${j}`].select();
                            event.preventDefault();
                          }
                        } catch (e) {}
                      }}
                      value={x} />) :
                    (<span>{x}</span>);
                  return (
                    <td key={i.toString() + "," + j.toString()}>
                      {el}
                    </td>
                  )
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );

  return (
    <div className={styles.MatrixComponent}>
      <div className={styles.leftParentheses}></div>
      { editable ? (
      <div className={styles.buttonContainer}>
        {table}
        <button className={styles.colAdd} onClick={() => changeDim(M.rows, M.cols + 1)}>+</button>
        <button className={styles.colSub} onClick={() => changeDim(M.rows, M.cols - 1)}>-</button>
        <button className={styles.rowAdd} onClick={() => changeDim(M.rows + 1, M.cols)}>+</button>
        <button className={styles.rowSub} onClick={() => changeDim(M.rows - 1, M.cols)}>-</button>
        <button className={styles.rowColAdd} onClick={() => changeDim(M.rows + 1, M.cols + 1)}>+</button>
        <button className={styles.rowColSub} onClick={() => changeDim(M.rows - 1, M.cols - 1)}>-</button>
      </div>
        )
        : table}
     <div className={styles.rightParentheses}></div>
    </div>
  );
}
