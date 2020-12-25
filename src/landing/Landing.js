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
        this.setState(
            {
                logIn: true,
            }
        )
    }

    logInToSignUp = (e) => {
        e.preventDefault();
        this.setState(
            {
                logIn: false,
                signUp: true,
            }
        )
    }

    signUpTrue = (e) => {
        this.setState(
            {
                signUp: true,
            }
        )
    }

    signUpToLogIn = (e) => {
        e.preventDefault();
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
                <p>Do your characters need to be more fully developed?</p>
                <p>Are you having trouble remembering what settings you've established?</p>
                <p>Whether you're working on a novel, short story, fanfiction, or DnD campaign, Story Bits is here to help you flesh out those pesky little details.</p>
                <LogIn
                    handleLogInToSignUp={this.logInToSignUp}
                />
            </section>
            )
        } else if (this.state.signUp) {
                return (
                    <section>
                        <h2>Welcome!</h2>
                        <p>Do your characters need to be more fully developed?</p>
                        <p>Are you having trouble remembering what settings you've established?</p>
                        <p>Whether you're working on a novel, short story, fanfiction, or DnD campaign, Story Bits is here to help you flesh out those pesky little details.</p>
                        <SignUp 
                            handleSignUpToLogIn={this.signUpToLogIn}
                        />
                    </section>
                )
            } else {
            return (
                <section className="landing">
                    <h2>Welcome!</h2>
                    <p>Do your characters need to be more fully developed?</p>
                    <p>Are you having trouble remembering what settings you've established?</p>
                    <p>Whether you're working on a novel, short story, fanfiction, or DnD campaign, Story Bits is here to help you flesh out those pesky little details.</p>
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