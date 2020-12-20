import React, {Component} from 'react';
import './LogIn.css';

export default class LogIn extends Component {
    render() {
        return (
            <section className="log-in-section">
            <h2>Log in</h2>
            <p>Log in with your credentials below.</p>
            <form className="log-in-form">
                 <label htmlFor="email">Email address:</label>
                 <input type="text" id="email" name="email"  />
                 <br/>
                 <label htmlFor="password">Password:</label>
                 <input type="text" id="password" name="password"  />
                 <br/>
                 <input type="submit" value="Submit" className="submit-btn"/>
                 <button
                    onClick={this.props.handleLogInToSignUp}
                 >
                    Sign up instead
                </button>
            </form>
     
        </section>
        )
    }
}