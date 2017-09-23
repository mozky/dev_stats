import React, { Component } from 'react'
import GitHubCaller from '../utils/GitHubCaller'
import { Loading } from '../components/Helpers'
import Users from '../components/Users'

export default class UsersContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoteam: false
    }
  }

  componentDidMount() {
    const that = this
    const GitHub = new GitHubCaller()

    GitHub.getUsersData(that.props.users, that.props.colorMap).then((infoteam) => {
      that.setState({
        infoteam
      })
    })
  }

  render() {
    const infoTeamList = this.state.infoteam

    if (infoTeamList) {
      return (
        <Users team={infoTeamList} className="projectThumb"/>
      )
    } else {
      return (
        <Loading />
      )
    }
  }

}
