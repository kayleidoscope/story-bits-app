import React, { Component } from 'react';
import './Landing.css'

export default class Landing extends Component {
    render() {
        return (
            <section>
                <h2>Welcome!</h2>
                <p>Here's some text welcoming you to this website.</p>
                <button>Log in</button>
                <button>Sign up</button>
            </section>
        )
    }
}