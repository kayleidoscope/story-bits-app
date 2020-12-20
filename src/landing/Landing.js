import React, { Component } from 'react';
import LogIn from '../log-in/LogIn';
import './Landing.css'

export default class Landing extends Component {
    state = {
        logIn: false,
    }

    logInToggle = (e) => {
        console.log('logInToggle ran');
        this.setState(
            {
                logIn: true,
            }
        )
        console.log(this.state.logIn)
    }

    render() {
        if (this.state.logIn) {
            return (
                <section>
                <h2>Welcome!</h2>
                <p>Here's some text welcoming you to this website.</p>
                <LogIn />
            </section>
            )
        } else {
            return (
                <section>
                    <h2>Welcome!</h2>
                    <p>Here's some text welcoming you to this website.</p>
                    <button
                        onClick={this.logInToggle}
                    >
                        Log in
                    </button>
                    <button>Sign up</button>
                </section>
            )
        }
    }
}