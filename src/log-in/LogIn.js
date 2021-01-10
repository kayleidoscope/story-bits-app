import React, {Component} from 'react';
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
          inputTouched: false,
          error: false
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
        console.log('handleSubmit - login ran')
        e.preventDefault()
        // this.validateUsername(this.state.usernameInput)
        const users = this.context.users
        const currentUser = users.find(user => user.username === this.state.usernameInput)
        if(!currentUser) {
            this.setState({
                error: true
            })
            return
        }
        const currentUserId = currentUser.id
        this.context.userSelectFx(currentUserId)
        localStorage.setItem(
            `currentUser`, JSON.stringify(currentUser)
        )
        this.props.history.push("/home")
    }

    render() {
        return (
            <section className="log-in-section">
            <h2>Log in</h2>
            <p>Log in with your credentials below.</p>
            <form className="log-in-form" onSubmit={this.handleSubmit}>
                 <label htmlFor="username">Username:</label>
                 <input type="text" id="username" name="username" onChange={e => this.usernameChange(e.target.value)}/>
                 <br/>
                <input type="submit" value="Submit" className="submit-btn" />
                 {this.state.error && (
                     <ValidationError message={"No user found"}/>
                 )}
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