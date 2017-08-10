import React, { Component } from 'react';

export default class Users extends Component{
    constructor(props){
      super(props)
    }

    render(){
      const teamInfo = this.props.team;
      let usersElement = teamInfo.map((info) =>
          <div key={info.username}>
              <a href={info.htmlurl}>
                  <img src={info.avatarurl} style={{width:50,height:50,borderColor:info.color,borderWidth:5,borderStyle:"solid"}} />
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
