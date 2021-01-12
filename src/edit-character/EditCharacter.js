import React, {Component} from 'react';
import config from '../config'
import './EditCharacter.css';

export default class EditCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charData: [],
            currentChar: this.props.match.params.charId,
            storiesData: [],
            storyName: "",
            hasHomeData: false,
            homeName: "",
            homeId: 0,
            homeIdTouched: false,
            hasRmData: false,
            roommateData: [],
            settingsForThisStory: [],
            storyId: null,
            name: "",
            description: "",
            gender: "",
            appearance: "",
            fashion: "",
            room_decor: "",
            hasDeleteForm: false
        }
      }

    componentDidMount() {
        //API call to get this character's data and autofill the input values
        fetch(`${config.API_ENDPOINT}api/stories/`, {
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
                    storiesData: responseJson
                })
            })

        //API call to get this character's data and autofill the input values
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
                    charData: responseJson,
                    name: responseJson.name,
                    description: responseJson.description,
                    storyId: responseJson.story_id,
                    gender: responseJson.gender,
                    appearance: responseJson.appearance,
                    fashion: responseJson.fashion,
                    room_decor: responseJson.room_decor,
                })
                
                //API call to get the name of this character's story
                fetch(`${config.API_ENDPOINT}api/stories/${responseJson.story_id}`, {
                    method: 'GET'
                })
                .then(res => {
                    if(!res.ok) {
                      throw new Error(res.status)
                    }
                    return res.json()
                  })
                .then(responseJson => 
                    this.setState({
                        storyName: responseJson.title                    })
                )
            }
            )
        

        //API call to get this character's home
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
                        homeId: responseJson[0].id,
                        hasHomeData: true
                    })

                    //API call to get the name of this character's home
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
                    
                    //API call to get other residents of this house
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

    nameChanged = (name) => {
        console.log('nameChanged ran')
        this.setState({
            name
        })
    }


    descriptionChanged = (description) => {
        ('descriptionChanged ran')
        this.setState({
            description
        })
    }

    storyChanged = (storyId) => {
        this.setState({
            storyId
        })

        //API call to get other settings in this character's story
        fetch(`${config.API_ENDPOINT}api/settings/?story_id=${storyId}`, {
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
                    settingsForThisStory: responseJson
                })
            })
    }

    genderChanged = (gender) => {
        this.setState({
            gender
        })
    }

    appearanceChanged = (appearance) => {
        this.setState({
            appearance
        })
    }

    fashionChanged = (fashion) => {
        this.setState({
            fashion
        })
    }

    homeIdChanged = (homeId) => {
        this.setState({
            homeId
        })
    }

    roomDecorChanged = (room_decor) => {
        this.setState({
            room_decor
        })
    }

    deleteToggled = e => {
        if(!this.state.hasDeleteForm) {
            this.setState({
                hasDeleteForm: true
            })
        } else if (this.state.hasDeleteForm) {
            this.setState({
                hasDeleteForm: false
            })
        }
    }

    handleDelete = e => {
        e.preventDefault()
        console.log('handleDelete ran')

        fetch(`${config.API_ENDPOINT}api/characters/${this.state.currentChar}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error (res.status)
                }
                this.props.history.push(`/story/${this.state.charData.story_id}`)
            })
            .catch(error => {
                console.error(error)
            })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const storyId = this.state.storyId
        const name = this.state.name
        const description = this.state.description
        const gender = this.state.gender
        const appearance = this.state.appearance
        const fashion = this.state.fashion
        const room_decor = this.state.room_decor

        const editedCharacter = {
            storyId, 
            name, 
            description, 
            gender, 
            appearance, 
            fashion, 
            room_decor
        }

        //for PUT request to /residences
        const setting_id = this.state.homeId

        fetch(`${config.API_ENDPOINT}api/characters/${this.state.currentChar}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(editedCharacter)
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
            })
            .then(responseJson => {
                const editedResidence = {setting_id}

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
                        fetch(`${config.API_ENDPOINT}api/residences/${responseJson[0].id}`, {
                            method: 'PATCH',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(editedResidence)
                        })
                            .then(res => {
                                if(!res.ok) {
                                    throw new Error(res.status)
                                }
                            })
                            .then(noData => this.props.history.push(`/character/${this.state.currentChar}`))
                    })
                    .catch(error => {
                        console.error(error)
                    })
            })
            .catch(error => {
                console.error(error)
            })
    }


    render() {
        const charData = this.state.charData
        const charChecks = this.state.roommateData.map(char => {
            return (
                <li key={char.id}>
                    <p className="edit-checkbox" htmlFor={char.id}> {char.name}</p>
                </li>
            )
        })

        const settingsData = this.state.settingsForThisStory
        const settingsOptions = settingsData.map(setting => {
            return (
                <option key={setting.id} value={setting.id}>{setting.name}</option>
            )
        })

        const storyOptions = this.state.storiesData.map(story => {
            return (
                <option key={story.id} value={story.id}>{story.title}</option>
            )
        })

        return (
            <article className="edit-character">
                <h3>{charData.name}</h3>
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="name">Name: </label>
                    <input type="text" value={this.state.name} onChange={(e) => this.nameChanged(e.target.value)} />
                    <div>
                        <label htmlFor="description">Description: </label>
                        <textarea 
                            type="text" 
                            value={this.state.description} 
                            onChange={(e) => this.descriptionChanged(e.target.value)}
                            id="description"
                        />
                    </div>

                    <label htmlFor="story">Story: </label>
                    <select name="story" id="story" onChange={e => this.storyChanged(e.target.value)}>
                            <option value="">Select a story</option>
                            {storyOptions}
                        </select>
                    <br/>
                    <label htmlFor="gender">Gender: </label>
                    <input type="text" value={this.state.gender} id="gender" onChange={e => this.genderChanged(e.target.value)}/>
                    <br />
                    <label htmlFor="appearance">Physical appearance:</label>
                    <textarea value={this.state.appearance} id="appearance" onChange={e => this.appearanceChanged(e.target.value)}/>
                    <br />
                    <label htmlFor="fashion">Fashion style: </label>
                    <textarea value={this.state.fashion} id="fashion" onChange={e => this.fashionChanged(e.target.value)}/>
                    <br />
                    <label htmlFor="home">Home: </label>
                        <select name="home" id="home" onChange={e => this.homeIdChanged(e.target.value)}>
                            <option value="0">Not important</option>
                            {settingsOptions}
                        </select>
                    <br />
                        <label htmlFor="housemates">Housemates: </label>
                        <p>To change {charData.name}'s housemates, edit their Home selection on their own Edit Character page.</p>
                        <ul>
                            {charChecks}
                        </ul>

                    <h4>Decor</h4>
                    <textarea type="text" value={this.state.room_decor} id="decor"  onChange={e => this.roomDecorChanged(e.target.value)}/>
                    <input type='submit' className="submit-btn" />
{!this.state.hasDeleteForm &&                    <button type="button" onClick={(this.deleteToggled)} className="submit-btn">
                        Delete Character
                    </button>}
                    <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                        Go Back
                    </button>
                    {this.state.hasDeleteForm && (
                        <div>
                            <p>Are you sure you want to delete this character? This action cannot be undone.</p>
                            <button type='button' onClick={this.handleDelete}>
                                Yes, delete {charData.name}
                            </button>
                            <button type='button' onClick={this.deleteToggled}>
                                No, do not delete {charData.name}
                            </button>
                        </div>
                    )}
                </form>
            </article>
        )
    }
}