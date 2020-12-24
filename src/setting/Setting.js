import React, {Component} from 'react';
import './Setting.css';
import '../dummyData';
import dummyData from '../dummyData';

export default class Setting extends Component {
    render() {
        const occupantsLIs = dummyData.settings[0].occupants.map(person => {
            return <li key={person.id}>{person.name}</li>
        })

        return (
            <>
                <h2>{dummyData.settings[0].name}</h2>
                <p>{dummyData.stories[0].title}</p>
                <ul>
                    <li>
                        <p>Story:</p>
                        <p>{dummyData.settings[0].description}</p>
                    </li>
                    <li>
                        <p>Occupants:</p>
                        <ul>
                            {occupantsLIs}
                        </ul>
                    </li>
                </ul>
            </>
        )
    }
}