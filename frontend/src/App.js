import React, { useState } from 'react';
import './App.css';
import Login from './pages/login';
import Main from './pages/main';
import Warshall from './pages/warshall';
import PathFinder from './pages/path_finder';
import Relation from './pages/relation';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Login');
  const [showLogin, setShowLogin] = useState(true); // Track whether to show the Login component

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveComponent('Main');
    setShowLogin(false); // Hide Login after successful login
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const toggleLogin = () => setShowLogin((prev) => !prev); // Toggle the showLogin state

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Main':
        return <Main onComponentChange={handleComponentChange} />;
      case 'Warshall':
        return <Warshall />;
      case 'PathFinder':
        return <PathFinder />;
      case 'Relation':
        return <Relation />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Welcome to KLM GameCraft!!</h1>
        <h3 className="subheading">Your gateway to an immersive gaming experience.</h3>
        <div className="toggle-button-container">
          <button className="toggle-button" onClick={toggleLogin}>Toggle Login</button>
        </div>
      </div>
      <div className="App-body">
        {/* Show Login or Main component based on the state */}
        {showLogin ? renderComponent() : <Main onComponentChange={handleComponentChange} />}
        
        {/* Toggle button to show/hide Login */}
      </div>
    </div>
    
  );
}

export default App;