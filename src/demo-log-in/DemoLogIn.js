import React, {Component} from 'react';
import Context from '../Context';
import config from '../config'
import './DemoLogIn.css';

export default class DemoLogIn extends Component {
    static contextType = Context

    handleSubmit = (e) => {
        e.preventDefault()
        const users = this.context.users
        //this finds the current user among all of the users
        const currentUser = users.find(user => user.username === "Demo User")
        const currentUserId = currentUser.id
        this.context.userSelectFx(currentUserId)
        //this sets the user's ID to local storage so that the user should remain logged in when returning to the page
        localStorage.setItem(
            `currentUser` + config.CURRENT_VERSION, JSON.stringify(currentUser)
        )
        this.props.history.push("/home")
    }

    render() {
        return (
            <section>
            <h2>Want to see a demo?</h2>
            <form onSubmit={this.handleSubmit}>
                <button className="demo-btn">Check out the app before making an account</button>
            </form>
        </section>
        )
    }
}