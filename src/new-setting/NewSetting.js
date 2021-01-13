import React, {Component} from 'react';
import config from '../config'
import Context from '../Context'
import './NewSetting.css';

export default class NewSetting extends Component {
    static contextType = Context

    state = {
        story: null,
        storiesData: [],
        name: "",
        description: "",
        decor: "",
        isResidence: false
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
        this.setState({
            isResidence: changeEvent.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const story_id = this.state.story
        const name = this.state.name
        const description = this.state.description
        const decor = this.state.decor
        const newSetting = {story_id, name, description, decor}

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

        // const charData = data.characters.filter(char => char.story.id === this.state.story)
        // const charChecks = charData.map(char => {
        //     return (
        //         <li key={char.id}>
        //             <input type="checkbox" id={char.id} name={char.id} />
        //             <label for={char.id}> {char.name}</label>
        //         </li>
        //     )
        // })

        return (
            <section>
                <h2>New setting</h2>
                <p>Enter the info below.</p>
                <form className="new-setting-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="story">Story:</label>
                    <select name="story" id="story"  onChange={e => this.storyChange(e.target.value)}>
                        <option value="">Select a story</option>
                        {storyOptions}
                    </select>
                    <br/>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required   onChange={e => this.nameChange(e.target.value)}/>
                    <br/>
                    <label htmlFor="description">Short description:</label>
                    <textarea id="description" name="description" required   onChange={e => this.descriptionChange(e.target.value)}/>
                    <br/>
                    {/* <label htmlFor="occupants">Occupants:</label>
                    <ul>
                        {charChecks}
                    </ul> */}
                    <br />
                    <fieldset>
                        <legend htmlFor="isResidence">Can people live here?</legend>
                        <input 
                            type="radio" 
                            id="true" 
                            name="isResidence" 
                            value={true}
                            onChange={this.handleResChange}
                        />
                        <label htmlFor="true">Yes</label>
                        <br />
                        <input 
                            type="radio" 
                            id="false" 
                            name="isResidence" 
                            value={false} 
                            onChange={this.handleResChange}
                        />
                        <label htmlFor="false">No</label>
                    </fieldset>
                    <label htmlFor="decor">Decor:</label>
                    <textarea id="decor" name="decor"   onChange={e => this.decorChange(e.target.value)}/>
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