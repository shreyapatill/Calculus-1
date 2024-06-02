import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { evaluate } from "mathjs";

function FunctionInput({ onCalculate }) {
  const [functionInput, setFunctionInput] = useState("");
  const [point, setPoint] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate function input
    try {
      evaluate(functionInput, { x: 1 }); // Test with a dummy value to check if the function is valid
    } catch (err) {
      setError(
        "Invalid function input. Please enter a valid mathematical expression."
      );
      return;
    }

    // Validate point input
    if (isNaN(point) || point === "") {
      setError("Invalid point input. Please enter a valid number.");
      return;
    }

    onCalculate(functionInput, parseFloat(point));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3" controlId="functionInput">
        <Form.Label>Enter function f(x)</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. x^2"
          value={functionInput}
          onChange={(e) => setFunctionInput(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="pointInput">
        <Form.Label>Enter point x = a</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. 1"
          value={point}
          onChange={(e) => setPoint(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Calculate
      </Button>
    </Form>
  );
}

export default FunctionInput;
