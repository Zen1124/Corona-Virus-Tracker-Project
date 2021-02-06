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
  return (
    readcsv("/Modified_Zip_Code_Tabulation_Areas__MODZCTA_.csv")
  );
}

export default App;
