import React, { Component } from 'react';

/**
 * Created by moz on 12/07/17.
 */
export default class Projects extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: [
        {
          id: 1,
          state: 'coding',
          completed: 27,
          users: ['sainoba'],
          name: 'Fixing Smoke Tests'
        }, {
          id: 2,
          state: 'coding',
          completed: 90,
          users: ['quijaman1988', 'luisaguilar2910'],
          name: 'Albums 2.1'
        }, {
          id: 3,
          state: 'coding',
          completed: 77,
          users: ['thalianetzahuatl', 'Sler69'],
          name: 'Sangha Integration'
        }, {
          id: 4,
          state: 'coding',
          completed: 53 ,
          users: ['mozky', 'LuisEvilCo'],
          name: 'Preparations Custom SIS importer'
        }, {
          id: 5,
          state: 'coding',
          completed: 20,
          users: ['mozky'],
          name: 'DEV Stats v0.2'
        }
      ]
    }
  }

  getProgressBarColor(percent) {
    switch (true) {
      case (percent > 80):
        return 'linear-gradient(45deg, #43C6AC, #96e6a1)'
      case (percent > 60):
        return 'linear-gradient(45deg, #fee140, #d4fc79)'
      case (percent > 40):
        return 'linear-gradient(45deg, #ff9a44, #eaa33f)'
      default:
        return 'linear-gradient(45deg, #ff0844, #c33764)'
    }
  }

  getProjectItem(pr) {

    let stateItem = 'null'

    const projectStyle = {
      "width": pr.completed + "%",
      "backgroundImage": this.getProgressBarColor(pr.completed)
    }

    // We create the 'status bar' for each project
    switch(pr.state) {
      case 'coding':
        stateItem = (
          <div key={pr.id} className="barWrapper">
            <div className="bar" id={"bar_" + pr.id} style={projectStyle}></div>
          </div>
        )
        break
      case 'qa':
        stateItem = (
          <div key={pr.id} className="wrapper stateWrapper">
            <div className="projectState">Currently on Quality Assurance...</div>
          </div>
        )
        break
      case 'merged':
        stateItem = (
          <div key={pr.id} className="wrapper stateWrapper">
            <div className="projectState">Merged!!</div>
          </div>
        )
        break
      default:
        stateItem = (
          <div key={pr.id} className="wrapper stateWrapper">
            <div className="projectState">Project in limbo..</div>
          </div>
        )
    }

    let usersItem = [];

    // We add the user thumbnail for each project
    pr.users.forEach(user => {
      this.props.team.forEach((teamMember) => {
        if (user === teamMember.username)
          usersItem.push(
            <div key={teamMember.username} className="circle" style={{background:teamMember.color}}>
            </div>
          )
      })
    })

    return (
      <div className="project" key={pr.name}>
        <div className="projectThumb">
          <p className="projectTitle">{pr.name}</p>
          {usersItem.map(user => user)}
        </div>
        <div className="projectState">
          {stateItem}
        </div>
      </div>
    )
  }

  render () {

    const projects = this.state.projects

    const projectsItems = projects.map(pr => {
      return this.getProjectItem(pr)
    })

    if (projects)
    return (
      <div id="projects">
        <div className="projectsBody">
          { projectsItems }
        </div>
      </div>
    )
  }
}
