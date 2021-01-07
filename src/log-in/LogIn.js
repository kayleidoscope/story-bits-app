import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Context from '../Context';
import './LogIn.css';
import ValidationError from '../validation-error/ValidationError'

export default class LogIn extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
          usernameInput: "",
          userId: 0,
          inputTouched: false
        }
      }

    usernameChange = (username) => {
        this.setState({
            usernameInput: username,
            inputTouched: true
        })
        this.validateUsername(username)
    }

    validateUsername(username) {
        const users = this.context.users
        const currentUser = users.find(user => user.username === username)
        if (!currentUser) {
           return "No user found"
        } else if (currentUser.length === 0) {
            return "You must enter a username"
        } else {
            this.setState({
                userId: currentUser.id
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // this.validateUsername(this.state.usernameInput)
        const users = this.context.users
        const currentUser = users.find(user => user.username === this.state.usernameInput)
        const currentUserId = currentUser.id
        this.context.userSelectFx(currentUserId)
    }

    render() {
        return (
            <section className="log-in-section">
            <h2>Log in</h2>
            <p>Log in with your credentials below.</p>
            <form className="log-in-form">
                 <label htmlFor="username">Username:</label>
                 <input type="text" id="username" name="username" onChange={e => this.usernameChange(e.target.value)}/>
                 <br/>
                 <Link 
                    to={`/home/${this.state.userId}`}
                    onClick={() => {this.context.userSelectFx(this.state.userId)}}
                >
                    <input type="submit" value="Submit" className="submit-btn" />
                 </Link>
                 {/* {this.state.inputTouched && (
                     <ValidationError message={this.validateUsername()}/>
                 )} */}
                 <button
                    onClick={this.props.handleLogInToSignUp}
                    className="submit-btn"
                 >
                    Sign up instead
                </button>
            </form>
     
        </section>
        )
    }
}