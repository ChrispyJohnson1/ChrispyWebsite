import './App.css';
import DynamicToC from './components/DynamicToC';
import Section from './components/Section';
import React from 'react';

function App() {

  // TODO: Automate this!
  const SectionData = [
    {
      s_id: "temp1",
      s_name: "Temp 1"
    },
    {
      s_id: "temp2",
      s_name: "Temp 2"
    },
    {
      s_id: "temp3",
      s_name: "Temp 3"
    },
    {
      s_id: "temp4",
      s_name: "Temp 4"
    }
  ]

  return (
    <div className="App">                   { /* Main React App */ }
      <div>
        <Section s_id = {"temp1"} s_name = {"Temp 1"}></Section>
        <Section s_id = {"temp2"} s_name = {"Temp 2"}></Section>
        <Section s_id = {"temp3"} s_name = {"Temp 3"}></Section>
        <Section s_id = {"temp4"} s_name = {"Temp 4"}></Section>
      </div>
      

      <DynamicToC SectionData={SectionData}></DynamicToC>
    </div>
  );
}

export default App;
