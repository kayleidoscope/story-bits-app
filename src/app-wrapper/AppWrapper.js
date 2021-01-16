import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import {Route} from 'react-router-dom';
import Context from '../Context';
import Home from '../home/Home';
import Story from '../story/Story';
import Character from '../character/Character';
import Setting from '../setting/Setting';
import NewStory from '../new-story/NewStory';
import NewSetting from '../new-setting/NewSetting';
import NewCharacter from '../new-character/NewCharacter';
// import Admin from './admin/Admin';
import User from '../user/User';
import Stories from '../stories/Stories';
import EditCharacter from '../edit-character/EditCharacter';
import EditStory from '../edit-story/EditStory'
import EditSetting from '../edit-setting/EditSetting';
// import Compare from '../compare/Compare';


export default class AppWrapper extends Component{
    static contextType = Context;


  render(){

  if(!this.context.currentUser)
    return <Redirect to="/" />

   return(
   
     <div>
        <Route 
            path="/home"
            component={Home}
        />
        <Route 
            path="/user"
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
            path="/edit/story/:storyId"
            component={EditStory}
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
          {/* <Route 
            path="/admin/"
            component={Admin}
          /> */}
     </div>
   );
  }
}
