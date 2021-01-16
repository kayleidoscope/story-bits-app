import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CannotAccess from '../cannot-access/CannotAccess'
import Context from '../Context'
import './Setting.css';
import config from '../config'

export default class Setting extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
          settingData: [],
          storyName: "",
          storyId: null,
          storysUser: null,
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
                            storyId: responseJson.id,
                            storysUser: responseJson.user_id
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
        //to prevent users from accessing stories that do not belong to them
        const currentUser = this.context.currentUser
        const storysUser = this.state.storysUser
        if(!this.state.storysUser || !this.state.roommateData) {
            return null
        } else if (currentUser !== storysUser) {
            return (
                <CannotAccess item="setting"/>
            )
        }

        const setId = this.props.match.params.settingId
        const settingData = this.state.settingData
        const isResidence = settingData.is_residence
        let occupantsLIs
        if (this.state.roommateData.length === 0) {
            occupantsLIs = <li>No occupants listed. To add occupants, edit a character's Home to {settingData.name}.</li>
        } else {
            occupantsLIs = this.state.roommateData.map(person => {
                return (
                    <Link to={`/character/${person.id}`} key={person.id}>
                    <li className="setting-occupant">
                        {person.name}
                    </li>
                    </Link>
    
                )
            })
        }

        const isRes = settingData.is_residence
        let isResYesNo
        if (isRes) {
            isResYesNo = "Yes."
        } else {
            isResYesNo = "No."
        }

        return (
            <div className="setting">
                <h2>{settingData.name}</h2>
                <p className="setting-desc">{settingData.description}</p>
                <div className="setting-traits">
                    <p className="setting-trait-title">Story:</p>
                    <Link to={`/story/${this.state.storyId}`}>
                        <p>{this.state.storyName}</p>
                    </Link>
                    <p className="setting-trait-title">Can people live here?</p>
                    <p>{isResYesNo}</p>
                    {isResidence &&
                        (<div className="conditional">
                            <p className="setting-trait-title">Occupants:</p>
                            <ul className="conditional-value">
                                {occupantsLIs}
                            </ul>
                        </div>)
                    }
                    <p className="setting-trait-title">What it looks like:</p>
                    <p>{settingData.decor}</p>
                </div>
                <button className="setting-btn" onClick={() => this.props.history.push(`/edit/setting/${setId}`)}>
                    Edit Setting
                </button>
            </div>
        )
    }
}