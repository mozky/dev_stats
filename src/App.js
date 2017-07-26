import React, { Component } from 'react'
import GitHub from 'github-api'
import Projects from './Projects'
import PullRequests from './PullRequests'
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

          that.setState({
            prs: openPrs
          })
        }).catch((err) => {
          console.log(err)
        })
      })
    })
  }

  render() {
    const prsList = this.state.prs

    if (prsList !== 'null') {
      return (
        <div className="App">
          <div id="App-header">
            <h1 className="title">Dev Stats</h1>
          </div>
          <div id="App-body">
            <div id="main_content">
              <Projects />
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
