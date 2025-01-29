import React, { useEffect, useState } from 'react';
import './warshall.css';

const jsonData = {
  "matrices": [
    { "id": 1, "data": [[0, 0, 1], [0, 0, 1], [1, 0, 0]] },
    { "id": 2, "data": [[0, 1, 0], [0, 0, 0], [0, 1, 0]] },
    { "id": 3, "data": [[1, 0, 0], [0, 1, 0], [0, 0, 1]] },
    { "id": 4, "data": [[0, 0, 1], [0, 1, 0], [0, 1, 0]] },
    { "id": 5, "data": [[0, 0, 0], [1, 0, 1], [0, 0, 0]] },
    { "id": 6, "data": [[1, 0, 0], [1, 1, 0], [0, 1, 1]] },
    { "id": 7, "data": [[0, 1, 0], [0, 0, 1], [1, 0, 0]] },
    { "id": 8, "data": [[1, 1, 0], [1, 0, 1], [0, 1, 0]] },
    { "id": 9, "data": [[0, 0, 1], [1, 0, 0], [0, 0, 1]] },
    { "id": 10, "data": [[1, 1, 1], [0, 1, 0], [0, 0, 1]] }
  ]
};

function Warshall() {
  const [currentMatrix, setCurrentMatrix] = useState(null);
  const [userMatrix, setUserMatrix] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    displayRandomMatrix();
  }, []);

  const displayRandomMatrix = () => {
    const randomMatrix = jsonData.matrices[Math.floor(Math.random() * jsonData.matrices.length)];
    setCurrentMatrix(randomMatrix);
  };

  const warshallAlgorithm = (matrix) => {
    const n = matrix.length;
    const transitiveClosure = matrix.map(row => [...row]);

    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          transitiveClosure[i][j] = transitiveClosure[i][j] || (transitiveClosure[i][k] && transitiveClosure[k][j]);
        }
      }
    }

    return transitiveClosure;
  };

  const handleUpdateButtonClick = () => {
    const correctMatrix = warshallAlgorithm(currentMatrix.data);

    if (JSON.stringify(userMatrix) === JSON.stringify(correctMatrix)) {
      setFeedback('Correct! Well done!');
    } else {
      setFeedback('Wrong answer, try again!');
    }
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedMatrix = [...userMatrix];
    updatedMatrix[rowIndex][colIndex] = parseInt(value, 10) || 0;
    setUserMatrix(updatedMatrix);
  };

  return (
    <div className="container">
      <h2>Question Matrix</h2>
      <div id="matrixContainer">
        {currentMatrix && (
          <table className="matrix-table">
            <tbody>
              {currentMatrix.data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <h2>Answer Matrix</h2>
      <table id="adjacency-matrix">
        <tbody>
          {currentMatrix && currentMatrix.data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    value={userMatrix[rowIndex] ? userMatrix[rowIndex][colIndex] : 0}
                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button id="update-button" onClick={handleUpdateButtonClick}>Update Matrix</button>
      <div id="feedback">{feedback}</div>
    </div>
  );
}

export default Warshall;