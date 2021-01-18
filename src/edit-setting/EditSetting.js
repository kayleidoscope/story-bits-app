import React, {Component} from 'react';
import './EditSetting.css';
import Context from '../Context'
import CannotAccess from '../cannot-access/CannotAccess'
import config from '../config'

export default class EditSetting extends Component {
    static contextType = Context

    constructor(props) {
        super(props)
        this.state = {
            settingData: [],
            storiesData: [],
            storyId: null,
            storysUser: null,
            name: "",
            isResidence: null,
            hasDeleteForm: false,
            decor: "",
            description: ""
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

                fetch(`${config.API_ENDPOINT}api/stories/${responseJson.story_id}`, {
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
                            storysUser: responseJson.user_id
                        })
                    })
                    .catch(error => {
                        console.error(error)
                    })
            })
            .catch(error => {
                console.error(error)
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
            .catch(error => {
                console.error(error)
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

    handleResChange = (changeEvent) => {
        this.setState({
          isResidence: changeEvent.target.value === "true" ? true : false
        });
    };  

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

        fetch(`${config.API_ENDPOINT}api/settings/${this.props.match.params.settingId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error (res.status)
                }
                this.props.history.push(`/story/${this.state.storyId}`)
            })
            .catch(error => {
                console.error(error)
            })
    }

    handleSubmit = e => {
        e.preventDefault()
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
            .catch(error => {
                console.error(error)
            })
    }

    render() {
        //to prevent users from accessing stories that do not belong to them
        const currentUser = this.context.currentUser
        const storysUser = this.state.storysUser
        if (!this.state.storysUser) {
            return null
        } else if (currentUser !== storysUser) {
            return (
                <CannotAccess item="setting"/>
            )
        }

        const settingData = this.state.settingData
        const storyOptions = this.state.storiesData.map(story => {
            return (
                <option key={story.id} value={story.id}>{story.title}</option>
            )
        })

        return (
            <div className="edit-setting">
                <h2>{settingData.name}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="grid">
                        <label htmlFor="name">Setting name:</label>
                        <input id="name" type="text" value={this.state.name}  onChange={e => this.nameChange(e.target.value)}/>
                        <label htmlFor="description">Setting description:</label>
                        <textarea id="description" value={this.state.description}  onChange={e => this.descriptionChange(e.target.value)}/>
                        <label htmlFor="story">Story:</label>
                        <select name="story" id="story"  onChange={e => this.storyIdChange(e.target.value)}>
                            <option value="">Select a story</option>
                            {storyOptions}
                        </select>
                        <label htmlFor="decor">What it looks like:</label>
                        <textarea id="decor" value={this.state.decor} onChange={e => this.decorChange(e.target.value)}/>
                        <fieldset>
                            <legend htmlFor="isResidence">Can people live here?</legend>
                            <div className="container">
                                <div>
                                    <input 
                                        type="radio" 
                                        id="true" 
                                        name="isResidence" 
                                        value={true}
                                        checked={this.state.isResidence === null ? false : this.state.isResidence}
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
                                        checked={this.state.isResidence === null ? false : !this.state.isResidence}
                                        onChange={this.handleResChange}
                                    />
                                    <label htmlFor="false">No</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="buttons">
                        <input type='submit' className="submit-btn" value="Submit"/>
    {!this.state.hasDeleteForm &&                    <button type="button" onClick={(this.deleteToggled)} className="submit-btn">
                            Delete Setting
                        </button>}
                        <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                            Cancel
                        </button>
                    </div>
                    {this.state.hasDeleteForm && (
                        <div  className="delete-form">
                            <p>Are you sure you want to delete this setting? This action cannot be undone.</p>
                            <button type='button' className="delete-btn" onClick={this.handleDelete}>
                                Yes, delete {settingData.name}
                            </button>
                            <button type='button' className="delete-btn" onClick={this.deleteToggled}>
                                No, do not delete {settingData.name}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        )
    }
}