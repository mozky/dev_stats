import React, { Component } from 'react'
import PullRequests from '../components/PullRequests'
import GitHubCaller from '../utils/GitHubCaller'
import { Loading } from '../components/Helpers'

export default class PullRequestsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prs: false
    }
  }

  componentDidMount() {
    const that = this
    const GitHub = new GitHubCaller()

    GitHub.getReposData(this.props.users).then((prs) => {
      that.setState({
        prs: [].concat.apply([], prs).map(pr => {
          return ({
            repo: pr.head.repo.name,
            number: pr.number,
            user: pr.user,
            title: pr.title,
            state: pr.state,
          })
        })
      })
    })
  }

  render() {
    const prsList = this.state.prs

    if (prsList) {
      return (
        <PullRequests prs={prsList} userColorsMap={this.props.userColorsMap}/>
      )
    } else {
      return (
        <Loading />
      )
    }
  }

}
