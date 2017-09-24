import React from 'react'
import { Loading } from '../components/Helpers'
import Projects from '../components/Projects'
import { USERS_LIST } from '../config.app'

export default class ProjectsContainer extends React.Component {
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
        <Projects team={USERS_LIST} colorMap={this.props.colorMap}
          projects={projects}/>
      )
    } else {
      return (
        <Loading />
      )
    }
  }

}
