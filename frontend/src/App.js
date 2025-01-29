import React, { useState } from 'react';
import './App.css';
import Login from './pages/login';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to KLM GameCraft!!</h1>
        <h3 className="subheading">Your gateway to an immersive gaming experience.</h3>
        {showLogin && <Login />}
      </header>
      
    </div>
  );
}

export default App;