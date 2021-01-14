import React, {Component} from 'react';
import Context from '../Context';
import './DemoLogIn.css';

export default class DemoLogIn extends Component {
    static contextType = Context

    handleSubmit = (e) => {
        console.log('handleSubmit - login ran')
        e.preventDefault()
        const users = this.context.users
        const currentUser = users.find(user => user.username === "Demo User")
        const currentUserId = currentUser.id
        this.context.userSelectFx(currentUserId)
        localStorage.setItem(
            `currentUser`, JSON.stringify(currentUser)
        )
        this.props.history.push("/home")
    }

    render() {
        return (
            <section>
            <h2>Want to see a demo?</h2>
            <form onSubmit={this.handleSubmit}>
                <button>Check out the app before making an account</button>
            </form>
        </section>
        )
    }
}