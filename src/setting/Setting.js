import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Setting.css';
import config from '../config'

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
          settingData: [],
          storyName: "",
          storyId: null,
          roommateData: []
        }
      }

    componentDidMount() {
        const setId = this.props.match.params.settingId

        fetch(`${config.API_ENDPOINT}api/settings/${setId}`, {
            method: 'GET'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.setState({
                    settingData: responseJson
                })

                fetch(`${config.API_ENDPOINT}api/stories/${responseJson.story_id}`, {
                    method: 'GET'
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(res.status)
                        }
                        return res.json()
                    })
                    .then(responseJson => {
                        this.setState({
                            storyName: responseJson.title,
                            storyId: responseJson.id
                        })
                    })
            })

        fetch(`${config.API_ENDPOINT}api/residences/?setting_id=${setId}`, {
            method: 'GET'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                const roommateArray = responseJson.map(item => {
                    return item.character_id
                })
                const roommateDataArray = roommateArray.map((roommateId) => 
                    fetch(`${config.API_ENDPOINT}api/characters/${roommateId}`, {
                        method: 'GET'
                    })
                        .then(res => {
                            if (!res.ok) {
                                throw new Error(res.status)
                            }
                            return res.json()
                        })
                        .then(responseJson => responseJson)
                )

                Promise.all(roommateDataArray).then(values => {
                    this.setState({
                        roommateData: values
                    })
                })
            })
    }

    render() {
        const setId = this.props.match.params.settingId
        const settingData = this.state.settingData
        const isResidence = settingData.is_residence
        const occupantsLIs = this.state.roommateData.map(person => {
            return (
                <Link to={`/character/${person.id}`} key={person.id}>
                <li className="setting-occupant">
                    {person.name}
                </li>
                </Link>

            )
        })

        const isRes = settingData.is_residence
        let isResYesNo
        if (isRes) {
            isResYesNo = "Yes."
        } else {
            isResYesNo = "No."
        }

        return (
            <>
                <h2>{settingData.name}</h2>
                <button onClick={() => this.props.history.push(`/edit/setting/${setId}`)}>
                    Edit Setting
                </button>
                <p className="setting-desc">{settingData.description}</p>
                <ul className="setting-traits">
                    <li className="setting-trait">
                        <p className="setting-trait-title">Story:</p>
                        <Link to={`/story/${this.state.storyId}`}>
                            <p>{this.state.storyName}</p>
                        </Link>
                    </li>
                    <li>
                        <p className="setting-trait-title">Can people live here?</p>
                        <p>{isResYesNo}</p>
                    </li>
                    {isResidence &&
                        (<li className="setting-trait">
                            <p className="setting-trait-title">Occupants:</p>
                            <ul>
                                {occupantsLIs}
                            </ul>
                        </li>)
                    }
                    <li className="setting-trait">
                        <p className="setting-trait-title">Decor:</p>
                        <p>{settingData.decor}</p>
                    </li>
                </ul>
            </>
        )
    }
}