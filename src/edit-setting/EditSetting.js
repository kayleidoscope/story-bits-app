import React, {Component} from 'react';
import './EditSetting.css';
import config from '../config'

export default class EditSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            settingData: [],
            storiesData: [],
            storyId: null,
            storyIdTouched: false,
            name: "",
            nameTouched: false,
        }
    }

    componentDidMount() {
        const setId = this.props.match.params.settingId

        fetch(`${config.API_ENDPOINT}api/settings/${setId}`, {
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
                    settingData: responseJson
                })

            })
        fetch(`${config.API_ENDPOINT}api/stories/`, {
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
                    storiesData: responseJson
                })
            })
    }

    storyIdChange = (story) => {
        this.setState({
            storyId: story,
            storyIdTouched: true
        })
    }

    nameChange = (name) => {
        this.setState({
            name,
            nameTouched: true
        })
    }

    render() {
        const settingData = this.state.settingData
        console.log(this.state.storyId, this.state.storyIdTouched)
        console.log(this.state.name, this.state.nameTouched)
        const storyOptions = this.state.storiesData.map(story => {
            return (
                <option key={story.id} value={story.id}>{story.title}</option>
            )
        })

        return (
            <>
                <h2>{settingData.name}</h2>
                <form>
                    <label htmlFor="name">Setting name:</label>
                    <input id="name" type="text" value={settingData.name}  onChange={e => this.nameChange(e.target.value)}/>
                    <br />
                    <label htmlFor="story">Story:</label>
                    <select name="story" id="story"  onChange={e => this.storyIdChange(e.target.value)}>
                        <option value="">Select a story</option>
                        {storyOptions}
                    </select>
                </form>
            </>
        )
    }
}