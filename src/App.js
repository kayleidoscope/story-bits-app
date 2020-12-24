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
import Compare from './compare/Compare';
import Nav from './nav/Nav';
import Context from './Context'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChar: "0-0-0",
    }
  }

  render() {
    const contextValue = {
      currentChar: this.state.currentChar,
    }

    return (
      <main className='App'>
        <Header />
        <Nav />
        <Context.Provider value={contextValue}>
          <Route 
            exact path="/"
            component={Landing}
          />
          <Route 
            path="/user/"
            component={Home}
          />
          <Route 
            path="/story/"
            component={Story}
          />
          <Route 
            path="/character/"
            component={Character}
          />
          <Route 
            path="/setting/"
            component={Setting}
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
          <Route 
            path="/compare/"
            component={Compare}
          />
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