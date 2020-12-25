import React, {Component} from 'react';
import dummyData from '../dummyData';
import './User.css'

export default class User extends Component {
    render() {
        const users = dummyData.users

        const i = Math.floor(Math.random() * users.length);

        return (
            <div>
                <h2>{users[i].name}</h2>
                <p>Account created: {users[i].acct_created}</p>
                <p>Stories created: {users[i].stories}</p>
                <p>Characters created: {users[i].characters}</p>
                <p>Settings created: {users[i].settings}</p>
                <button className="submit-btn">Delete Account</button>
                <button type='button' onClick={() => this.props.history.goBack()} className="submit-btn">
                    Go Back
                </button>
            </div>
        )
    }
}