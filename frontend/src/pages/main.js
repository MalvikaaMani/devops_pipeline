import React, { useState } from 'react';
import './main.css';
import Warshall from './warshall';
import PathFinder from './path_finder'; // Assuming you have a PathFinder component
import Relation from './relation'; // Assuming you have a Relation component

function Main() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="card">
      {activeComponent === 'Warshall' && <Warshall />}
      {activeComponent === 'PathFinder' && <PathFinder />}
      {activeComponent === 'Relation' && <Relation />}
      {!activeComponent && (
        <>
          <h2>Main Page</h2>
          <div className="button-container">
          <button onClick={() => handleButtonClick('PathFinder')}>Path Finder</button>
            <button onClick={() => handleButtonClick('Warshall')}>Warshall</button>
            <button onClick={() => handleButtonClick('Relation')}>Relation</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Main;