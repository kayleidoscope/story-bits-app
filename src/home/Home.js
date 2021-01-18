import React, {Component} from 'react';
import Context from '../Context';
import {Link} from 'react-router-dom';
import config from '../config'
import './Home.css';

export default class Home extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
          userInfo: {},
          usersStories: []
        }
      }

    componentDidMount() {
        const currentUserId = this.context.currentUser
        
        //API call to grab this user's info
        fetch(`${config.API_ENDPOINT}api/users/${currentUserId}`, {
            method: 'GET'
        })
        .then(res => {
            if (!res.ok) {
              throw new Error(res.status)
            }
            return res.json()
          })
            .then(responseJson => this.setState({userInfo: responseJson}))
            .catch(error => {
                console.error(error)
            })
        
        //API call to grab stories this user has written
        fetch(`${config.API_ENDPOINT}api/stories/?user_id=${currentUserId}`, {
            method: 'GET'
        })
        .then(res => {
            if (!res.ok) {
            throw new Error(res.status)
            }
            return res.json()
        })
            .then(responseJson => {
                this.setState({usersStories: responseJson})
                this.context.apiStoriesSetFx(responseJson)
            })
            .catch(error => {
                console.error(error)
            })
    }


    render () {
        const username = this.state.userInfo.username
        const data = this.state.usersStories;

        const simpleStoryLIs = data.map(story => {
            return (
                <li key={story.id} className="home-story">
                <Link to={`/story/${story.id}`}>
                    <h4>{story.title}</h4>
                </Link>
                <p>{story.description}</p>
                </li>
            )
        })

        return (
            <div className="home">
                <h2>Welcome, {username}!</h2>
                <Link to='/stories/'>
                    <h3>My stories</h3>
                </Link>
                <ul className="story-grid">
                    {simpleStoryLIs}
                </ul>
                <Link to="/new/story">
                    <button>
                        New story
                    </button>
                </Link>
            </div>
        )
    }
}