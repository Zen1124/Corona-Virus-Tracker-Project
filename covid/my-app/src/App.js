import logo from './logo.svg';
import './App.css';
import React from 'react'
import Papa from 'papaparse'

async function readcsv(name){
  let data
  await fetch(process.env.PUBLIC_URL + name).then(response => response.text())
  .then(text =>{
    data = text
  })
  console.log(Papa.parse(data, { header: false }))
  return Papa.parse(data, { header: false })
}

function App() {
  readcsv("/Modified_Zip_Code_Tabulation_Areas__MODZCTA_.csv")
  return (
    <div className="App">
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
