import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LogIn.css';

export default class LogIn extends Component {
    render() {
        return (
            <section className="log-in-section">
            <h2>Log in</h2>
            <p>Log in with your credentials below.</p>
            <form className="log-in-form">
                 <label htmlFor="username">Username:</label>
                 <input type="text" id="username" name="username"  />
                 <br/>
                 <Link to="/home/">
                    <input type="submit" value="Submit" className="submit-btn"/>
                 </Link>
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