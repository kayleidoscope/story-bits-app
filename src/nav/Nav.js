import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Context from '../Context';
import './Nav.css';

export default class Nav extends Component {
    static contextType = Context
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
                    <Link 
                        to="/"  
                        className="nav-li"
                        onClick={() => this.context.userDeselectFx()}
                    >
                        <li>Log Out</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}