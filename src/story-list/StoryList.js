import React, {Component} from 'react';
import config from '../config'
import StoryItem from '../story-item/StoryItem';
import Context from '../Context'
import './StoryList.css';

export default class StoryList extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
          storyIds: []
        }
      }

    componentDidMount() {
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
                const arrayOfStoryIds = responseJson.map(story => story.id)
                this.setState({
                    storyIds: arrayOfStoryIds
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    render() {
        const storyComponents = this.state.storyIds.map(story => {
            return (
                <StoryItem story={story} key={story}/>
            )
        })

        return (
            <div className="story-list grid">
                {storyComponents}
            </div>
        )
    }
}