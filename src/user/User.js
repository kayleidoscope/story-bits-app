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
        //API call to get the stories associated with this user
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
                //put this user's story ids into an array
                const storyIdsArray = responseJson.map(story => {
                    return story.id
                })

                this.setState({
                    numOfStories: responseJson.length,
                    storyIds: storyIdsArray
                })

                //takes storyIdsArray and maps through it with an API call to get the characters in each of those stories
                //numCharsPromise is an array, wherein the values are the number of characters in each story
                const numCharsPromise = storyIdsArray.map(storyId => 
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
                        .catch(error => {
                            console.error(error)
                        })
                )    
                
                //establishing this to use .reduce to add the values in numCharsPromise and numSetsPromise together
                function sum(acc, val) {return acc + val}

                //resolves the promise in numCharsPromise and adds its values together
                Promise.all(numCharsPromise).then((values) => {
                    let answer = values.reduce(sum)
                    this.setState({
                        numOfCharacters: answer
                    })
                })

                //takes storyIdsArray and maps through it with an API call to get the settings in each of those stories
                //numSetsPromise is an array, wherein the values are the number of settings in each story
                const numSetsPromise = storyIdsArray.map(storyId => 
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

                //resolves the promise in numSetsPromise and adds its values together
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
        
        const user = JSON.parse(localStorage.getItem('currentUser' + config.CURRENT_VERSION)) || this.context.currentUser
        const date = new Date((user.acct_created)).toLocaleDateString('en-US')
        
        //prevents the page from loading until these values have been obtained
        if (!this.state.numOfStories || !this.state.numOfSettings) {
            return null
        }
        
        return (
            <div className="user">
                <h2>{user.username}'s account</h2>
                <div className="data">
                    <p>Account created: {date}</p>
                    <p>Stories created: {this.state.numOfStories}</p>
                    <p>Characters created: {this.state.numOfCharacters}</p>
                    <p>Settings created: {this.state.numOfSettings}</p>
                </div>
            </div>
        )
    }
}