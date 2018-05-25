import React, { Component } from 'react';
import './App.css';
import ReactFileReader from 'react-file-reader';
// import ReactTable from 'react-table';
import { CsvToHtmlTable } from 'react-csv-to-table';
import JsonUpload from './JsonUpload';
import FileUpload from './FileUpload';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getReturn: '',
      postReturn: '',
      csvData: '',
    };

    this.handleTextSubmit = this.handleTextSubmit.bind(this);
    this.displayCSV = this.displayCSV.bind(this);
  }

  componentDidMount() {
    try {
      fetch('http://127.0.0.1:5000/string').then(results => {
        return results.json();
      }).then(data => {
        this.setState({ getReturn: data.language });
        console.log('API get return: ', this.state.getReturn)
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleTextSubmit(event) {
    event.preventDefault();
    const stringData = new FormData(event.target)
    const options = {
      method: 'POST',
      body: stringData,
    }
    try {
      fetch('http://127.0.0.1:5000/string', options).then(results => {
        return results.json();
      }).then(data => {
        this.setState({ postReturn: data });
        console.log('API post return: ', this.state.postReturn)
      })
    } catch (error) {
      console.error(error)
    }
  }

  displayCSV = files => {
    var reader = new FileReader();
    reader.readAsText(files[0])
    reader.onload = (e) => {
      var csv = e.target.result
      this.setState({ csvData: csv })
      console.log('csv datatype ', typeof csv)
    }
  }

  render() {
    return (
      <div>
        <h1>Machine Learning App with {this.state.getReturn}</h1>
        <hr />

        <h2>Send a String</h2>
        <form onSubmit={this.handleTextSubmit}>
          <input type="text" name='string-sandwhich' />
          <button>Send data</button>
        </form>
        <hr />

        <div>
          <h2>Display CSV</h2>
          <ReactFileReader handleFiles={this.displayCSV} fileTypes={'.csv'}>
            <button className='btn'>Upload</button>
          </ReactFileReader>

          <CsvToHtmlTable
            data={this.state.csvData}
            csvDelimiter=','
          />
        </div>
        <hr />

        <JsonUpload />
        <hr />
        <FileUpload />

      </div>

    );
  }
}

export default App;
