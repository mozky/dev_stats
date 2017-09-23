import React, { Component } from 'react'
import UsersContainer from './containers/UsersContainer'
import ProjectsContainer from './containers/ProjectsContainer'
import PullRequestsContainer from './containers/PullRequestsContainer'
import './css/index.css'

export default class App extends Component {
  render() {
    const mexTeam = ['sainoba', 'LuisEvilCo', 'mozky', 'quijaman1988', 'thalianetzahuatl', 'Sler69', 'luisaguilar2910']
    const usersColorMap = {'sainoba':'#009688', 'LuisEvilCo':'#2196F3', 'mozky':'#9C27B0', 'quijaman1988':'#9E9E9E', 'thalianetzahuatl':'#FF9800', 'Sler69':'#CDDC39', 'luisaguilar2910':'#E91E63'}

    return (
      <div className="App">
        <div id="App-header">
          <div>
            <UsersContainer users={mexTeam} colorMap={usersColorMap}/>
          </div>
        </div>
        <div id="App-body">
          <div id="main_content">
            <ProjectsContainer team={mexTeam} teamColorMap={usersColorMap}/>
            <PullRequestsContainer users={mexTeam} userColorsMap={usersColorMap}/>
          </div>
        </div>
      </div>
    )
  }

}
