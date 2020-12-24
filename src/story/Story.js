import React, {Component} from 'react';
import dummyData from '../dummyData';
import './Story.css';

export default class Story extends Component {
    render() {
        const data = dummyData;

        const storyId = "0";

        const storyData = data.stories.filter(story => story.id === storyId);

        const charData = data.characters.filter(char => char.story.id === storyId);
        const charLIs = charData.map(char => {
            return (
                <li className="summary" key={char.id}>
                    <a href="#">{char.name}</a>
                    <p>{char.description}</p>
                </li>
            )
        })

        const settingData = data.settings.filter(setting => setting.story.id === storyId);
        const settingLIs = settingData.map(setting => {
            return (
                <li className="summary" key={setting.id}>
                    <a href="#">{setting.name}</a>
                    <p>{setting.description}</p>
                </li>
            )
        })

        return (
            <div className="story">
                <h2>{storyData[0].title}</h2>
                <p>{storyData[0].description}</p>
                <article>
                    <section>
                        <h3>Characters</h3>
                            <ul>
                                {charLIs}
                            </ul>
                    </section>
                    <section>
                        <h3>Settings</h3>
                            <ul>
                                {settingLIs}
                            </ul>
                    </section>
                </article>
            </div>
        )
    }
}