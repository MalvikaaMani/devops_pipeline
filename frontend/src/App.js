import React, { useState } from 'react';
import './App.css';
import Login from './pages/login';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleLogin = () => setShowLogin((prev) => !prev); // Toggles the state

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to KLM GameCraft!!</h1>
        <h3 className="subheading">Your gateway to an immersive gaming experience.</h3>
        {showLogin && <Login />}
        <button onClick={toggleLogin}>Toggle Login</button> {/* Button to toggle showLogin */}
      </header>
    </div>
  );
}

export default App;
