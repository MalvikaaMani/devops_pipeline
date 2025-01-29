import React, { useState, useEffect } from "react";
import GraphVisualizer from "../components/GraphVisualizer"; // Update the path as needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './path_finder.css'; // Assuming you have a CSS file for PathFinder

const BASE_URL = "http://127.0.0.1:8000";

async function fetchRandomQuestion() {
  const response = await fetch(`${BASE_URL}/pathfinder/question`);
  if (!response.ok) {
    throw new Error("Failed to fetch question");
  }
  return response.json();
}

async function validateMatrix(id, matrix) {
  const response = await fetch(`${BASE_URL}/pathfinder/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, matrix }),
  });

  if (!response.ok) {
    throw new Error("Matrix validation failed");
  }
  
  return response.json();
}

function PathFinder() {
  const [nodes, setNodes] = useState([]);
  const [questionId, setQuestionId] = useState(null);
  const [questionMatrix, setQuestionMatrix] = useState([]);
  const [question, setQuestion] = useState("");  // State to hold the question text

  const getQuestion = async () => {
    try {
      const question = await fetchRandomQuestion();
      console.log("Question fetched:", question); // Debugging log
      const { id, n, question: matrix, question_text } = question;
      setQuestionId(id);
      setQuestionMatrix(matrix);
      setQuestion(question_text);  // Set the question text

      const angleStep = (2 * Math.PI) / n;
      const generatedNodes = Array.from({ length: n }, (_, i) => ({
        index: i,
        label: `Node ${i + 1}`,
        x: 300 + 200 * Math.cos(i * angleStep),
        y: 300 + 200 * Math.sin(i * angleStep),
      }));

      setNodes(generatedNodes);
    } catch (error) {
      console.error("Failed to fetch the question:", error); // Debugging log
      alert("Failed to fetch the question: " + error.message);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const handleMatrixSubmission = async (userMatrix) => {
    try {
      const result = await validateMatrix(questionId, userMatrix);
      if (result.result) {
        toast.success("Matrix is valid!");
      } else {
        toast.error("Matrix validation failed!");
      }
    } catch (error) {
      toast.error("Error validating matrix: " + error.message);
    }
  };

  const handleNewQuestion = () => {
    setNodes([]);
    setQuestionMatrix([]);
    setQuestion("");
    setQuestionId(null);
    getQuestion();
  };

  return (
    <div className="app-container">
      <h1>PATH CONNECTER</h1>

      <div className="table-container">
        {/* Display the adjacency matrix */}
        <div className="question-container">
          <h3>Adjacency Matrix:</h3>
          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              {questionMatrix.map((row, i) => (
                <tr key={i}>
                  {row.map((value, j) => (
                    <td key={j}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <GraphVisualizer 
          nodes={nodes} 
          questionMatrix={questionMatrix}
          submitMatrix={handleMatrixSubmission} 
        />
      </div>

      <div className="button-container">
        <button onClick={handleNewQuestion} >Generate New Question</button> {/* New button */}
      </div>

      <ToastContainer />
    </div>
  );  
}

export default PathFinder;