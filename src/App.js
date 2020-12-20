import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './header/Header';
import Landing from './landing/Landing';
import Footer from './footer/Footer';
import Home from './home/Home';
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
        <Footer />
      </main>
    );
  }
}

export default App;