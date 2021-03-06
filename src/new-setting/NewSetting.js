import React, {Component} from 'react';
import config from '../config'
import Context from '../Context'
import './NewSetting.css';

export default class NewSetting extends Component {
    static contextType = Context

    state = {
        story: null,
        storiesData: [],
        //the following states are changeable by the user
        name: "",
        description: "",
        decor: "",
        isResidence: false
    }

    componentDidMount() {
        //API call to get this user's stories
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
      }

    storyChange = (story) => {
        this.setState({
            story
        })
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

    decorChange = (decor) => {
        this.setState({
            decor
        })
    }

    handleResChange = changeEvent => {
        //this makes sure isResidence state changes correctly
        this.setState({
            isResidence: changeEvent.target.value === "true" ? true : false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const story_id = this.state.story
        const name = this.state.name
        const description = this.state.description
        const decor = this.state.decor
        const is_residence = this.state.isResidence
        const newSetting = {story_id, name, description, decor, is_residence}


        //API call to create a new setting
        fetch(`${config.API_ENDPOINT}api/settings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newSetting)
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => this.props.history.push(`/story/${story_id}`))
            .catch(error => {
                console.error(error)
            })
    }

    render() {
        const storyOptions = this.state.storiesData.map(story => {
            return (
                <option key={story.id} value={story.id}>{story.title}</option>
            )
        })

        return (
            <section className="new-setting">
                <h2>New setting</h2>
                <p>Enter the info below. Fields denoted with an asterisk (*) are required.</p>

                <form className="new-setting-form" onSubmit={this.handleSubmit}>
                    <div className="grid">
                        <label htmlFor="story">*Story:</label>
                        <select name="story" id="story" required onChange={e => this.storyChange(e.target.value)}>
                            <option value="">Select a story</option>
                            {storyOptions}
                        </select>
                        <label htmlFor="name">*Name:</label>
                        <input type="text" id="name" name="name" required   onChange={e => this.nameChange(e.target.value)}/>
                        <label htmlFor="description">*Short description:</label>
                        <textarea id="description" name="description" required   onChange={e => this.descriptionChange(e.target.value)}/>
                        <fieldset>
                            <legend htmlFor="isResidence">Can people live here?</legend>
                            <div className="container">
                                <div>
                                    <input 
                                        type="radio" 
                                        id="true" 
                                        name="isResidence" 
                                        value={true}
                                        onChange={this.handleResChange}
                                    />
                                    <label htmlFor="true">Yes</label>
                                </div>
                                <div>
                                    <input 
                                        type="radio" 
                                        id="false" 
                                        name="isResidence" 
                                        value={false} 
                                        onChange={this.handleResChange}
                                    />
                                    <label htmlFor="false">No</label>
                                </div>

                            </div>
                        </fieldset>
                        <label htmlFor="decor">What it looks like:</label>
                        <textarea id="decor" name="decor"  onChange={e => this.decorChange(e.target.value)}/>
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