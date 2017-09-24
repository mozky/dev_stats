import React from 'react';

/**
 * Created by moz on 12/07/17.
 */
export default class PullRequests extends React.Component {
  render() {
    const prsList = this.props.prs
    const colorsMap = this.props.userColorsMap

    let openPrs = [];
    let closedPrs = [];

    prsList.forEach((pr) => {
      if (pr.state === 'OPEN') {
        openPrs.push(pr)
      } else {
        closedPrs.push(pr)
      }
    })

    let openPrItems = openPrs.map((pr) =>
      <div className="prItem" key={pr.repo + '-' + pr.number}>
        <div className="circle" style={{background: colorsMap[pr.user]}}></div>
        <p>[{pr.repo}]: {pr.title}</p>
      </div>
    )

    let closedPrItems = closedPrs.map((pr) =>
      <div className="prItem" key={pr.repo + '-' + pr.number}>
        <div className="circle" style={{background: colorsMap[pr.user]}}></div> <p>[{pr.repo}]: {pr.title}</p>
      </div>
    )

    return (
      <div id="pull_requests">
        <h1 className="title">Pull Requests</h1>
        <h2>{openPrs.length} Open</h2>
        <div id="openPrs" className="scrollBar" style={{"overflowY": "auto"}}>
          { openPrItems }
        </div>
        <h2>{closedPrs.length} Recently Closed</h2>
        <div className="scrollBar" style={{"overflowY": "auto"}}>
          { closedPrItems }
        </div>
      </div>
    )
  }

}
