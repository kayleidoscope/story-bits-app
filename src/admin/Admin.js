import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Admin.css';
import dummyData from '../dummyData';

export default class Admin extends Component {
    render() {
        const users = dummyData.users

        const usersLIs = users.map(user => {
            return (
                <Link to={`/user/${user.id}`} key={user.id}>
                    <li>
                        <h3>{user.name}</h3>
                        <p>Account created: {user.acct_created}</p>
                        <p>Stories created: {user.stories}</p>
                        <p>Characters created: {user.characters}</p>
                        <p>Settings created: {user.settings}</p>
                        <button>Delete User</button>
                    </li>
                </Link>
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