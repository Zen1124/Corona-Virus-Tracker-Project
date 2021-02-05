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
  return (
    readcsv("/Modified_Zip_Code_Tabulation_Areas__MODZCTA_.csv")
  );
}

export default App;
