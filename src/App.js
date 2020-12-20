import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './header/Header';
import Landing from './landing/Landing';
import Footer from './footer/Footer';
import Home from './home/Home';
import Story from './story/Story';
import NewStory from './new-story/NewStory';
import NewSetting from './new-setting/NewSetting';
import NewCharacter from './new-character/NewCharacter';
import './App.css'

class App extends Component {
  render() {
    return (
      <main className='App'>
        <Header />
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
        <Footer />
      </main>
    );
  }
}

export default App;