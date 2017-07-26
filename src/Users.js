import React, { Component } from 'react';

export default class Users extends Component{
    constructor(props){
      super(props)
    }

    render(){
      const teamInfo = this.props.infoTeam
      let usersElement = teamInfo.map((info) =>
        <li key={info.userName}>
          <a href={info.htmlurl}>{info.userName}</a>
          <img src={info.avatarurl} style={{width:50,height:50}} />
        </li>
      )

      return (
        <ul>
          {usersElement}
        </ul>
      )
    }
}
