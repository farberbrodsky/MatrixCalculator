import styles from "./MatrixComponent.module.css";

function rangeInclusive(i, j) {
  let result = [];
  for (let x = i; x <= j; x++) {
    result.push(x);
  }
  return result;
}

export default function MatrixComponent({ matrix, editable, onCellChange }) {
  function change(i, j, event) {
    onCellChange({
      i,
      j,
      value: event.target.value
    })
  }

  return (
    <div className={styles.MatrixComponent}>
      <div className={styles.leftParentheses}></div>
      <div className={styles.buttonContainer}>
        <table>
          <tbody>
            {
              rangeInclusive(1, matrix.rows).map(i => (
                <tr key={i}>
                  {
                    rangeInclusive(1, matrix.cols).map(j => {
                      let x = matrix.getItem(i, j).toString();
                      let el = editable ?
                        (<input
                          style={{width: x.length + "ch"}}
                          onChange={change.bind(null, i, j)}
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
        <button className={styles.colAdd}>+</button>
        <button className={styles.colSub}>-</button>
        <button className={styles.rowAdd}>+</button>
        <button className={styles.rowSub}>-</button>
        <button className={styles.rowColAdd}>+</button>
        <button className={styles.rowColSub}>-</button>
      </div>
      <div className={styles.rightParentheses}></div>
    </div>
  );
}
