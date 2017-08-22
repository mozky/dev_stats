import React, { Component } from 'react';

export default class Users extends Component{
    render(){
      const teamInfo = this.props.team;
      let usersElement = teamInfo.map((info) =>
          <div className = "userImage" key={info.username}>
              <a href={info.htmlurl}>
                  <img alt="some ugly dev" id={info.username} src={info.avatarurl} style={{width:'6em', height:'6em', borderColor:info.color, borderWidth:5, borderStyle:"solid"}} />
                  <p className="userName">{info.fullName}</p>
              </a>
        </div>
      )

      return (
        <div className="userList">
          {usersElement}
        </div>
        )
    }
}
