import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../config'
import Context from '../Context'
import './SignUp.css';

export default class SignUp extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
          usernameInput: "",
          userId: 0
        }
      }

    usernameChanged = username => {
        this.setState({
            usernameInput: username
        })
    }

    setUserId = userId => {
        console.log('setUserId ran', userId, this.state.userId)
        this.setState({
            userId: userId,
        })
    }

    handleSubmit = e => {
        const username = this.state.usernameInput
        const newUser = {username}
        fetch(`${config.API_ENDPOINT}api/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.setUserId(responseJson.id)
                this.context.addUserFx(responseJson)
                this.context.userSelectFx(responseJson.id)
            })
            .catch(error => {
                console.error(error)
            })
        
    }



    render () {
        return (
            <section className="sign-up-section">
            <h2>Sign up</h2>
            <p>Create an account below.</p>
            <form className="sign-up-form">
                 <label htmlFor="username">Username:</label>
                 <input type="text" id="username" name="username" onChange = {e => this.usernameChanged(e.target.value)} />
                 <br/>
                 {/* <label htmlFor="admin">Administrator</label>
                 <input type="checkbox" id="admin" name="admin" /> */}
                 <br/>
                 <Link 
                    to={`/home/${this.state.userId}`}
                    onClick={() => {this.handleSubmit()}}
                >
                    <input type="submit" value="Submit" className="submit-btn"/>
                 </Link>
                 <button
                    onClick={this.props.handleSignUpToLogIn}
                    className="submit-btn"
                 >
                    Log in instead
                </button>
            </form>
     
        </section>
        )
    }
}