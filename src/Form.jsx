import React, { 
  useState, 
  useEffect 
} from 'react'

import axios from 'axios'

const Form = () => {
  const [search, setSearch] = useState('weston-bailey')
  const [repos, setRepos] = useState([])
  const [forkTarget, setForkTarget] = useState('ga-sei-lessons')

  useEffect(() => {
    fetchRepos()
  }, [search])

  const fetchRepos = async () => {
    try {
      // interpolate search into github api url
      const url = `http://api.github.com/users/${search}/repos?per_page=100`
      // axios call the API
      const response = await axios.get(url)
      // set state conditionally based on response status
      if(response.status === 200) {
        console.log(response.data)
        setRepos(response.data)
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleMoveClick = async (e, repo) => {
    try {
      // move repo to org
      const options = {
        headers: {
          accept: 'application/vnd.github.v3+json',
          "Authorization": `token ${process.env.REACT_APP_GH_TOKEN}`
        }
      }

      const body = {
        organization: forkTarget
      }

      const url = `https://api.github.com/repos/${search}/${repo}`
      const response = await axios.post(url + '/forks', body, options)
      console.log(response)
      console.log(response.status)
      const delRes = await axios.delete(url, options)
      console.log(response)
      console.log(response.data)
      // these won't be up to date anyways
      // setTimeout(() =>  fetchRepos(), 500)
    } catch (err) {
      console.warn(err)
      setTimeout(() => {
        handleMoveClick(e, repo)
      }, 1000)
    }
  }
  // map the user's repos to a div
  const divs = repos.map((repo, idx) => (
          
    <div key={idx}>
      <a
        target="_blank"
        href={repo.html_url}
      >
        <p>{idx} {repo.name}</p>
      </a> 

      <button
        onClick={e => handleMoveClick(e, repo.name)}
      >
        move
      </button>
    </div>
  ))

  return (
    <div>
      <form>
        <label htmlFor='search'>Search:</label>
        <input 
          type="text"
          id='search'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <label htmlFor='forkTarget'>forkTarget:</label>
        <input 
          type="text"
          id='forkTarget'
          value={forkTarget}
          onChange={e => setForkTarget(e.target.value)}
        />
      </form>

      {divs}
    </div>
  )
}

export default Form
