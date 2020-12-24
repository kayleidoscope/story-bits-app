import React, { Component } from 'react';
import LogIn from '../log-in/LogIn';
import SignUp from '../sign-up/SignUp';
import './Landing.css'

export default class Landing extends Component {
    state = {
        logIn: false,
        signUp: false,
    }

    logInTrue = (e) => {
        e.preventDefault();
        console.log('logInTrue ran');
        this.setState(
            {
                logIn: true,
            }
        )
    }

    logInToSignUp = (e) => {
        e.preventDefault();
        console.log('logInFalse ran');
        this.setState(
            {
                logIn: false,
                signUp: true,
            }
        )
    }

    signUpTrue = (e) => {
        console.log('signUpToggle ran');
        this.setState(
            {
                signUp: true,
            }
        )
    }

    signUpToLogIn = (e) => {
        e.preventDefault();
        console.log('logInFalse ran');
        this.setState(
            {
                logIn: true,
                signUp: false,
            }
        )
    }

    render() {
        if (this.state.logIn) {
            return (
                <section>
                <h2>Welcome!</h2>
                <p>Here's some text welcoming you to this website.</p>
                <LogIn
                    handleLogInToSignUp={this.logInToSignUp}
                />
            </section>
            )
        } else if (this.state.signUp) {
                return (
                    <section>
                        <h2>Welcome!</h2>
                        <p>Here's some text welcoming you to this website.</p>
                        <SignUp 
                            handleSignUpToLogIn={this.signUpToLogIn}
                        />
                    </section>
                )
            } else {
            return (
                <section className="landing">
                    <h2>Welcome!</h2>
                    <p>Here's some text welcoming you to this website.</p>
                    <button
                        onClick={this.logInTrue}
                    >
                        Log in
                    </button>
                    <button
                        onClick={this.signUpTrue}
                    >
                        Sign up
                    </button>
                </section>
            )
        }
    }
}