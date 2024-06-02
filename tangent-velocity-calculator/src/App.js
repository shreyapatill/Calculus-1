import React, { useState } from "react";
import FunctionInput from "./components/FunctionInput";
import TangentCalculator from "./components/TangentCalculator";
import Graph from "./components/Graph";
import { derivative, evaluate } from "mathjs";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

function App() {
  const [functionInput, setFunctionInput] = useState("");
  const [point, setPoint] = useState("");
  const [slope, setSlope] = useState(null);

  const handleCalculate = (funcInput, pt) => {
    try {
      const slopeValue = evaluate(derivative(funcInput, "x").toString(), {
        x: pt,
      });
      setFunctionInput(funcInput);
      setPoint(pt);
      setSlope(slopeValue);
    } catch (error) {
      console.error("Error calculating the slope: ", error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">
        Interactive Tangent and Velocity Calculator
      </h1>
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <FunctionInput onCalculate={handleCalculate} />
        </Col>
      </Row>
      {slope !== null && (
        <>
          <Row className="justify-content-center mb-4">
            <Col md={6}>
              <TangentCalculator functionInput={functionInput} point={point} />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8}>
              <Graph
                functionInput={functionInput}
                point={point}
                slope={slope}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default App;
