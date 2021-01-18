import React, {Component} from 'react';
import './EditStory.css';
import Context from '../Context'
import CannotAccess from '../cannot-access/CannotAccess'
import config from '../config'

export default class EditStory extends Component {
    static contextType = Context
    constructor(props) {
        super(props);
        this.state = {
          title: "",
          description: "",
          hasDeleteForm: false,
          storyData: {}
        }
      }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}api/stories/${this.props.match.params.storyId}`, {
            method: 'GET'
        })
        .then(res => {
            if(!res.ok) {
                throw new Error (res.status)
            }
            return res.json()
        })
        .then(responseJson => {
            this.setState({
                storyData: responseJson,
                title: responseJson.title,
                description: responseJson.description
            })
        })
        .catch(error => {
            console.error(error)
        })
    }

    titleChange = (title) => {
        this.setState({
            title
        })
    }

    descriptionChange = (description) => {
        this.setState({
            description
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const title = this.state.title
        const description = this.state.description

        const editedStory = {title, description}

        fetch(`${config.API_ENDPOINT}api/stories/${this.props.match.params.storyId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(editedStory)
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
            })
            .then(noData => this.props.history.push(`/story/${this.props.match.params.storyId}`))
            .catch(error => {
                console.error(error)
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

    render() {
        //to prevent users from accessing stories that do not belong to them
        const currentUser = this.context.currentUser
        const storysUser = this.state.storyData.user_id
        if (!storysUser) {
            return null
        } else if (currentUser !== storysUser) {
            return (
                <CannotAccess item="story"/>
            )
        }

        return (
            <div className="edit-story">
                <h2>Edit {this.state.storyData.title}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="grid">
                        <label htmlFor="title">Story title: </label>
                        <div className="input">
                            <input id="title" className="input" type="text" value={this.state.title} onChange={e => this.titleChange(e.target.value)}/>
                        </div>
                        <label htmlFor="description">Synopsis: </label>
                        <div className="input">
                            <textarea id="description"  className="input" value={this.state.description} onChange={e => this.descriptionChange(e.target.value)}/>
                        </div>
                    </div>
                    <div className="buttons">
                        <input type='submit' value="Submit" className="submit-btn" />
                        <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}