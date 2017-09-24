import React from 'react'
import { Loading, Error } from '../components/Helpers'
import { graphql, gql } from 'react-apollo'
import { USERS_LIST } from '../config.app'
import User from '../components/User'

class UsersContainer extends React.Component {
  render() {
    const usersInfo = this.props.usersInfoQuery

    if (usersInfo && usersInfo.loading) {
      return <Loading />
    }

    if (usersInfo && usersInfo.error) {
      return <Error />
    }

    return (
      <div className="userList">
        {USERS_LIST.map(user => (
          <User
            key={user}
            color={this.props.colorMap[user]}
            username={usersInfo[user].login}
            url={usersInfo[user].url}
            name={usersInfo[user].name}
            avatarUrl={usersInfo[user].avatarUrl}
          />
        ))}
      </div>
    )
  }
}

//Generate GraphQL query with the users list
let usersQueries = USERS_LIST.reduce((accumulator, user) => {
  return accumulator + `
    ${user}: user(login: "${user}") {
      bio
      login
      email
      avatarUrl
      name
      url
    }
  `
}, '')

const USERS_INFO_QUERY = gql`
  query {
    ${usersQueries}
  }
`

export default graphql(USERS_INFO_QUERY, { name: 'usersInfoQuery' }) (UsersContainer)
