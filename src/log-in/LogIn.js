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
                 <input type="text" id="email" name="email" required />
                 <br/>
                 <label htmlFor="password">Password:</label>
                 <input type="text" id="password" name="password" required />
                 <br/>
                 <input type="submit" value="Submit" className="submit-btn"/>
            </form>
     
        </section>
        )
    }
}