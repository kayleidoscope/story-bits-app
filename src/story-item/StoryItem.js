import React, {Component} from 'react';
import dummyData from '../dummyData';
import './StoryItem.css';

export default class StoryItem extends Component {
    render() {
        const data = dummyData
        const storyId = this.props.story;

        const storyData = data.stories.filter(story => story.id === storyId)
        const storyName = storyData[0].title;
        const storyDescription = storyData[0].description;
        
        const charData = data.characters.filter(char => char.story.id == storyId)
        const charLIs = charData.map(char => {
            return (
                <li key={char.id} className="story-item-li"><a href="#">{char.name}</a></li>
            )
        })

        const settingData = data.settings.filter(setting => setting.story.id === storyId)
        const settingLIs = settingData.map(setting => {
            return (
                <li key={setting.id} className="story-item-li"><a href="#">{setting.name}</a></li>
            )
        })

        return (
            <article>
            <h3>{storyName}</h3>
            <p>{storyDescription}</p>
            <section>
                <h4>Characters</h4>
                    <ul>
                        {charLIs}
                    </ul>
            </section>
            <section>
                <h4>Settings</h4>
                    <ul>
                        {settingLIs}
                    </ul>
            </section>
        </article>
        )
    }
}
