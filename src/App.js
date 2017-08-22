import React, { Component } from 'react'
import GitHub from 'github-api'
import Users from './Users'
import Projects from './Projects'
import PullRequests from './PullRequests'
import './css/index.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.getReposInfo = this.getReposInfo.bind(this)
    this.getTeamInfo = this.getTeamInfo.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.gh = new GitHub({
      token: 'de0c27930154c553912f47d8b58ceb2b559e73fa'
    })
    this.mexTeam = ['sainoba', 'LuisEvilCo', 'mozky', 'quijaman1988', 'thalianetzahuatl', 'Sler69', 'luisaguilar2910']
    this.colorMap = {'sainoba':'#009688', 'LuisEvilCo':'#2196F3', 'mozky':'#9C27B0', 'quijaman1988':'#9E9E9E', 'thalianetzahuatl':'#FF9800', 'Sler69':'#CDDC39', 'luisaguilar2910':'#E91E63'}
    this.state = {
      prs: 'null',
      infoteam: 'null'
    }
  }

  refreshData() {
    console.log('refreshing data...')
    const that = this

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

  componentWillUnmount() {
    clearInterval(this.refresher)
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
            htmlurl: dataInfo.html_url,
            color: this.colorMap[dataInfo.login]
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

    this.refresher = setInterval(this.refreshData, 10000)

  }

  render() {
    const prsList = this.state.prs
    const infoTeamList = this.state.infoteam

    if (prsList !== 'null' && infoTeamList !== 'null') {
      return (
        <div className="App">
          <div id="App-header">
            <div>
              <Users team={infoTeamList} className="projectThumb"/>
            </div>
          </div>
          <div id="App-body">
            <div id="main_content">
              <Projects team={infoTeamList}/>
              <PullRequests prs={prsList} userColorsMap={this.colorMap}/>
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
