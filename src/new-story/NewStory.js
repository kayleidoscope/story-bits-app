import React, {Component} from 'react';
import Context from '../Context';
import config from '../config'
import './NewStory.css';

export default class NewStory extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            //these values change to make up the story
            titleInput: "",
            descriptionInput: ""
        }
      }

    handleClickCancel = () => {
        this.props.history.push('/home/')
    }

    titleChange = (title) => {
        this.setState({
            titleInput: title,
        })
    }

    descriptionChange = (description) => {
        this.setState({
            descriptionInput: description,
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const title = this.state.titleInput
        const description = this.state.descriptionInput
        const user_id = this.context.currentUser
        const newStory = {title, description, user_id}
        
        //API call to create a new story
        fetch(`${config.API_ENDPOINT}api/stories`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newStory)
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(responseJson => {
                this.context.addStoryFx(responseJson)
                this.props.history.push("/home")
            })
            .catch(error => {
                console.error(error)
            })
        
    }

    render() {
        return (
            <section className="new-story">
                <h2>New story</h2>
                <p>Enter the info below.</p>
                <form className="new-story-form" onSubmit={this.handleSubmit}>
                    <div className="grid">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" required onChange={e => this.titleChange(e.target.value)}/>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" required onChange={e => this.descriptionChange(e.target.value)}/>
                    </div>
                    <input type="submit" value="Submit" className="submit-btn"/>
                    <button type='button' onClick={this.handleClickCancel}  className="submit-btn">
                        Cancel
                    </button>
                </form>
            </section>
        )
    }
}