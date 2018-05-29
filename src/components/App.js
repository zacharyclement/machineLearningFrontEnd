import React, { Component } from 'react';
import './App.css';
import CsvUpload from './CsvUpload';
// import JsonUpload from './JsonUpload';
// import DisplayCsv from './DisplayCsv';
// import FileUpload from './FileUpload';
// import BarChart from './BarChart';
// import WorldMap from './WorldMap';
// import SendString from './SendString';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getReturn: '',      
    };
  }

  componentDidMount() {
    try {
      fetch('http://127.0.0.1:5000/form').then(results => {
        return results.json();
      }).then(data => {
        this.setState({ getReturn: data.language });
        console.log('API get return: ', this.state.getReturn)
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div>
        <h1>Machine Learning App with {this.state.getReturn}</h1>

        <hr />

        <h2>Step 1. Upload CSV</h2>

        < CsvUpload />
        
        {/* <hr />
        <SendString />
        
        <hr />
        <DisplayCsv />
        
        <hr />
        <JsonUpload />
        
        <hr />
        <FileUpload />
        
        <hr />
        <BarChart data={[1,2,3,4]} size={[500,500]} />
        <WorldMap /> */}

      </div>

    );
  }
}

export default App;
