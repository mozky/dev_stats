import React, { Component } from 'react';

/**
 * Created by moz on 12/07/17.
 */
export default class PullRequests extends Component {
  render() {
    const prsList = this.props.prs

    let openPrs = [];
    let closedPrs = [];

    prsList.forEach((pr) => {
      if (pr.state === 'open') {
        openPrs.push(pr)
      } else {
        closedPrs.push(pr)
      }
    })

    let openPrItems = openPrs.map((pr) =>
      <li key={pr.repo + '-' + pr.number}>
        {pr.user.login} [{pr.repo} - {pr.state.toUpperCase()}: {pr.title}
      </li>
    )

    let closedPrItems = closedPrs.map((pr) =>
      <li key={pr.repo + '-' + pr.number}>
        {pr.user.login} [{pr.repo} - {pr.state.toUpperCase()}: {pr.title}
      </li>
    )

    return (
      <div id="pull_requests">
        <h1>Pull Requests</h1>
        <h2>Open</h2>
        <ul>
          { openPrItems }
        </ul>
        <h2>Recently Closed</h2>
        <ul>
          { closedPrItems }
        </ul>
      </div>
    )
  }
}
