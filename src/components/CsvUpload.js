import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';


class CsvUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csvData: '',
            returnData: [],
        };

        this.handleCsvSubmit = this.handleCsvSubmit.bind(this);
        this.setCSV = this.setCSV.bind(this);
    }

    handleCsvSubmit(event) {
        event.preventDefault();

        var csvTestData = this.state.csvData
        console.log('state before: ', csvTestData, typeof (csvTestData))

        var options = {
            method: 'POST',
            body: JSON.stringify(csvTestData),
            // body: JSON(this.state.csvData),
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
            },
        }

        fetch('http://127.0.0.1:5000/ml', options).then(results => {
            // console.log(results);
            return results.json()
        }).then(data => {
            console.log('API data return: ', data, typeof (data))
            var parsedData = JSON.parse(data)
            this.setState({ returnData: parsedData});
            console.log('API state return: ', this.state.returnData, typeof(this.state.returnData))
        })
    }

    setCSV(event) {
        var reader = new FileReader();
        reader.readAsText(event[0])
        reader.onload = (e) => {
            var csv = e.target.result
            this.setState({ csvData: csv })
            console.log('csv datatype ', typeof csv)
        }
    }

    render() {
        return (
            <div>
                <ReactFileReader handleFiles={this.setCSV} fileTypes={'.csv'}>
                    <button className='btn'>Upload CSV</button>
                </ReactFileReader>

                <h2>Step 2. Send to Server</h2>
                <form onSubmit={this.handleCsvSubmit}>
                    <button>Send CSV to Server</button>
                </form>
                <h3>results</h3>
                {/* <div>
                    {this.state.returnData['C']}
                </div> */}
                {/* <div>
                    {this.state.returnData.map(d => <div>d</div>)}
                </div> */}
            </div>
        );
    }
}

export default CsvUpload;