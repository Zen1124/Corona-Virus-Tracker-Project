import logo from './logo.svg';
import './App.css';
import React from 'react'
import Papa from 'papaparse'

async function readcsv(name){
  var response = await fetch(process.env.PUBLIC_URL + name)
  var reader = await response.body.getReader()
  var decoder = new TextDecoder()
  var result = await reader.read()
  var csv = await decoder.decode(result.value)
  //console.log(csv)
  console.log(Papa.parse(csv, { header: false }))
  return Papa.parse(csv, { header: false })
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
