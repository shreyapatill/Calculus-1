import React from "react";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs";

function Graph({ functionInput, point, slope }) {
  let xValues, yValues, tangentYValues;

  try {
    xValues = Array.from({ length: 100 }, (_, i) => i / 10 - 5);
    yValues = xValues.map((x) => evaluate(functionInput, { x }));
    tangentYValues = xValues.map(
      (x) => slope * (x - point) + evaluate(functionInput, { x: point })
    );
  } catch (error) {
    return <p>Error plotting the graph. Please check your inputs.</p>;
  }

  return (
    <Plot
      data={[
        {
          x: xValues,
          y: yValues,
          type: "scatter",
          mode: "lines",
          name: "f(x)",
        },
        {
          x: xValues,
          y: tangentYValues,
          type: "scatter",
          mode: "lines",
          name: "Tangent Line",
        },
      ]}
      layout={{ title: "Function and Tangent Line" }}
    />
  );
}

export default Graph;
