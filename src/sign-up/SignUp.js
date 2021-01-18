import React, {Component} from 'react';
import config from '../config'
import ValidationError from '../validation-error/ValidationError'
import Context from '../Context'
import './SignUp.css';

export default class SignUp extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
          usernameInput: "",
          userId: 0,
          //boolean to determine if validation error component should show up
          error: false
        }
      }

    usernameChanged = username => {
        this.setState({
            usernameInput: username
        })
    }

    setUserId = userId => {
        this.setState({
            userId: userId,
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const username = this.state.usernameInput
        const newUser = {username}

        //API call to create a new user
        fetch(`${config.API_ENDPOINT}api/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => {
                if(!res.ok) {
                    this.setState({
                        error: true
                    })
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.context.addUserFx(responseJson)
                this.context.userSelectFx(responseJson.id)
                //sets current user Id to local storage
                localStorage.setItem(
                    `currentUser`, JSON.stringify(responseJson)
                )
                this.props.history.push("/home")
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
            <form className="sign-up-form"  onSubmit={this.handleSubmit}>
                 <label htmlFor="username">Username:</label>
                 <input type="text" id="username" name="username" onChange = {e => this.usernameChanged(e.target.value)} />
                 {this.state.error && <ValidationError message="That username is taken." />}
                 <br/>
                 {/* <label htmlFor="admin">Administrator</label>
                 <input type="checkbox" id="admin" name="admin" /> */}
                <input type="submit" value="Submit" className="submit-btn"/>
                <button className="submit-btn" onClick={this.props.handleBackToLanding}>
                    Cancel
                </button>
            </form>
     
        </section>
        )
    }
}