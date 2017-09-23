import React, { Component } from 'react'
import Projects from '../components/Projects'
import { Loading } from '../components/Helpers'

export default class ProjectsContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: null
    }
  }

  componentDidMount() {
    const that = this

    fetch('/projects').then(function(response) {
      return response.json()
    }).then(function(json) {
      that.setState({
        projects: json
      })
    })
    .catch(function(error) {
      console.log('ERROR: ', error)
    })
  }

  render() {
    const projects = this.state.projects

    if (projects) {
      return (
        <Projects team={this.props.team} teamColorMap={this.props.teamColorMap}
          projects={projects}/>
      )
    } else {
      return (
        <Loading />
      )
    }
  }

}
