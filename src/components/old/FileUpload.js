import React, { Component } from 'react';

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            returnedFile: null,
        };

        this.handleFileSubmit = this.handleFileSubmit.bind(this);
        this.fileChangeHandler = this.fileChangeHandler.bind(this)
    }

    fileChangeHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
        console.log('selected files1, ', event.target.files[0])
    }

    handleFileSubmit = (event) => {
        event.preventDefault();
        console.log('selected files2, ', this.state.selectedFile)
        var formData = new FormData()
        formData.append('file-mountain', this.state.selectedFile)

        console.log('form data ', formData)
        
        const options = {
            method: 'POST',
            body: formData,
        }

        fetch('http://127.0.0.1:5000/file', options)
            .then(results => results.json())
            .then(data => {this.setState({ returnedFile: data })
        })
        console.log('API post return: ', this.state.returnedFile)
    }

    render() {
        return (
            <div>
                <h2>Upload File (doesn't work)</h2>
                <form onSubmit={this.handleFileSubmit}>
                    <input type="file" name='file-mountain' onChange={this.fileChangeHandler} />
                    <button>Submit File</button>
                </form>
            </div>

        );
    }
}

export default FileUpload;