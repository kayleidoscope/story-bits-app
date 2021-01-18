import React, {Component} from 'react';
import './CannotAccess.css'

//This component will appear when users try to access a character, setting, or story that doesn't belong to them.
class CannotAccess extends Component {
    render() {
        return (
            <div className="cannot-access">
                <p>You don't have access to this {this.props.item}.</p>
                <p>Please click on the home page to access your stories, or log in with the correct username to view this {this.props.item}.</p>
            </div>
        )
    }
}

export default CannotAccess;