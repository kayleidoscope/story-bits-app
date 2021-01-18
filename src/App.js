import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withRouter} from 'react-router'
import Header from './header/Header';
import Landing from './landing/Landing';
import Footer from './footer/Footer';
import Context from './Context'
import './App.css'
import config from './config'
import AppWrapper from './app-wrapper/AppWrapper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChar: "0-0-0",
      users: [],
      currentUser: null,
      stories: [],
      currentStory: null,
      characters: [],
      currentCharacter: null,
      settings: [],
      currentSettings: []
    }
  }

  apiUsersSet = (responseJson) => {
    const usersObject = responseJson
    this.setState({
      users: usersObject
    })
  }

  //adds a new user to state
  addUser = (user) => {
    this.setState({
      users: [...this.state.users, user]
    })
  }

  //sets currentUser to state
  userSelect = user => {
    this.setState({
      currentUser: user,
    })
  }

  //essentially logs a user out
  userDeselect = () => {
    localStorage.removeItem('currentUser')
    this.setState({
      currentUser: null
    })
  }

  apiStoriesSet = (responseJson) => {
    const storiesObject = responseJson
    this.setState({
      stories: storiesObject
    })
  }

  addStory = (story) => {
    this.setState({
      stories: [...this.state.stories, story]
    })
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}api/users`, {
      method: 'GET'
    })
      .then(res => {
        if(!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(responseJson => this.apiUsersSet(responseJson))
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const userFromStorage = localStorage.getItem(`currentUser`)
    const contextValue = {
      currentChar: this.state.currentChar,
      users: this.state.users,
      stories: this.state.stories,
      currentUser: this.state.currentUser || (userFromStorage && JSON.parse(userFromStorage).id),
      addUserFx: this.addUser,
      userSelectFx: this.userSelect,
      userDeselectFx: this.userDeselect,
      apiStoriesSetFx: this.apiStoriesSet,
      addStoryFx: this.addStory,
      validateUsernameFx: this.validateUsername
    }

    return (
      <main className='App'>
        <Context.Provider value={contextValue}>
        <Header />
          <Route 
            exact path="/"
            component={Landing}
          />
          <Route 
            path="/"
            component={AppWrapper}
          />
        </Context.Provider>
        <Footer />
      </main>
    );
  }
}

export default withRouter(App);