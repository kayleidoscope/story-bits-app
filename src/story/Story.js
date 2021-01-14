import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Context from '../Context';
import CannotAccess from '../cannot-access/CannotAccess'
import config from '../config';
import './Story.css';

export default class Story extends Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
          storyData: [],
          charactersData: [],
          settingsData: []
        }
      }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}api/stories/${this.props.match.params.storyId}`, {
          method: 'GET'
        })
          .then(res => {
            if(!res.ok) {
              throw new Error(res.status)
            }
            return res.json()
          })
          .then(responseJson => {
                this.setState({
                    storyData: responseJson
          })}
          )
          fetch(`${config.API_ENDPOINT}api/characters/?story_id=${this.props.match.params.storyId}`, {
            method: 'GET'
          })
            .then(res => {
              if(!res.ok) {
                throw new Error(res.status)
              }
              return res.json()
            })
            .then(responseJson => {
                  this.setState({
                      charactersData: responseJson
            })}
            )
            fetch(`${config.API_ENDPOINT}api/settings/?story_id=${this.props.match.params.storyId}`, {
                method: 'GET'
              })
                .then(res => {
                  if(!res.ok) {
                    throw new Error(res.status)
                  }
                  return res.json()
                })
                .then(responseJson => {
                      this.setState({
                          settingsData: responseJson
                })}
                )
      }

    render() {

        //to prevent users from accessing stories that do not belong to them
        const currentUser = this.context.currentUser
        const storysUser = this.state.storyData.user_id
        if (!storysUser) {
            return null
        } else if (currentUser !== storysUser) {
            return (
                <CannotAccess item="story"/>
            )
        }

        const storyData = this.state.storyData;

        const charData = this.state.charactersData;
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

        const settingData = this.state.settingsData;
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
                <h2>{storyData.title}</h2>
                <p>{storyData.description}</p>
                <button onClick={() => this.props.history.push(`/edit/story/${this.state.storyData.id}`)}>
                    Edit Story Details
                </button>
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