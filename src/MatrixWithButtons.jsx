import MatrixComponent from "./MatrixComponent.jsx";
import styles from "./MatrixWithButtons.module.css";
import RowReduceComponent from "./RowReduceComponent.jsx";

export default function MatrixWithButtons(props) {
  return (
    <div className={styles.matrixWithButtons}>
      <div className={styles.alignCenter}>
        <MatrixComponent
          matrix={props.matrix}
          editable={props.editable}
          field={props.field}
          onChange={props.onChange}
        />
      </div>
      <div>
        <div className={styles.buttons}>
          <button onClick={() =>
            props.setResult({"type": "matrix", "value": props.matrix.transpose()})
          }>Transpose</button>
          <button onClick={() =>
            props.setResult({"type": "element", "value": <RowReduceComponent value={props.matrix.rowReduce()} />})
          }>Row Reduce</button>
          <button onClick={() =>
            props.setResult({"type": "matrix", "value": props.matrix.linearlyIndependentRows()})
          }>Linearly Independent Rows</button>
          <button onClick={() =>
            props.setResult({"type": "text", "value": props.matrix.rank()})
          }>Rank</button>
        </div>
        <div className={styles.buttons} style={{ 
          display: props.matrix.rows === props.matrix.cols ? "block" : "none"
        }}>
          <h3>Square Matrix Operations</h3>
          <button onClick={() => {
            let x = props.matrix.inverse();
            if (x) {
              props.setResult({"type": "matrix", "value": x});
            } else {
              props.setResult({"type": "text", "value": "Not invertible."})
            }
          }}>Inverse</button>
          <button onClick={() =>
            props.setResult({"type": "text", "value": props.matrix.det().toString()})
          }>det</button>
          <button onClick={() =>
            props.setResult({"type": "matrix", "value": props.matrix.adj()})
          }>adj</button>
       </div>
      </div>
    </div>
  );
}
