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
    // its bad form to async a useEffect's callback 
    (async function fetchRepos() {
      try {
        // interpolate search into github api url
        const url = `http://api.github.com/users/${search}/repos`
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
    })() // IIFE async function
  }, [search])

  // map the user's repos to a div
  const divs = repos.map((repo, idx) => (
          
    <div key={idx}>
      <a
        target="_blank"
        href={repo.html_url}
      >
        <p>{repo.name}</p>
      </a>
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
