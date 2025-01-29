import React, { useState, useRef, useEffect } from "react";
import "./GraphVisualizer.css";

function GraphVisualizer({ nodes, questionMatrix, submitMatrix }) {
  const [connections, setConnections] = useState([]);
  const [draggingFromNode, setDraggingFromNode] = useState(null);
  const [userMatrix, setUserMatrix] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Reset connections and user matrix when nodes change
    setConnections([]);
    setUserMatrix(Array(nodes.length).fill().map(() => Array(nodes.length).fill(0)));
  }, [nodes]);

  const getNodeUnderCursor = (x, y) => {
    return nodes.find((node) => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= 30;
    });
  };

  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const node = getNodeUnderCursor(x, y);
    if (node) setDraggingFromNode(node);
  };

  const handleMouseUp = (event) => {
    if (!draggingFromNode) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const targetNode = getNodeUnderCursor(x, y);

    if (targetNode) {
      const isSelfLoop = targetNode === draggingFromNode;
      const newConnection = { from: draggingFromNode.index, to: targetNode.index, type: isSelfLoop ? "self-loop" : "directed" };

      setConnections((prev) => [...prev, newConnection]);
      setUserMatrix((prev) => {
        const newMatrix = prev.map((row) => [...row]);
        newMatrix[draggingFromNode.index][targetNode.index] = 1;
        return newMatrix;
      });
    }

    setDraggingFromNode(null);
  };

  const handleMouseMove = (event) => {
    if (!draggingFromNode) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections(ctx);
    drawNodes(ctx);

    ctx.beginPath();
    ctx.moveTo(draggingFromNode.x, draggingFromNode.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "red";
    ctx.stroke();
  };

  const handleUndo = () => {
    if (connections.length === 0) return;

    const lastConnection = connections[connections.length - 1];
    setConnections((prev) => prev.slice(0, -1));
    setUserMatrix((prev) => {
      const newMatrix = prev.map((row) => [...row]);
      newMatrix[lastConnection.from][lastConnection.to] = 0;
      return newMatrix;
    });
  };

  const drawConnections = (ctx) => {
    if (nodes.length === 0) return; // Prevent drawing if there are no nodes

    connections.forEach((conn) => {
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];

      if (fromNode && toNode) {
        if (fromNode === toNode) {
          // Draw semicircle for self-loop
          const radius = 30; // Radius of the semicircle
          const centerX = fromNode.x;
          const centerY = fromNode.y - radius; // Position directly above the node

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, Math.PI, 0); // Draw semicircle
          ctx.strokeStyle = "#000"; // Set semicircle color to black
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw line connecting the node to the semicircle
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y); // Start at the node
          ctx.lineTo(centerX, centerY); // Connect to the center of the semicircle
          ctx.strokeStyle = "#000"; // Set line color to black
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          // Draw straight line for normal connections
          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          const angle = Math.atan2(dy, dx);
          const arrowX = toNode.x - 30 * Math.cos(angle);
          const arrowY = toNode.y - 30 * Math.sin(angle);

          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(arrowX, arrowY);
          ctx.strokeStyle = "#000"; // Set line color to black
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw arrowhead with black color
          ctx.beginPath();
          ctx.moveTo(arrowX, arrowY);
          ctx.lineTo(
            arrowX - 10 * Math.cos(angle - Math.PI / 6),
            arrowY - 10 * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            arrowX - 10 * Math.cos(angle + Math.PI / 6),
            arrowY - 10 * Math.sin(angle + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fillStyle = "#000"; // Change arrow color to black
          ctx.fill();
        }
      }
    });
  };

  const drawNodes = (ctx) => {
    nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 30, 0, Math.PI * 2);
      ctx.fillStyle = "lightblue";
      ctx.fill();
      ctx.strokeStyle = "teal";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.label, node.x, node.y);
    });
  };

  const handleSubmit = () => {
    submitMatrix(userMatrix);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections(ctx);
    drawNodes(ctx);
  }, [nodes, connections]);

  return (
    <div className="graph-visualizer-container">
      <div className="table-container">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ border: "1px solid black", cursor: "crosshair" }}
        ></canvas>
      </div>
      <div className="button-container">
        <button onClick={handleSubmit}>Submit Matrix</button>
        <button onClick={handleUndo}>Undo</button>
      </div>
    </div>
  );
}

export default GraphVisualizer;
