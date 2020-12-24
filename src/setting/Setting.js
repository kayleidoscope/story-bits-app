import React, {Component} from 'react';
import './Setting.css';
import dummyData from '../dummyData';

export default class Setting extends Component {
    render() {
        const data = dummyData;

        const settingId = "0-0";

        const settingData = data.settings.filter(setting => setting.id === settingId)
        console.log(settingData)
        const occupantsLIs = settingData[0].occupants.map(person => {
            return <li key={person.id} className="setting-occupant">{person.name}</li>
        })

        return (
            <>
                <h2>{settingData[0].name}</h2>
                <p className="setting-desc">{settingData[0].description}</p>
                <ul className="setting-traits">
                    <li className="setting-trait">
                        <p className="setting-trait-title">Story:</p>
                        <p>{settingData[0].story.name}</p>
                    </li>
                    <li className="setting-trait">
                        <p className="setting-trait-title">Occupants:</p>
                        <ul>
                            {occupantsLIs}
                        </ul>
                    </li>
                    <li className="setting-trait">
                        <p className="setting-trait-title">Decor:</p>
                        <p>{settingData[0].decor}</p>
                    </li>
                </ul>
            </>
        )
    }
}