import React, {Component} from 'react';
import './Nav.css';

export default class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                <ul>
                    <li><a href="#">Account</a></li>
                    <li><a href="#">My stories</a></li>
                </ul>
            </nav>
        )
    }
}