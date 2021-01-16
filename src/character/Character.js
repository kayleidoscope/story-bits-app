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

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}api/characters/${this.state.currentChar}`, {
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
                    // <Link to={`/character/${rm.id}`} key={rm.id}>
                        <li key={rm.id}>
                            {rm.name}
                        </li>
                    // </Link>
                    
                )
            }
        })

        

        return (
            <article className="character-deets">
                <h3>{charData.name}</h3>

                <button type='button' onClick={() => this.props.history.push(`/edit/character/${this.state.currentChar}`)} className="submit-btn">
                    Edit Character
                </button>

                <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                    Go Back
                </button>

                <p>{charData.description}</p>

                <h4>Story:</h4>
                <Link to={`/story/${this.state.storyId}`}>
                    <p>{this.state.storyName}</p>
                </Link>

                <h4>Gender:</h4>
                <p>{charData.gender}</p>

                <h4>Age:</h4>
                <p>{charData.age}</p>

                <h4>Physical appearance:</h4>
                <p>{charData.appearance}</p>

                <h4>Fashion style</h4>
                <p>{charData.fashion}</p>

                {this.state.hasHomeData &&
                    (<div>
                        <h4>Home</h4>
                        <Link to={`/setting/${this.state.homeId}`}>
                            <p>{this.state.homeName}</p>
                        </Link>
                    </div>)
                }
                
                {this.state.hasRmData && 
                    <div>
                        <h4>Housemates</h4>
                        <ul>
                            {housematesLIs}
                        </ul>
                    </div>
                }

                <h4>Room decor</h4>
                <p>{charData.room_decor}</p>
            </article>
        )
    }
}