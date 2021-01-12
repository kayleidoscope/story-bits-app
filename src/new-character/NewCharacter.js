import React, {Component} from 'react';
import config from '../config'
import './NewCharacter.css';

export default class NewCharacter extends Component {
    state = {
        story: null,
        name: "",
        description: "",
        gender: "",
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
                this.setState({
                    settingsForThisStory: responseJson
            })}
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
        const appearance = this.state.appearance
        const fashion = this.state.fashion
        const housemates = this.state.housemates
        const room_decor = this.state.decor
        const newCharacter = {
            story_id, 
            name, 
            description, 
            gender, 
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
            <section>
                <h2>New character</h2>
                <p>Enter the info below.</p>
                <form className="new-character-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="story">Story:</label>
                    <select name="story" id="story" onChange={e => this.storyChange(e.target.value)}>
                        <option value="">Select a story</option>
                        {storyOptions}
                    </select>
                    <br/>
                    <label htmlFor="title">Name:</label>
                    <input type="text" id="name" name="name" required  onChange={e => this.nameChange(e.target.value)}/>
                    <br/>
                    <label htmlFor="description">Short description:</label>
                    <textarea id="description" name="description" required  onChange={e => this.descriptionChange(e.target.value)}/>
                    <br/>
                    <label htmlFor="gender">Gender:</label>
                    <input type="text" id="gender" name="gender"  onChange={e => this.genderChange(e.target.value)}/>
                    <br/>
                    <label htmlFor="appearance">Physical appearance:</label>
                    <textarea id="appearance" name="appearance"  onChange={e => this.appearanceChange(e.target.value)}/>
                    <br/>
                    <label htmlFor="style">Fashion style:</label>
                    <textarea id="style" name="style"  onChange={e => this.fashionChange(e.target.value)}/>
                    <br/>
                    <label htmlFor="home">Home:</label>
                    <select name="home" id="home" onChange={e => this.homeChange(e.target.value)}>
                        <option value="0">Not important</option>
                        {settingsOptions}
                    </select>
                    <br/>
                    <label htmlFor="housemates">Housemates:</label>
                    <textarea id="housemates" name="housemates"  onChange={e => this.housematesChange(e.target.value)}/>
                    <br/>
                    <label htmlFor="decor">Decor:</label>
                    <textarea id="decor" name="decor"  onChange={e => this.decorChange(e.target.value)}/>
                    <br/>
                    <input type="submit" value="Submit" className="submit-btn"/>
                    <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                        Cancel
                    </button>
                </form>
     
        </section>
        )
    }
}