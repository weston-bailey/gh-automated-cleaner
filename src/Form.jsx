import React, { 
  useState, 
  useEffect 
} from 'react'

import axios from 'axios'

const Form = () => {
  const [search, setSearch] = useState('weston-bailey')
  const [repos, setRepos] = useState([])

  // this only runs once
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

  const handleMoveClick = async e => {}
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
        onClick={handleMoveClick}
      >
        move
      </button>
    </div>
  ))

  return (
    <div>
      <form>
        <input 
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </form>

      {divs}
    </div>
  )
}

export default Form
