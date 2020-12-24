import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import dummyData from '../dummyData';
import './Story.css';

export default class Story extends Component {
    render() {
        const data = dummyData;

        const storyId = this.props.match.params.storyId;

        const storyData = data.stories.filter(story => story.id === storyId);

        const charData = data.characters.filter(char => char.story.id === storyId);
        const charLIs = charData.map(char => {
            return (
                <Link to={`/character/${char.id}`} key={char.id}>
                    <li className="summary">
                        <p>{char.name}</p>
                        <p>{char.description}</p>
                    </li>
                </Link>
            )
        })

        const settingData = data.settings.filter(setting => setting.story.id === storyId);
        const settingLIs = settingData.map(setting => {
            return (
                <Link to={`/setting/${setting.id}`} key={setting.id}>
                    <li className="summary">
                        <p>{setting.name}</p>
                        <p>{setting.description}</p>
                    </li>
                </Link>
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
                        <Link to="/new/character/">
                            <button>
                                New Character
                            </button>
                        </Link>
                    </section>
                    <section>
                        <h3>Settings</h3>
                            <ul>
                                {settingLIs}
                            </ul>
                        <Link to="/new/setting/">
                            <button>
                                New Setting
                            </button>
                        </Link>
                    </section>
                </article>
            </div>
        )
    }
}