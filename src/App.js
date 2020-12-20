import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './header/Header'
import Landing from './landing/Landing'
import './App.css'

class App extends Component {
  render() {
    return (
      <main className='App'>
        <Header />
        <Route 
          path="/"
          component={Landing}
        />
      </main>
    );
  }
}

export default App;