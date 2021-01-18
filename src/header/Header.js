import React, {Component} from 'react';
import Nav from '../nav/Nav';
import Context from '../Context';
import './Header.css'

class Header extends Component {
    static contextType = Context;

    render() {
        //will only have the nav render if a user is logged in (i.e. no nav will appear on the landing page)
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