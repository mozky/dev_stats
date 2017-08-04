import React, { Component } from 'react'
import GitHub from 'github-api'
import Projects from './Projects'
import PullRequests from './PullRequests'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.getReposInfo = this.getReposInfo.bind(this)
    this.getTeamInfo = this.getTeamInfo.bind(this)
    this.gh = new GitHub({
      token: 'de0c27930154c553912f47d8b58ceb2b559e73fa'
    })
    this.mexTeam = ['sainoba', 'LuisEvilCo', 'mozky', 'quijaman1988', 'thalianetzahuatl', 'Sler69', 'luisaguilar2910']
    this.state = {
      prs: 'null',
      infoteam: 'null'
    }
  }

  getTeamInfo() {
    return new Promise((resolve, reject) => {

      let mexTeamInfo = []

      this.mexTeam.forEach((user) => {
        this.gh.getUser(user).getProfile().then((res) => {
          let dataInfo = res.data
          mexTeamInfo.push({
            username: dataInfo.login,
            fullName: dataInfo.name,
            avatarurl: dataInfo.avatar_url,
            htmlurl: dataInfo.html_url
          })
        })
      })

      resolve(mexTeamInfo)

    })
  }

  getReposInfo() {
    const that = this
    return new Promise ((resolve, reject) => {

      const edlio = that.gh.getOrganization('edlio')
      const reposPrs = []

      edlio.getRepos().then((repos) => {
        repos.data.forEach((repo) => {
          // Ignore forked repos
          if (!repo.fork) {
            reposPrs.push(new Promise((resolve, reject) => {
              that.gh.getRepo('edlio', repo.name).listPullRequests({state: 'all'}).then((res) => {
                if (res.data.length > 0) {
                  resolve(res.data.filter(pr => {
                    if (that.mexTeam.indexOf(pr.user.login) > 0) {
                      return pr
                    }
                    return false
                  }))
                } else {
                  // This Repo doesnt have any PRs
                  resolve(false)
                }
              }).catch((err) => {
                console.log('Error on listPullRequests', err)
                reject(err)
              })
            }))
          }
        })
        // This waits for the array of promises to finish, before resolving or rejecting
        Promise.all(reposPrs).then(teamPrs => {
          resolve(teamPrs.filter((repo) => {
            if (repo && repo.length > 0) {
              return repo
            }
            return false
          }))
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
    })
  }

  componentDidMount() {
    const that = this

    this.getTeamInfo().then((infoteam) => {
      that.setState({
        infoteam
      })
    })

    this.getReposInfo().then((prs) => {
      that.setState({
        prs: [].concat.apply([], prs).map(pr => {
          return ({
            repo: pr.head.repo.name,
            number: pr.number,
            user: pr.user,
            title: pr.title,
            state: pr.state
          })
        })
      })
    })

  }

  render() {
    const prsList = this.state.prs
    const infoTeamList = this.state.infoteam

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
