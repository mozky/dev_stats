import GitHub from 'github-api'
import { GITHUB_TOKEN } from '../config.app'

/**
* @deprecated: Use GraphQL instead of REST calls
**/
export default class GitHubCaller {
  constructor() {
    this.GH = new GitHub({
      token: GITHUB_TOKEN
    })
  }

  getUsersData(users, colorMap) {
    const that = this

    return new Promise((resolve, reject) => {
      let promises = []

      users.forEach((user) => {
        promises.push(
          new Promise((resolve, reject) => {
            that.GH.getUser(user).getProfile().then((res) => {
              let dataInfo = res.data
              resolve({
                username: dataInfo.login,
                fullName: dataInfo.name,
                avatarurl: dataInfo.avatar_url,
                htmlurl: dataInfo.html_url,
                color: colorMap[dataInfo.login]
              })
            })
          })
        )
      })

      Promise.all(promises).then(usersData => {
        resolve(usersData)
      })
    })
  }

  getReposData(users) {
    const that = this

    return new Promise ((resolve, reject) => {
      const edlio = that.GH.getOrganization('edlio')
      const reposPrs = []
      const reposEtags = []

      edlio.getRepos().then((repos) => {
        repos.data.forEach((repo) => {
          // Ignore forked repos
          if (!repo.fork) {
            reposPrs.push(new Promise((resolve, reject) => {
              that.GH.getRepo('edlio', repo.name).listPullRequests({state: 'all'}).then((res) => {
                // Lets save the ETag so we can add it to further requests and user githubs cache
                reposEtags.push({
                  repo: repo.name,
                  etag: res.headers.etag
                })
                if (res.data.length > 0) {
                  resolve(res.data.filter(pr => {
                    if (users.indexOf(pr.user.login) > 0) {
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

}
