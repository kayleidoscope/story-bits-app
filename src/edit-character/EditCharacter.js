import React, {Component} from 'react';
import config from '../config'
import Context from '../Context'
import CannotAccess from '../cannot-access/CannotAccess'
import './EditCharacter.css';

export default class EditCharacter extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            charData: {},
            currentChar: this.props.match.params.charId,
            storiesData: [],
            storyName: "",
            storysUser: null,
            hasHomeData: false,
            homeName: "",
            homeId: 0,
            hasRmData: false,
            settingsForThisStory: [],
            storyId: 0,
            //The following (name through motivation) are fields that the user can change. homeId, above, is also a changeable field.
            name: "",
            description: "",
            gender: "",
            pronouns: "",
            age: "",
            appearance: "",
            fashion: "",
            mannerisms: "",
            room_decor: "",
            pets: "",
            motivation: "",
            //if hasDeleteForm is true, a box verifying that the user actually wants to delete the character will appear
            hasDeleteForm: false
        }
      }

    componentDidMount() {
        //API call to get data on this user's stories
        fetch(`${config.API_ENDPOINT}api/stories/?user_id=${this.context.currentUser}`, {
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
            .catch(error => {
                console.error(error)
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
                    //setting the state values here allows the inputs on the page to be prefilled with that character's data
                    charData: responseJson,
                    name: responseJson.name,
                    description: responseJson.description,
                    storyId: responseJson.story_id,
                    gender: responseJson.gender,
                    pronouns: responseJson.pronouns,
                    age: responseJson.age,
                    appearance: responseJson.appearance,
                    fashion: responseJson.fashion,
                    mannerisms: responseJson.mannerisms,
                    room_decor: responseJson.room_decor,
                    pets: responseJson.pets,
                    motivation: responseJson.motivation,
                    history: responseJson.history
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
                        storyName: responseJson.title,
                        //gathering this data to check that the story this user is trying to access belongs to that user
                        storysUser: responseJson.user_id
                    })
                )
                .catch(error => {
                    console.error(error)
                })

                //API call to fill in settings for this story
                fetch(`${config.API_ENDPOINT}api/settings/?story_id=${responseJson.story_id}`, {
                    method: 'GET'
                    })
                    .then(res => {
                        if(!res.ok) {
                        throw new Error(res.status)
                        }
                        return res.json()
                    })
                    .then(responseJson => {
                        //finds only the places that the user has marked is_residence as true
                        const liveablePlaces = responseJson.filter(place => place.is_residence)

                        this.setState({
                            settingsForThisStory: liveablePlaces
                        })
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
            )
            .catch(error => {
                console.error(error)
            })
        

        //API call to get the name of this character's home
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
                //the following only runs if the character actually has a home designated
                if (responseJson.length > 0) {
                    this.setState({
                        homeId: responseJson[0].setting_id,
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
                    .catch(error => {
                        console.error(error)
                    })
                }
            })
            .catch(error => {
                console.error(error)
            })
            
    }

    nameChanged = (name) => {
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

        //API call to get other settings in the story the user just selected
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
                //once again, narrowing down to just places characters can live
                const liveablePlaces = responseJson.filter(place => place.is_residence)

                this.setState({
                    settingsForThisStory: liveablePlaces
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    genderChanged = (gender) => {
        this.setState({
            gender
        })
    }

    pronounsChange = (pronouns) => {
        this.setState({
            pronouns
        })
    }

    ageChanged = (age) => {
        this.setState({
            age
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

    mannerismsChange = (mannerisms) => {
        this.setState({
            mannerisms
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

    petsChanged = (pets) => {
        this.setState({
            pets
        })
    }

    motivationChange = (motivation) => {
        this.setState({
            motivation
        })
    }

    historyChange = (history) => {
        this.setState({
            history
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
        //deletes the character
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
        //for PATCH request to /characters/:charId
        const storyId = this.state.storyId
        const name = this.state.name
        const description = this.state.description
        const gender = this.state.gender
        const pronouns = this.state.pronouns
        const age = this.state.age
        const appearance = this.state.appearance
        const fashion = this.state.fashion
        const mannerisms = this.state.mannerisms
        const room_decor = this.state.room_decor
        const pets = this.state.pets
        const motivation = this.state.motivation
        const history = this.state.history

        const editedCharacter = {
            storyId, 
            name, 
            description, 
            gender, 
            pronouns,
            age,
            appearance, 
            fashion, 
            mannerisms,
            room_decor,
            pets,
            motivation,
            history
        }

        //for PATCH request to /residences
        const setting_id = this.state.homeId

        //API call to change the character's data on /characters
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

                //a fetch request to find out if the character has a designated residence...
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
                        //...if no residence is designated..
                        if(!responseJson.length) {
                            //...and also the user has seleted an actual residence ("not important" has a value of 0)...
                            if(setting_id > 0) {

                                editedResidence.character_id = this.state.currentChar
                                
                                //...API call to create that residence by POSTing to /residences.
                                fetch(`${config.API_ENDPOINT}api/residences/`, {
                                    method: 'POST',
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
                                    .catch(error => {
                                        console.error(error)
                                    })
                            }
                            this.props.history.push(`/character/${this.state.currentChar}`)
                            return responseJson
                        }
                        //...if a residence is designated, API call to change /residences/:resId with a PATCH request
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
                            .catch(error => {
                                console.error(error)
                            })
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
        //to prevent users from accessing stories that do not belong to them
        const currentUser = this.context.currentUser
        const storysUser = this.state.storysUser
        //to prevent the page from loading all staggered
        if (!this.state.charData || !this.state.storysUser) {
            return null
        } else if (currentUser !== storysUser) {
            return (
                <CannotAccess item="character"/>
            )
        }

        const charData = this.state.charData

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
                <h2>Editing {charData.name}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="grid">
                        <label htmlFor="name">Name: </label>
                        <input type="text" value={this.state.name} className="input" onChange={(e) => this.nameChanged(e.target.value)} />
                        <label htmlFor="description">Description: </label>
                        <textarea 
                                type="text" 
                                value={this.state.description} 
                                onChange={(e) => this.descriptionChanged(e.target.value)}
                                id="description"
                                className="input"
                        />

                        <label htmlFor="story">Story: </label>
                        <select name="story" id="story" value={this.state.storyId} onChange={e => this.storyChanged(e.target.value)}>
                                <option value="">Select a story</option>
                                {storyOptions}
                            </select>
                        <label htmlFor="gender">Gender: </label>
                        <input type="text" value={this.state.gender} className="input" id="gender" onChange={e => this.genderChanged(e.target.value)}/>
                        <label htmlFor="pronouns">Pronouns:</label>
                        <input type="text" id="pronouns" name="pronouns" value={this.state.pronouns} className="input" onChange={e => this.pronounsChange(e.target.value)}/>
                        <label htmlFor="age">Age: </label>
                        <input type="text" value={this.state.age} className="input" id="age" onChange={e => this.ageChanged(e.target.value)}/>
                        <label htmlFor="appearance">Physical appearance:</label>
                        <textarea value={this.state.appearance} className="input" id="appearance" onChange={e => this.appearanceChanged(e.target.value)}/>
                        <label htmlFor="fashion">Fashion style: </label>
                        <textarea value={this.state.fashion} className="input" id="fashion" onChange={e => this.fashionChanged(e.target.value)}/>
                        <label htmlFor="mannerisms">Mannerisms:</label>
                        <textarea id="mannerisms" name="mannerisms" value={this.state.mannerisms} className="input" onChange={e => this.mannerismsChange(e.target.value)}/>
                        <label htmlFor="home">Home: </label>
                            <select name="home" id="home" value={this.state.homeId} onChange={e => this.homeIdChanged(e.target.value)}>
                                <option value="0">Not important</option>
                                {settingsOptions}
                            </select>
                            <p className="housemates-aside">If you have created settings that people can live in, they will appear in the drop-down menu above.</p>
                        <label htmlFor="decor">Decor: </label>
                        <textarea type="text" className="input" value={this.state.room_decor} id="decor"  onChange={e => this.roomDecorChanged(e.target.value)}/>
                        <label htmlFor="pets">Pets:</label>
                        <textarea id="pets" name="pets" value={this.state.pets} className="input" onChange={e => this.petsChanged(e.target.value)}/>
                        <label htmlFor="motivation">Motivation:</label>
                        <textarea id="motivation" name="motivation" value={this.state.motivation} className="input" onChange={e => this.motivationChange(e.target.value)}/>
                        <label htmlFor="history">Life history:</label>
                        <textarea id="history" name="history" value={this.state.history} className="input" onChange={e => this.historyChange(e.target.value)}/>
                    </div>
                    <div className="buttons">
                        <input type='submit' className="submit-btn" value="Submit"/>
    {!this.state.hasDeleteForm &&                    <button type="button" onClick={(this.deleteToggled)} className="submit-btn">
                            Delete Character
                        </button>}
                        <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                            Cancel
                        </button>
                    </div>
                    {this.state.hasDeleteForm && (
                        <div className="delete-form">
                            <p>Are you sure you want to delete this character? This action cannot be undone.</p>
                            <button type='button' className="delete-btn" onClick={this.handleDelete}>
                                Yes, delete {charData.name}
                            </button>
                            <button type='button' className="delete-btn" onClick={this.deleteToggled}>
                                No, do not delete {charData.name}
                            </button>
                        </div>
                    )}
                </form>
            </article>
        )
    }
}