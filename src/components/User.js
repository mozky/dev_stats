import React from 'react';

export default class User extends React.Component {
  render() {
    const { username, url, name, avatarUrl, color } = this.props
    const deadDevs = 'thalianetzahuatl'

    return (
      <div className = {"userImage" + (username === deadDevs ? " deadDev" : "")}>
        <a href={url}>
          <img alt={`${username}'s avatar'`} id={username} src={avatarUrl} style={{width:'6em', height:'6em', borderColor:color, borderWidth:5, borderStyle:"solid"}} />
          <p className="userName">{name}</p>
        </a>
      </div>
    )
  }
}
