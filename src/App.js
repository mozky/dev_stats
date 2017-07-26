import React, { Component } from 'react'
import GitHub from 'github-api'
import Projects from './Projects'
import PullRequests from './PullRequests'
import Users from './Users'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prs: 'null'
    }
  }

  componentDidMount() {
    const that = this
    const mexTeam = ['sainoba', 'LuisEvilCo', 'mozky', 'quijaman1988', 'thalianetzahuatl', 'Sler69', 'luisaguilar2910']
    const gh = new GitHub({
      token: 'de0c27930154c553912f47d8b58ceb2b559e73fa'
    })

    let openPrs = []

    let edlio = gh.getOrganization('edlio')
    edlio.getRepos(function(err, repos) {
      repos.forEach((repo) => {
        gh.getRepo('edlio', repo.name).listPullRequests({state: 'all'}).then((res) => {
          let prs = res.data
          prs.forEach((pr) => {
            if(mexTeam.indexOf(pr.user.login) > 0) {
              openPrs.push({
                repo: repo.name,
                number: pr.number,
                user: pr.user,
                title: pr.title,
                state: pr.state
              })
            }
          })

          let mexTeamInfo =[]

          mexTeam.forEach((user) => {
            let userVar = gh.getUser(user);
            userVar.getProfile().then((res) => {
              let dataInfo = res.data
              console.log(dataInfo)
              mexTeamInfo.push({
                userName: dataInfo.name,
                avatarurl: dataInfo.avatar_url,
                htmlurl: dataInfo.html_url
              })
            })
          })


          that.setState({
            prs: openPrs,
            infoteam: mexTeamInfo
          })
        }).catch((err) => {
          console.log(err)
        })
      })
    })
  }

  render() {
    const prsList = this.state.prs
    const infoTeamList = this.state.infoteam

    if (prsList !== 'null') {
      return (
        <div className="App">
          <div id="App-header">
            <p>Dev Stats</p>
          </div>
          <div id="App-body">
            <div id="dude">
              <Projects />
              <PullRequests prs={prsList}/>
              <Users infoteam={infoTeamList}/>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="App">
            Loading data...
        </div>
      )
    }


  }
}

export default App
