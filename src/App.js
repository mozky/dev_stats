import React, { Component } from 'react'
import GitHub from 'github-api'
import Projects from './Projects'
import PullRequests from './PullRequests'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prs: 'null',
      infoteam: 'null'
    }
  }

  componentDidMount() {
    const that = this
    const mexTeam = ['sainoba', 'LuisEvilCo', 'mozky', 'quijaman1988', 'thalianetzahuatl', 'Sler69', 'luisaguilar2910']
    const gh = new GitHub({
      token: 'de0c27930154c553912f47d8b58ceb2b559e73fa'
    })

    let mexTeamInfo =[]
    let openPrs = []

    let edlio = gh.getOrganization('edlio')

    mexTeam.forEach((user) => {
      let userVar = gh.getUser(user);
      userVar.getProfile().then((res) => {
        let dataInfo = res.data
        mexTeamInfo.push({
          username: dataInfo.login,
          fullName: dataInfo.name,
          avatarurl: dataInfo.avatar_url,
          htmlurl: dataInfo.html_url
        })
      })
    })

    edlio.getRepos(function(err, repos) {
      if (err)
        return err
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

    // ESTO ESTA MUY FEO, Y CREO QUE SE LO QUE CAUSA EL LOOP FEO EN Projects
    // BUSCAR OTRA FORMA, USANDO COMPONENT WILL MOUNT O ALGO ASI.
    if (prsList !== 'null' && infoTeamList !== 'null') {
      return (
        <div className="App">
          <div id="App-header">
            <h1 className="title">Dev Stats</h1>
          </div>
          <div id="App-body">
            <div id="main_content">
              <Projects team={infoTeamList}/>
              <PullRequests prs={prsList}/>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="App">
            <h1 id="loading-text">Loading data...</h1>
            <p id="hidden-text">if you can read this, the application may be broken... invoke your favorite dev monkey to fix it</p>
        </div>
      )
    }


  }
}

export default App
