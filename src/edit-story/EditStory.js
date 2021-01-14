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
        console.log('handleSubmit - edit story ran')
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
        if (currentUser !== storysUser) {
            return (
                <CannotAccess item="story"/>
            )
        }

        return (
            <div>
                <h2>Edit {this.state.storyData.title}</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Story title: </label>
                    <input id="title" type="text" value={this.state.title} onChange={e => this.titleChange(e.target.value)}/>
                    <br />
                    <label htmlFor="description">Story description: </label>
                    <br />
                    <textarea id="description" value={this.state.description} onChange={e => this.descriptionChange(e.target.value)}/>
                    <input type='submit' className="submit-btn" />
                    <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                        Go Back
                    </button>
                </form>
            </div>
        )
    }
}