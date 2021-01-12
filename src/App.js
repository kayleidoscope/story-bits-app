import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './header/Header';
import Landing from './landing/Landing';
import Footer from './footer/Footer';
import Home from './home/Home';
import Story from './story/Story';
import Character from './character/Character';
import Setting from './setting/Setting';
import NewStory from './new-story/NewStory';
import NewSetting from './new-setting/NewSetting';
import NewCharacter from './new-character/NewCharacter';
import Admin from './admin/Admin';
import User from './user/User';
import Stories from './stories/Stories';
import EditCharacter from './edit-character/EditCharacter';
import EditSetting from './edit-setting/EditSetting';
// import Compare from './compare/Compare';
import Nav from './nav/Nav';
import Context from './Context'
import './App.css'
import config from './config'

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

  addUser = (user) => {
    console.log('addUser ran')
    this.setState({
      users: [...this.state.users, user]
    })
  }

  userSelect = user => {
    console.log('userSelect ran', user)
    this.setState({
      currentUser: user,
    })
  }

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
    console.log('addStory ran')
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
    }

    return (
      <main className='App'>
        <Header />
        <Context.Provider value={contextValue}>
        <Nav />
          <Route 
            exact path="/"
            component={Landing}
          />
          <Route 
            path="/home"
            component={Home}
          />
          <Route 
            path="/user/:userId"
            component={User}
          />
          <Route 
            path="/stories/"
            component={Stories}
          />
          <Route 
            path="/story/:storyId"
            component={Story}
          />
          <Route 
            path="/character/:charId"
            component={Character}
          />
          <Route 
            path="/edit/character/:charId"
            component={EditCharacter}
          />
          <Route 
            path="/setting/:settingId"
            component={Setting}
          />
          <Route
            path="/edit/setting/:settingId"
            component={EditSetting}
          />
          <Route 
            path="/new/story/"
            component={NewStory}
          />
          <Route 
            path="/new/setting/"
            component={NewSetting}
          />
          <Route 
            path="/new/character/"
            component={NewCharacter}
          />
          {/* <Route 
            path="/compare/"
            component={Compare}
          /> */}
          <Route 
            path="/admin/"
            component={Admin}
          />
        </Context.Provider>
        <Footer />
      </main>
    );
  }
}

export default App;