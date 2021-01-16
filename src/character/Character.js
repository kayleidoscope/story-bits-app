import React, {Component} from 'react';
import Context from '../Context';
import config from '../config'
import CannotAccess from '../cannot-access/CannotAccess'
import {Link} from 'react-router-dom';
import './Character.css'

export default class Character extends Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            currentChar: this.props.match.params.charId,
            charData: null,
            storyName: "",
            storysUser: null,
            storyId: null,
            hasHomeData: false,
            homeName: "",
            homeId: null,
            hasRmData: false,
            roommateData: []
        }
      }

    componentWillReceiveProps(newProps) {
        console.log('componentDidUpdate ran')
        if (newProps.match.params.charId === this.props.match.params.charId) {
            console.log(this.state)
            return
        }
        this.fetchCharacter(newProps.match.params.charId)
            
    }

    componentDidMount() {
        this.fetchCharacter(this.state.currentChar)
    }

    fetchCharacter(charId) {
        console.log('fetchCharacter ran')
        this.setState({
            currentChar: charId
        })
        fetch(`${config.API_ENDPOINT}api/characters/${charId}`, {
            method: 'GET'
          })
            .then(res => {
              if(!res.ok) {
                throw new Error(res.status)
              }
              return res.json()
            })
            .then(responseJson => {
                console.log('charData state set')
                this.setState({
                    charData: responseJson
                })
                
                fetch(`${config.API_ENDPOINT}api/stories/${responseJson.story_id}`, {
                    method: 'GET'
                })
                .then(res => {
                    if(!res.ok) {
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
            }
            )
        fetch(`${config.API_ENDPOINT}api/residences/?character_id=${this.state.currentChar}`, {
            method: 'GET'
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                if (responseJson.length > 0) {
                    this.setState({
                        homeId: responseJson[0].setting_id,
                        hasHomeData: true
                    })
                    fetch(`${config.API_ENDPOINT}api/settings/${responseJson[0].setting_id}`, {
                        method: 'GET'
                    })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(res.status)
                        }
                        return res.json()
                    })
                    .then(responseJson => this.setState({
                        homeName: responseJson.name
                    })
                    )
                    fetch(`${config.API_ENDPOINT}api/residences/?setting_id=${responseJson[0].setting_id}`, {
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
                                if (values.length > 1) {
                                    this.setState({
                                        hasRmData: true,
                                        roommateData: values
                                    })
                                }
                            })
                        })
                }
            })
    }

    roommateSwitch() {
        console.log("woohoo!")
    }

    render() {
        //to prevent users from accessing stories that do not belong to them
        const currentUser = this.context.currentUser
        const storysUser = this.state.storysUser
        if (!this.state.charData || !this.state.storyName || !this.state.storyId) {
            return null
        } else if (currentUser !== storysUser) {
            return (
                <CannotAccess item="character"/>
            )
        }


        const charData = this.state.charData
        const roommateData = this.state.roommateData
        const housematesLIs = roommateData.map(rm => {
            const selectedCharId = parseInt(this.state.currentChar)
            if (rm.id === selectedCharId) {
                return null
            } else {
                return (
                    <Link to={`/character/${rm.id}`} key={rm.id}>
                        <li key={rm.id}>
                            {rm.name}
                        </li>
                    </Link>
                    
                )
            }
        })


        return (
            <article className="character-deets">
                <h2>{charData.name}</h2>
                <p className="description">{charData.description}</p>
                <div className="grid">                    
                    <p className="key">Story:</p>
                    <Link to={`/story/${this.state.storyId}`}>
                        <p>{this.state.storyName}</p>
                    </Link>

                    <p className="key">Gender:</p>
                    <p>{charData.gender}</p>

                    <p className="key">Age:</p>
                    <p>{charData.age}</p>

                    <p className="key">Physical appearance:</p>
                    <p>{charData.appearance}</p>

                    <p className="key">Fashion style:</p>
                    <p>{charData.fashion}</p>

                    {this.state.hasHomeData &&
                        (<div className="conditional">
                            <p className="key">Home:</p>
                            <Link to={`/setting/${this.state.homeId}`}>
                                <p>{this.state.homeName}</p>
                            </Link>
                        </div>)
                    }
                    
                    {this.state.hasRmData && 
                        <div className="conditional">
                            <p div  className="key">Housemates:</p>
                            <ul className="housemates-value">
                                {housematesLIs}
                            </ul>
                        </div>
                    }

                    <p className="key">Room decor:</p>
                    <p>{charData.room_decor}</p>
                </div>
                <div className="buttons">
                    <button type='button' onClick={() => this.props.history.push(`/edit/character/${this.state.currentChar}`)} className="submit-btn">
                        Edit Character
                    </button>

                    <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                        Go Back
                    </button>
                </div>
            </article>
        )
    }
}