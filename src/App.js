import React from 'react';
import logo from './logo.svg';

import Test from './Test';
import './App.css';

function App() {
  const word = "Horse";
  return (
    
    <div className="App">
      <Test potato={word} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
