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

    // componentWillReceiveProps(newProps) {
    //     if (newProps.match.params.charId === this.props.match.params.charId) {
    //         return
    //     }
    //     this.fetchCharacter(newProps.match.params.charId)
            
    // }

    componentDidUpdate(newProps) {
        if (newProps.match.params.charId === this.props.match.params.charId) {
            return
        }
        this.fetchCharacter(this.props.match.params.charId)
            
    }

    componentDidMount() {
        this.fetchCharacter(this.state.currentChar)
    }

    fetchCharacter(charId) {
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
                    {charData.gender.length > 0 && <p>{charData.gender}</p>}
                    {charData.gender.length === 0 && <p className="no-data">No data entered.</p>}

                    <p className="key">Pronouns:</p>
                    {charData.pronouns.length > 0 && <p>{charData.pronouns}</p>}
                    {charData.pronouns.length === 0 && <p className="no-data">No data entered.</p>}

                    <p className="key">Age:</p>
                    {charData.age.length > 0 && <p>{charData.age}</p>}
                    {charData.age.length === 0 && <p className="no-data">No data entered.</p>}

                    <p className="key">Physical appearance:</p>
                    {charData.appearance.length > 0 && <p>{charData.appearance}</p>}
                    {charData.appearance.length === 0 && <p className="no-data">No data entered.</p>}

                    <p className="key">Fashion style:</p>
                    {charData.fashion.length > 0 && <p>{charData.fashion}</p>}
                    {charData.fashion.length === 0 && <p className="no-data">No data entered.</p>}

                    <p className="key">Mannerisms:</p>
                    {charData.mannerisms.length > 0 && <p>{charData.mannerisms}</p>}
                    {charData.mannerisms.length === 0 && <p className="no-data">No data entered.</p>}

                    {this.state.hasHomeData &&
                        (<div className="conditional">
                            <p className="key">Home:</p>
                            <Link to={`/setting/${this.state.homeId}`}>
                                <p>{this.state.homeName}</p>
                            </Link>
                        </div>)
                    }
                    
                    {this.state.hasRmData && 
                        (<div className="conditional">
                            <p className="key">Housemates:</p>
                            <ul className="housemates-value">
                                {housematesLIs}
                            </ul>
                        </div>)
                    }

                    <p className="key">Room decor:</p>
                    {charData.room_decor.length > 0 && <p>{charData.room_decor}</p>}
                    {charData.room_decor.length === 0 && <p className="no-data">No data entered.</p>}

                    <p className="key">Pets:</p>
                    {charData.pets.length > 0 && <p>{charData.pets}</p>}
                    {charData.pets.length === 0 && <p className="no-data">No data entered.</p>}

                    <p className="key">Motivation:</p>
                    {charData.motivation.length > 0 && <p>{charData.motivation}</p>}
                    {charData.motivation.length === 0 && <p className="no-data">No data entered.</p>}

                    <p className="key">Life history:</p>
                    {charData.history.length > 0 && <p>{charData.history}</p>}
                    {charData.history.length === 0 && <p className="no-data">No data entered.</p>}
                </div>
                <div className="buttons">
                    <button type='button' onClick={() => this.props.history.push(`/edit/character/${this.state.currentChar}`)} className="submit-btn">
                        Edit Character
                    </button>
                </div>
            </article>
        )
    }
}