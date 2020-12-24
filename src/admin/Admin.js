import React, {Component} from 'react';
import './Admin.css';
import dummyData from '../dummyData';

export default class Admin extends Component {
    render() {
        const users = dummyData.users

        const usersLIs = users.map(user => {
            return (
                <li key={user.id}>
                    <h3><a href="#">{user.name}</a></h3>
                    <p>Account created: {user.acct_created}</p>
                    <p><a href="#">Stories created: {user.stories}</a></p>
                    <p><a href="#">Characters created: {user.characters}</a></p>
                    <p><a href="#">Settings created: {user.settings}</a></p>
                    <button>Delete User</button>
                </li>
            )
        })

        return (
            <div className="admin">
                <h2>Users</h2>
                <ul>
                    {usersLIs}
                </ul>
         </div>
        )
    }
}