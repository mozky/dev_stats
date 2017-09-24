import React from 'react'
import { COMPANY_LOGIN, USERS_LIST } from '../config.app'
import { Loading, Error } from '../components/Helpers'
import PullRequests from '../components/PullRequests'
import { graphql, gql } from 'react-apollo'

class PullRequestsContainer extends React.Component {
  render() {
    const prsInfo = this.props.prsInfoQuery

    if (prsInfo && prsInfo.loading) {
      return <Loading />
    }

    if (prsInfo && prsInfo.error) {
      return <Error />
    }

    // We iterate the repositories and create an array of repositories prs
    var prsList = [].concat.apply([], prsInfo.organization.repositories.nodes.map(repo => {
      // We return an array with open prs...
      return repo.openPrs.nodes.filter(openPr => {
        return (USERS_LIST.indexOf(openPr.author.login) !== -1)
      }).map(userOpenPr => {
        return ({
          repo: userOpenPr.repository.name,
          number: `${userOpenPr.repository.name}-${userOpenPr.number}`,
          user: userOpenPr.author.login,
          title: userOpenPr.title,
          state: userOpenPr.state,
        })
      }).concat(
        // and we concat the merged prs to the array
        repo.mergedPrs.nodes.filter(mergedPr => {
          return (USERS_LIST.indexOf(mergedPr.author.login) !== -1)
        }).map(userMergedPr => {
          return ({
            repo: userMergedPr.repository.name,
            number: `${userMergedPr.repository.name}-${userMergedPr.number}`,
            user: userMergedPr.author.login,
            title: userMergedPr.title,
            state: userMergedPr.state,
          })
        })
      )
    }))

    return (
      <PullRequests prs={prsList} userColorsMap={this.props.colorMap}/>
    )
  }
}

const PRS_INFO_QUERY = gql`
  query {
    organization(login: "${COMPANY_LOGIN}") {
      name
      repositories(first: 20, isFork: false, orderBy: {
        field: PUSHED_AT,
        direction: DESC
      }) {
        nodes {
          name
          openPrs: pullRequests(first: 100, states: OPEN, orderBy: {
            field: CREATED_AT
            direction: DESC
          }) {
            nodes {
              author {
                login
              }
              title
              state
              number
              createdAt
              repository {
                name
              }
            }
          }
          mergedPrs: pullRequests(first:50, states: MERGED, orderBy: {
            field: CREATED_AT
            direction: DESC
          }) {
            nodes {
              author {
                login
              }
              title
              state
              createdAt
              mergedAt
              number
              repository {
                name
              }
            }
          }
        }
      }
    }
  }
`

export default graphql(PRS_INFO_QUERY, { name: 'prsInfoQuery' }) (PullRequestsContainer)
