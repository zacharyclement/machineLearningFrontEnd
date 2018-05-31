import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import { CsvToHtmlTable } from 'react-csv-to-table';

class DisplayCsv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csvData: '',
        };

        this.displayCSV = this.displayCSV.bind(this);
    }

    
    displayCSV(event) {
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
                <h2>Display CSV</h2>
                <ReactFileReader handleFiles={this.displayCSV} fileTypes={'.csv'}>
                    <button className='btn'>Upload</button>
                </ReactFileReader>

                <CsvToHtmlTable
                    data={this.state.csvData}
                    csvDelimiter=','
                />
            </div>


        );
    }
}

export default DisplayCsv;
