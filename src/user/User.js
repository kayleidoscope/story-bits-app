import React, {Component} from 'react';
import config from '../config'
import Context from '../Context';
import './User.css'

export default class User extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
          numOfStories: null,
          storyIds: [],
          numOfCharacters: null,
          numOfSettings: null
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
                const storyIdsObject = responseJson.map(story => {
                    return story.id
                })

                this.setState({
                    numOfStories: responseJson.length,
                    storyIds: storyIdsObject
                })

                const numCharsPromise = storyIdsObject.map(storyId => 
                    fetch(`${config.API_ENDPOINT}api/characters/?story_id=${storyId}`, {
                        method: 'GET'
                    })
                        .then(res => {
                            if(!res.ok) {
                                throw new Error(res.status)
                            }
                                return res.json()
                        })
                        .then(responseJson => responseJson.length)
                )    
                
                function sum(acc, val) {return acc + val}

                Promise.all(numCharsPromise).then((values) => {
                    let answer = values.reduce(sum)
                    this.setState({
                        numOfCharacters: answer
                    })
                })

                const numSetsPromise = storyIdsObject.map(storyId => 
                    fetch(`${config.API_ENDPOINT}api/settings/?story_id=${storyId}`, {
                        method: 'GET'
                    })
                    .then(res => {
                        if(!res.ok) {
                            throw new Error(res.status)
                        }
                            return res.json()
                    })
                    .then(responseJson => responseJson.length)
                ) 

                Promise.all(numSetsPromise).then((values) => {
                    let answer = values.reduce(sum)
                    this.setState({
                        numOfSettings: answer
                    })
                })

            })
                .catch(error => {
                    console.error(error)
                })

    }

    render() {
        const user = JSON.parse(localStorage.getItem('currentUser')) || this.context.currentUser
        const date = new Date((user.acct_created)).toLocaleDateString('en-US')

        return (
            <div>
                <h2>{user.username}'s account</h2>
                <p>Account created: {date}</p>
                <p>Stories created: {this.state.numOfStories}</p>
                <p>Characters created: {this.state.numOfCharacters}</p>
                <p>Settings created: {this.state.numOfSettings}</p>
                <button className="submit-btn">Delete Account</button>
                <button type='button' onClick={() => this.props.history.goBack()} className="submit-btn">
                    Go Back
                </button>
            </div>
        )
    }
}