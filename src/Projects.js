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
          completed: 90,
          users: ['sainoba'],
          name: 'Tiny Database'
        }, {
          id: 2,
          state: 'coding',
          completed: 65,
          users: ['quijaman1988', 'luisaguilar2910'],
          name: 'Albums 2.0'
        }, {
          id: 3,
          state: 'qa',
          users: ['thalianetzahuatl'],
          name: 'Shangha'
        },
      ]
    }
  }

  getProgressBarColor(percent) {
    switch (true) {
      case (percent > 80):
        return 'green'
      case (percent > 60):
        return 'yellow'
      case (percent > 40):
        return 'orange'
      default:
        return 'red'
    }
  }

  getProjectItem(pr) {

    let stateItem = 'null'

    const projectStyle = {
      "width": pr.completed + "%",
      "backgroundColor": this.getProgressBarColor(pr.completed)
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
            <div>Currently on Quality Assurance...</div>
          </div>
        )
        break
      case 'done':
        stateItem = (
          <div key={pr.id} className="wrapper stateWrapper">
            <div>Done!</div>
          </div>
        )
        break
      default:
        stateItem = (
          <div key={pr.id} className="wrapper stateWrapper">
            <div>Project in limbo..</div>
          </div>
        )
    }

    let usersItem = [];

    // We add the user thumbnail for each project
    pr.users.forEach(user => {
      this.props.team.forEach((teamMember) => {
        if (user === teamMember.username)
          usersItem.push(
            <div key={teamMember.username}>
              <a href={teamMember.htmlurl}>
                <img alt="some ugly dev" src={teamMember.avatarurl} style={{width:50,height:50}} />
                {teamMember.fullName}
              </a>
            </div>
          )
      })
    })

    return (
      <div className="project" key={pr.name}>
        <div className="projectThumb">
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
