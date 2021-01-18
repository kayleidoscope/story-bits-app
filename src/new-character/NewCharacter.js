import React, {Component} from 'react';
import config from '../config'
import Context from '../Context'
import './NewCharacter.css';

export default class NewCharacter extends Component {
    static contextType = Context

    state = {
        story: null,
        name: "",
        description: "",
        gender: "",
        age: "",
        appearance: "",
        fashion: "",
        home: 0,
        housemates: "",
        decor: "",
        storiesData: [],
        settingsForThisStory: []
    }

    storyChange = (story) => {
        this.setState({
            story,
            home: 0
        })


        fetch(`${config.API_ENDPOINT}api/settings/?story_id=${story}`, {
            method: 'GET'
          })
            .then(res => {
              if(!res.ok) {
                throw new Error(res.status)
              }
              return res.json()
            })
            .then(responseJson => {
                const liveablePlaces = responseJson.filter(place => place.is_residence)

                this.setState({
                    settingsForThisStory: liveablePlaces
                })
            }
            )
    }

    nameChange = (name) => {
        this.setState({
            name
        })
    }

    descriptionChange = (description) => {
        this.setState({
            description
        })
    }

    genderChange = (gender) => {
        this.setState({
            gender
        })
    }

    ageChanged = (age) => {
        this.setState({
            age
        })
    }

    appearanceChange = (appearance) => {
        this.setState({
            appearance
        })
    }

    fashionChange = (fashion) => {
        this.setState({
            fashion
        })
    }

    homeChange = (home) => {
        this.setState({
            home
        })
    }

    housematesChange = (housemates) => {
        this.setState({
            housemates
        })
    }

    decorChange = (decor) => {
        this.setState({
            decor
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        //for PUT request to /characters/
        const story_id = this.state.story
        const name = this.state.name
        const description = this.state.description
        const gender = this.state.gender
        const age = this.state.age
        const appearance = this.state.appearance
        const fashion = this.state.fashion
        const housemates = this.state.housemates
        const room_decor = this.state.decor
        const newCharacter = {
            story_id, 
            name, 
            description, 
            gender, 
            age,
            appearance, 
            fashion, 
            housemates,
            room_decor
        }

        //for PUT request to /residences
        const setting_id = this.state.home

        fetch(`${config.API_ENDPOINT}api/characters`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCharacter)
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                const character_id = responseJson.id
                const newResidence = {setting_id, character_id}

                if (this.state.home > 0) {
                    fetch(`${config.API_ENDPOINT}api/residences`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(newResidence)
                    })
                        .then(res => {
                            if(!res.ok) {
                                throw new Error(res.status)
                            }
                            return res.json()
                        })
                        .catch(error => {
                            console.error(error)
                        })
                }

                this.props.history.push(`/story/${story_id}`)
            })
            .catch(error => {
                console.error(error)
            })

    }

    componentDidMount() {
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
          })}
          )
      }

    render() {
        const storyOptions = this.state.storiesData.map(story => {
            return (
                <option key={story.id} value={story.id}>{story.title}</option>
            )
        })

        const settingsOptions = this.state.settingsForThisStory.map(setting => {
            return (
                <option key={setting.id} value={setting.id}>{setting.name}</option>
            )
        })

        return (
            <section className="new-character">
                <h2>New character</h2>
                <p>Enter the info below. Fields denoted with an asterisk (*) are required.</p>
                <form className="new-character-form" onSubmit={this.handleSubmit}>
                    <div className="grid">
                        <label htmlFor="story">*Story:</label>
                        <select name="story" id="story" onChange={e => this.storyChange(e.target.value)}>
                            <option value="">Select a story</option>
                            {storyOptions}
                        </select>
                        <label htmlFor="title">*Name:</label>
                        <input type="text" id="name" name="name" required className="input" onChange={e => this.nameChange(e.target.value)}/>
                        <label htmlFor="description">*Short description:</label>
                        <textarea id="description" name="description" required  className="input" onChange={e => this.descriptionChange(e.target.value)}/>
                        <label htmlFor="gender">Gender:</label>
                        <input type="text" id="gender" name="gender"  className="input" onChange={e => this.genderChange(e.target.value)}/>
                        <label htmlFor="age">Age: </label>
                        <input type="text" value={this.state.age} id="age"  className="input" onChange={e => this.ageChanged(e.target.value)}/>
                        <label htmlFor="appearance">Physical appearance:</label>
                        <textarea id="appearance" name="appearance"  className="input" onChange={e => this.appearanceChange(e.target.value)}/>
                        <label htmlFor="style">Fashion style:</label>
                        <textarea id="style" name="style"  className="input" onChange={e => this.fashionChange(e.target.value)}/>
                        <label htmlFor="home">Home:</label>
                        <select name="home" id="home" onChange={e => this.homeChange(e.target.value)}>
                            <option value="0">Not important</option>
                            {settingsOptions}
                        </select>
                        <p className="housemates-aside">If you have created settings that people can live in, they will appear in the drop-down menu above.</p>
                        <label htmlFor="housemates">Housemates:</label>
                        <textarea id="housemates" name="housemates"  className="input" onChange={e => this.housematesChange(e.target.value)}/>
                        <label htmlFor="decor">Decor:</label>
                        <textarea id="decor" name="decor"  className="input" onChange={e => this.decorChange(e.target.value)}/>
                    </div>
                    <div className="buttons">
                        <input type="submit" value="Submit" className="submit-btn"/>
                        <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                            Cancel
                        </button>
                    </div>
                </form>
     
        </section>
        )
    }
}