import React, { Component } from 'react';
import LogIn from '../log-in/LogIn';
import SignUp from '../sign-up/SignUp';
import './Landing.css'

export default class Landing extends Component {
    state = {
        logIn: false,
        signUp: false,
    }

    logInToggle = (e) => {
        console.log('logInToggle ran');
        this.setState(
            {
                logIn: true,
            }
        )
    }

    signUpToggle = (e) => {
        console.log('signUpToggle ran');
        this.setState(
            {
                signUp: true,
            }
        )
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
        } else if (this.state.signUp) {
                return (
                    <section>
                        <h2>Welcome!</h2>
                        <p>Here's some text welcoming you to this website.</p>
                        <SignUp />
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
                    <button
                        onClick={this.signUpToggle}
                    >
                        Sign up
                    </button>
                </section>
            )
        }
    }
}