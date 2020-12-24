import MatrixComponent from "./MatrixComponent.jsx";

function OneRow(args) {
  if (args[0] === "mul") {
    return (<p>R{args[1]} to R{args[1]} * {args[2].toString()}</p>);
  } else if (args[0] === "add") {
    return (<p>R{args[1]} to R{args[1]} + {args[2]} * {(args[3] || 1).toString()}</p>);
  } else if (args[0] === "swap") {
    return (<p>swap R{args[1]} and R{args[2]}</p>)
  }
}

export default function RowReduceComponent({ value }) {
  let rows = value[0];
  let result = value[1];
  return (
    <div>
      {rows.map(r => OneRow(r))}
      <p>Result:</p>
      <MatrixComponent matrix={result} />
    </div>
  );
}
