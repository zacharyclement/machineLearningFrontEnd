import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import { csv } from 'd3';

class CsvUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csvData: '',
            returnData: {},
        };

        this.handleCsvSubmit = this.handleCsvSubmit.bind(this);
        this.setCSV = this.setCSV.bind(this);
        this.showCsv = this.showCsv.bind(this);
    }

    handleCsvSubmit(event) {
        event.preventDefault();
        var csvTestData = this.state.csvData
        var options = {
            method: 'POST',
            body: JSON.stringify(csvTestData),
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }

        fetch('http://127.0.0.1:5000/ml', options).then(results => {
            console.log(results);
            return results.json()
        }).then(data => {
            console.log('API data return: ', data, typeof (data))
            // not sure why this doesn't work???
            // var parsedData = JSON.parse(data)
            this.setState({ returnData: data });
            console.log('API state return: ', this.state.returnData, typeof (this.state.returnData))
        })
    }

    setCSV(event) {
        var reader = new FileReader();
        reader.readAsText(event[0])
        reader.onload = (e) => {
            var csv_ = e.target.result
            this.setState({ csvData: csv_ })
            // console.log('csv datatype ', typeof csv_)
        }
    }

    showCsv(event) {
        var data = this.state.csvData
        console.log(data, typeof(data))

    }

    render() {

        const { returnData } = this.state

        return (
            <div>
                <ReactFileReader handleFiles={this.setCSV} fileTypes={'.csv'}>
                    <button className='btn'>Upload CSV</button>
                </ReactFileReader>

                <button onClick={this.showCsv}>Show Csv</button>

                <h2>Step 2. Train Model and Get Parameters</h2>
                <form onSubmit={this.handleCsvSubmit}>
                    <button>Train Model</button>
                </form>
                <h3>results</h3>
                <h4>training score: {Math.round(returnData['trainingScore'] * 100) / 100}</h4>
                <h4>test score: {Math.round(returnData['testingScore'] * 100) / 100}</h4>
                {/* <h2>Best parameters: {returnData['bestParams']['C']}</h2> */}
                {/* <h2>Classification Report: {returnData['report']}</h2> */}



                <h2>Step 3. Make prediction on new data</h2>


            </div>
        );
    }
}

export default CsvUpload;