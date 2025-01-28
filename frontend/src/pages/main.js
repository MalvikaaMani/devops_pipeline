import React from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';

function Main() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="card">
      <h2>Main Page</h2>
      <div className="button-container">
        <button onClick={() => navigateTo('/path_finder')}>Path Finder</button>
        <button onClick={() => navigateTo('/relation')}>Relation</button>
        <button onClick={() => navigateTo('/warshall')}>Warshall</button>
      </div>
    </div>
  );
}

export default Main;