import React, { useState } from 'react';
import './main.css';
import Warshall from './warshall';
import PathFinder from './path_finder';
import Relation from './relation';

function Main() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="main-container">
      {activeComponent === 'Warshall' && <Warshall />}
      {activeComponent === 'PathFinder' && <PathFinder />}
      {activeComponent === 'Relation' && <Relation />}
      {!activeComponent && (
        <div className="card">
          <h2>Main Page</h2>
          <div className="button-container">
            <button onClick={() => handleButtonClick('PathFinder')}>Path Finder</button>
            <button onClick={() => handleButtonClick('Warshall')}>Warshall</button>
            <button onClick={() => handleButtonClick('Relation')}>Relation</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;