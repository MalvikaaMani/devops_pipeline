import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';
import Warshall from './warshall';
import PathFinder from './path_finder';
import Relation from './relation';

function Main() {
  const [activeComponent, setActiveComponent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const handleBack = () => {
    setActiveComponent(null);
  };

  return (
    <div className="main-container">
      <div className="header">
        
        {activeComponent && (
          <button className="back-btn" onClick={handleBack}>Back to Main</button>
        )}
      </div>
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