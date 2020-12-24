import React, {Component} from 'react';
import './SignUp.css';

export default class SignUp extends Component {
    render () {
        return (
            <section className="sign-up-section">
            <h2>Sign up</h2>
            <p>Create an account below.</p>
            <form className="sign-up-form">
                 <label htmlFor="username">Username:</label>
                 <input type="text" id="username" name="username" />
                 <br/>
                 <label htmlFor="admin">Administrator</label>
                 <input type="checkbox" id="admin" name="admin" />
                 <br/>
                 <input type="submit" value="Submit" className="submit-btn"/>
                 <button
                    onClick={this.props.handleSignUpToLogIn}
                 >
                    Log in instead
                </button>
            </form>
     
        </section>
        )
    }
}