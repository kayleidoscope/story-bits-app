import React, {Component} from 'react';
import './EditSetting.css';
import Context from '../Context'
import config from '../config'

export default class EditSetting extends Component {
    static contextType = Context

    constructor(props) {
        super(props)
        this.state = {
            settingData: [],
            storiesData: [],
            storyId: null,
            name: "",
            isResidence: null
        }
    }

    componentDidMount() {
        const setId = this.props.match.params.settingId

        fetch(`${config.API_ENDPOINT}api/settings/${setId}`, {
            method: 'GET'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.setState({
                    settingData: responseJson,
                    name: responseJson.name,
                    description: responseJson.description,
                    storyId: responseJson.story_id,
                    isResidence: responseJson.is_residence,
                    decor: responseJson.decor
                })

            })
        fetch(`${config.API_ENDPOINT}api/stories/?user_id=${this.context.currentUser}`, {
            method: 'GET'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.setState({
                    storiesData: responseJson
                })
            })
    }

    storyIdChange = (story) => {
        this.setState({
            storyId: story
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
        });
    };  

    handleSubmit = e => {
        e.preventDefault()
        console.log('handleSubmit - edit setting ran')
        const name = this.state.name
        const description = this.state.description
        const story_id = this.state.storyId
        const is_residence = this.state.isResidence
        const decor = this.state.decor

        const editedSetting = {name, description, story_id, is_residence, decor}

        fetch(`${config.API_ENDPOINT}api/settings/${this.props.match.params.settingId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(editedSetting)
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
            })
            .then(noData => this.props.history.push(`/setting/${this.props.match.params.settingId}`))
    }

    render() {
        const settingData = this.state.settingData
        const storyOptions = this.state.storiesData.map(story => {
            return (
                <option key={story.id} value={story.id}>{story.title}</option>
            )
        })

        return (
            <>
                <h2>{settingData.name}</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Setting name:</label>
                    <input id="name" type="text" value={this.state.name}  onChange={e => this.nameChange(e.target.value)}/>
                    <br />
                    <label htmlFor="description">Setting description:</label>
                    <input id="description" type="text" value={this.state.description}  onChange={e => this.descriptionChange(e.target.value)}/>
                    <br />
                    <label htmlFor="story">Story:</label>
                    <select name="story" id="story"  onChange={e => this.storyIdChange(e.target.value)}>
                        <option value="">Select a story</option>
                        {storyOptions}
                    </select>
                    <br />
                    <label htmlFor="decor">Setting decor:</label>
                    <br />
                    <textarea id="decor" value={this.state.decor} onChange={e => this.decorChange(e.target.value)}/>
                    <br />
                    <fieldset>
                        <legend htmlFor="isResidence">Can people live here?</legend>
                        <input 
                            type="radio" 
                            id="true" 
                            name="isResidence" 
                            value={true}
                            checked={this.state.isResidence === "true"}
                            onChange={this.handleResChange}
                        />
                        <label htmlFor="true">Yes</label>
                        <br />
                        <input 
                            type="radio" 
                            id="false" 
                            name="isResidence" 
                            value={false} 
                            checked={this.state.isResidence === "false"}
                            onChange={this.handleResChange}
                        />
                        <label htmlFor="true">No</label>
                    </fieldset>
                    <input type='submit' className="submit-btn" />
{!this.state.hasDeleteForm &&                    <button type="button" onClick={(this.deleteToggled)} className="submit-btn">
                        Delete Character
                    </button>}
                    <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                        Go Back
                    </button>
                    {this.state.hasDeleteForm && (
                        <div>
                            <p>Are you sure you want to delete this setting? This action cannot be undone.</p>
                            <button type='button' onClick={this.handleDelete}>
                                Yes, delete {settingData.name}
                            </button>
                            <button type='button' onClick={this.deleteToggled}>
                                No, do not delete {settingData.name}
                            </button>
                        </div>
                    )}
                </form>
            </>
        )
    }
}