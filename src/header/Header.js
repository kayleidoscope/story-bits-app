import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css'

class Header extends Component {
    render() {
        return (
            <header>
                <Link to="/home/">
                    <h1>Story Bits!</h1>
                </Link>
            </header>
        )
    }
}

export default Header;