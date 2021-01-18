import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../config'
import './StoryItem.css';

export default class StoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          storyData: [],
          charactersData: [],
          settingsData: []
        }
      }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}api/stories/${this.props.story}`, {
            method: 'GET'
        })
        .then(res => {
            if (!res.ok) {
            throw new Error(res.status)
            }
            return res.json()
        })
            .then(responseJson => {
                this.setState({
                    storyData: responseJson
                })
            })
            .catch(error => {
                console.error(error)
            })
        
        fetch(`${config.API_ENDPOINT}api/characters/?story_id=${this.props.story}`, {
            method: 'GET'
        })
        .then(res => {
            if (!res.ok) {
            throw new Error(res.status)
            }
            return res.json()
        })
            .then(responseJson => {
                this.setState({
                    charactersData: responseJson
                })
            })
            .catch(error => {
                console.error(error)
            })

            fetch(`${config.API_ENDPOINT}api/settings/?story_id=${this.props.story}`, {
                method: 'GET'
            })
            .then(res => {
                if (!res.ok) {
                throw new Error(res.status)
                }
                return res.json()
            })
                .then(responseJson => {
                    this.setState({
                        settingsData: responseJson
                    })
                })
                .catch(error => {
                    console.error(error)
                })
    }



    render() {
        const storyId = this.props.story;

        const storyData = this.state.storyData
        const storyName = storyData.title;
        const storyDescription = storyData.decor;
        
        const charData = this.state.charactersData
        const charLIs = charData.map(char => {
            return (
                <Link to={`/character/${char.id}`} key={char.id}>
                    <li className="story-item-li">{char.name}</li>
                </Link>
            )
        })

        const settingData = this.state.settingsData
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
            <section className="mini">
                <h4>Characters</h4>
                    <ul>
                    {charLIs.length > 0 && charLIs}
                    {charLIs.length === 0 && <li className="no-data">No characters created.</li>}
                    </ul>
            </section>
            <section className="mini">
                <h4>Settings</h4>
                    <ul>
                        {settingLIs.length > 0 && settingLIs}
                        {settingLIs.length === 0 && <li className="no-data">No settings created.</li>}
                    </ul>
            </section>
        </article>
        )
    }
}
