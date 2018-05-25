import React, { Component } from 'react';

class JsonUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
                jsonData: null,
            
        };

        this.handleJsonSubmit = this.handleJsonSubmit.bind(this);
    }

    handleJsonSubmit(event) {
        event.preventDefault();
        var jsonData = {
            'A': 'one',
            'B': 'two',
            'C': 'three',
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(jsonData),
        }
        try {
            fetch('http://127.0.0.1:5000/json', options).then(results => {
                return results.json();
            }).then(data => {
                this.setState({ jsonData: data });
                console.log('API post return: ', this.state.jsonData)
            })
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <div>
                <h2>Send JSON (doesn't work)</h2>
                <form onSubmit={this.handleJsonSubmit}>
                    <button>Send Json data</button>
                </form>
            </div>
        );
    }
}

export default JsonUpload;