import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import dummyData from '../dummyData';
import './StoryItem.css';

export default class StoryItem extends Component {
    render() {
        const data = dummyData
        const storyId = this.props.story;

        const storyData = data.stories.filter(story => story.id === storyId)
        const storyName = storyData[0].title;
        const storyDescription = storyData[0].description;
        
        const charData = data.characters.filter(char => char.story.id === storyId)
        const charLIs = charData.map(char => {
            return (
                <Link to={`/character/${char.id}`} key={char.id}>
                    <li className="story-item-li">{char.name}</li>
                </Link>
            )
        })

        const settingData = data.settings.filter(setting => setting.story.id === storyId)
        const settingLIs = settingData.map(setting => {
            return (
                <Link to={`/setting/${setting.id}`}  key={setting.id}>
                    <li className="story-item-li">{setting.name}</li>
                </Link>
            )
        })

        return (
            <article className="story-item">
                <Link to={`/story/${storyId}`}>
                    <h3>{storyName}</h3>
                </Link>
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
