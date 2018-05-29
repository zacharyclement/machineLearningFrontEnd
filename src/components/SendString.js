import React, { Component } from 'react';
import './App.css';

class SendString extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postReturn: '',

        };

        this.handleTextSubmit = this.handleTextSubmit.bind(this);
    }


    handleTextSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        const options = {
            method: 'POST',
            body: formData,
        }
        try {
            fetch('http://127.0.0.1:5000/form', options).then(results => {
                return results.json();
            }).then(data => {
                this.setState({ postReturn: data });
                console.log('API post return: ', this.state.postReturn)
            })
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <div>
                <h2>Send a String</h2>
                <form onSubmit={this.handleTextSubmit}>
                    <input type="text" name='string-sandwhich' />
                    <button>Send data</button>
                </form>
            </div>
        );
    }
}

export default SendString;
