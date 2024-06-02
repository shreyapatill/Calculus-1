import React from "react";
import { Card } from "react-bootstrap";
import { derivative, evaluate } from "mathjs";

function TangentCalculator({ functionInput, point }) {
  let slope;
  let tangentLine;

  try {
    slope = evaluate(derivative(functionInput, "x").toString(), { x: point });
    tangentLine = `y = ${slope} * (x - ${point}) + ${evaluate(functionInput, {
      x: point,
    })}`;
  } catch (error) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Error</Card.Title>
          <Card.Text>
            An error occurred while calculating the tangent line. Please check
            your inputs.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Tangent Line at x = {point}</Card.Title>
        <Card.Text>
          <strong>Slope:</strong> {slope}
        </Card.Text>
        <Card.Text>
          <strong>Equation:</strong> {tangentLine}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TangentCalculator;
