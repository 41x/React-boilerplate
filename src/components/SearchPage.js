import React, { Component } from 'react';

class SearchPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            input: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
    };

    render () {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    value={this.state.input}
                />
                <button>Search</button>
            </form>
        );
    }
}

export default SearchPage;
