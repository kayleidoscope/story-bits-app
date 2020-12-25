import React, {Component} from 'react';
import dummyData from '../dummyData';
import './EditCharacter.css';

export default class EditCharacter extends Component {
    state = {
        description: "",
        story: "",
        gender: "",
        appearance: "",
        fashion: "",
        home: "",
    }

    descriptionChanged = (description) => {
        console.log('descriptionChanged ran')
        this.setState({
            description
        })
        console.log(this.state.description)
    }

    storyChanged = (story) => {
        this.setState({
            story
        })
    }

    genderChanged = (gender) => {
        this.setState({
            gender
        })
    }

    appearanceChanged = (appearance) => {
        this.setState({
            appearance
        })
    }

    fashionChanged = (fashion) => {
        this.setState({
            fashion
        })
    }

    homeChanged = (home) => {
        this.setState({
            home
        })
    }


    render() {
        const data = dummyData;

        const currentChar = this.props.match.params.charId;

        const charData = data.characters.filter(char => char.id === currentChar)
        const charChecks = charData.map(char => {
            return (
                <li key={char.id}>
                    <input type="checkbox" id={char.id} name={char.id} />
                    <label className="edit-checkbox" htmlFor={char.id}> {char.name}</label>
                </li>
            )
        })

        const settingsData = data.settings.filter(setting => setting.story.id === charData[0].story.id)
        const settingsOptions = settingsData.map(setting => {
            return (
                <option key={setting.id} value={setting.id}>{setting.name}</option>
            )
        })

        const storyOptions = data.stories.map(story => {
            return (
                <option key={story.id} value={story.id}>{story.title}</option>
            )
        })

        return (
            <article className="edit-character">
                <h3>{charData[0].name}</h3>
                <button type='button' onClick={() => this.props.history.goBack()}  className="submit-btn">
                    Go Back
                </button>
                <div>
                    <label htmlFor="description">Description: </label>
                    <textarea 
                        type="text" 
                        value={charData[0].description} 
                        onChange={(e) => this.descriptionChanged(e.target.value)}
                        id="description"
                    />
                </div>

                <label htmlFor="story">Story: </label>
                <select name="story" id="story" onChange={e => this.storyChanged(e.target.value)}>
                        <option value="">Select a story</option>
                        {storyOptions}
                    </select>
                <br/>
                <label htmlFor="gender">Gender: </label>
                <input type="text" value={charData[0].gender} id="gender"  onChange={e => this.genderChanged(e.target.value)}/>
                <br />
                <label htmlFor="appearance">Physical appearance:</label>
                <textarea value={charData[0].appearance} id="appearance"  onChange={e => this.appearanceChanged(e.target.value)}/>
                <br />
                <label htmlFor="fashion">Fashion style: </label>
                <textarea value={charData[0].fashion} id="fashion"  onChange={e => this.fashionChanged(e.target.value)}/>
                <br />
                <label htmlFor="home">Home: </label>
                    <select name="home" id="home" onChange={e => this.homeChanged(e.target.value)}>
                        {settingsOptions}
                    </select>
                <br />
                    <label htmlFor="housemates">Housemates: </label>
                    <ul>
                        {charChecks}
                    </ul>

                <h4>Decor</h4>
                <p>{charData[0].decor}</p>
            </article>
        )
    }
}