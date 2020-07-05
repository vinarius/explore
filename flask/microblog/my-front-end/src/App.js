import React from 'react';
import logo from './logo.svg';
import './App.css';

async function getData(){
  const test = await fetch('http://localhost:5000/read');
  // console.log('test:', test)
 
  // console.log(await test.text());
  console.log(await test.json());
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div style={{display: 'flex'}}>
        <button>Create</button>
        <button onClick={getData}>Read</button>
        <button>Update</button>
        <button>Delete</button>
      </div>
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
