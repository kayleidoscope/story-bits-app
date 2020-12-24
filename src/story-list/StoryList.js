import React, {Component} from 'react';
import dummyData from '../dummyData';
import StoryItem from '../story-item/StoryItem';
import './StoryList.css';

export default class StoryList extends Component {
    render() {
        const storyComponents = dummyData.stories.map(story => {
            return (
                <StoryItem story={story.id} key={story.id}/>
            )
        })

        return (
            <div>
                {storyComponents}
            </div>
        )
    }
}