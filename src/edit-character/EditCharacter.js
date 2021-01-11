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
            storyId: 0,
            hasHomeData: false,
            homeName: "",
            homeId: 0,
            hasRmData: false,
            roommateData: [],
            settingsForThisStory: [],
            description: "",
            gender: "",
            appearance: "",
            fashion: "",
            room_decor: ""
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
                    charData: responseJson
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
                        storyId: responseJson.id
                    })
                )

                //API call to get other settings in this character's story
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
                        this.setState({
                            settingsForThisStory: responseJson
                        })
                    })
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

    descriptionChanged = (description) => {
        console.log('descriptionChanged ran')
        this.setState({
            description
        })
    }

    storyChanged = (storyId) => {
        this.setState({
            storyId
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

    homeChanged = (home) => {
        this.setState({
            home
        })
    }

    roomDecorChanged = (room_decor) => {
        this.setState({
            room_decor
        })
    }


    handleSubmit = (e) =>{
        e.preventDefault()
        const story_id = this.state.storyId
        const name = this.state.name
        const description = this.state.description
        const gender = this.state.gender
        const appearance = this.state.appearance
        const fashion = this.state.fashion
        const housemates = this.state.housemates
        const room_decor = this.state.decor
        const editedCharacter = {
            story_id, 
            name, 
            description, 
            gender, 
            appearance, 
            fashion, 
            housemates,
            room_decor
        }
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
                <div>
                    <label htmlFor="description">Description: </label>
                    <textarea 
                        type="text" 
                        value={charData.description} 
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
                <input type="text" value={charData.gender} id="gender"  onChange={e => this.genderChanged(e.target.value)}/>
                <br />
                <label htmlFor="appearance">Physical appearance:</label>
                <textarea value={charData.appearance} id="appearance"  onChange={e => this.appearanceChanged(e.target.value)}/>
                <br />
                <label htmlFor="fashion">Fashion style: </label>
                <textarea value={charData.fashion} id="fashion"  onChange={e => this.fashionChanged(e.target.value)}/>
                <br />
                <label htmlFor="home">Home: </label>
                    <select name="home" id="home" onChange={e => this.homeChanged(e.target.value)}>
                        {settingsOptions}
                    </select>
                <br />
                    <label htmlFor="housemates">Housemates: </label>
                    <p>To change {charData.name}'s housemates, edit their Home selection on their own Edit Character page.</p>
                    <ul>
                        {charChecks}
                    </ul>

                <h4>Decor</h4>
                <p>{charData.decor}</p>
                <textarea type="text" value={charData.room_decor} id="decor"  onChange={e => this.roomDecorChanged(e.target.value)}/>
                <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                    Go Back
                </button>
                <input type='submit' className="submit-btn" />
            </article>
        )
    }
}