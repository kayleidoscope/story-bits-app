import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

export default class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                <ul>
                    <Link to="/user/" className="nav-li">
                        <li>Account</li>
                    </Link>
                    <Link to="/home/"  className="nav-li">
                        <li>Home</li>
                    </Link>
                    <Link to="/"  className="nav-li">
                        <li>Log Out</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}