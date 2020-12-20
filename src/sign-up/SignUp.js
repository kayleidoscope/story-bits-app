import React, {Component} from 'react';
import './SignUp.css';

export default class SignUp extends Component {
    render () {
        return (
            <section className="sign-up-section">
            <h2>Sign up</h2>
            <p>Create an account below.</p>
            <form className="sign-up-form">
                 <label htmlFor="email">Email address:</label>
                 <input type="text" id="email" name="email" />
                 <br/>
                 <label htmlFor="password">Password:</label>
                 <input type="text" id="password" name="password"  />
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