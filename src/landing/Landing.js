import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LogIn from '../log-in/LogIn';
import SignUp from '../sign-up/SignUp';
import DemoLogIn from '../demo-log-in/DemoLogIn'
import './Landing.css'
import config from '../config';

export default class Landing extends Component {
    state = {
        //when true, the logIn component will render
        logIn: false,
        //when true, the signUp component will render
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

    //Set on the "Cancel" buttons of both the signup and login components. Removes both from the page.
    backToLanding = e => {
        this.setState({
            logIn: false,
            signUp: false
        })
    }

    render() {
        //If a user id is set to local storage, the user will be taken immediately to the home page
        if(localStorage.getItem('currentUser' + config.CURRENT_VERSION)) return <Redirect to='/home' />

        return (
            <section className="landing">
                <h2>Welcome, writers!</h2>
                <p>Story Bits is a story-building tool designed with you in mind.</p>
                <p>Do your characters need to be more fully developed? Are you having trouble remembering what settings you've established?</p>
                <p>Whether you're working on a novel, short story, fanfiction, or DnD campaign, Story Bits is here to help you flesh out those pesky little details.</p>
                <p>Log in or sign up for a free account to get started.</p>
                {this.state.logIn &&                 
                    <LogIn
                        handleLogInToSignUp={this.logInToSignUp}
                        handleBackToLanding={this.backToLanding}
                        history={this.props.history}
                    />
                }
                {this.state.signUp &&
                    <SignUp 
                        handleSignUpToLogIn={this.signUpToLogIn}
                        handleBackToLanding={this.backToLanding}
                        history={this.props.history}
                    />
                }
                {(!this.state.signUp && !this.state.logIn) && (
                    <>
                        <div className="landing-container">
                            <button
                                onClick={this.logInTrue}
                            >
                                Log in
                            </button>
                            <button className="landing-right-btn"
                                onClick={this.signUpTrue}
                            >
                                Sign up
                            </button>
                        </div>
                
                        <DemoLogIn history={this.props.history} />
                    </>
                )}
            </section>
        )
    }
}