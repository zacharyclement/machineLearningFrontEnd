import React, { Component } from 'react';

class JsonUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonData: '',

        };

        this.handleJsonSubmit = this.handleJsonSubmit.bind(this);
    }

    handleJsonSubmit(event) {
        event.preventDefault();

        var jsonTestData = {
            'A': 'one',
            'B': 'two',
            'C': 'three',
            'D': 'four'
        }

        var options = {
            method: 'POST',
            body: JSON.stringify(jsonTestData),
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
            },
        }

        fetch('http://127.0.0.1:5000/data', options).then(results => {
            // console.log(results);
            return results.json()
        }).then(data => {
            console.log('API data return: ', data, typeof(data))
            this.setState({ jsonData: data });
            console.log('API state return: ', this.state.jsonData)
        })
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