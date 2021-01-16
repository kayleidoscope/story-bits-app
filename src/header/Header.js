import React, {Component} from 'react';
import Nav from '../nav/Nav';
import Context from '../Context';
import './Header.css'

class Header extends Component {
    static contextType = Context;

    render() {
        let isNav
        if (this.context.currentUser) {
            isNav = true
        } else {
            isNav = false
        }

        return (
            <header>
                <h1>story bits</h1>
                {isNav && <Nav />}
            </header>
        )
    }
}

export default Header;