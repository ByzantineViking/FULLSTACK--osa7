import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>Home</Link>
      <Link to='/create' style={padding}>Create new</Link>
      <Link to='/anecdotes' style={padding}>Anecdotes</Link>
      <Link to='/about' style={padding}>About</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)
      }
    </ul>
  </div>
)
const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <div>By: {anecdote.author}</div>
    <a href={anecdote.info}>More info</a>
    <div>
      Votes: {anecdote.votes}
    </div>
    
  </div>
)
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)
const Footer = () => (
  <div style={{marginTop: "10px"}}>
      The best place to get your daily anecdotes!
  </div>
)

const CreateNewNoHistory = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.setNotification(`You created '${content}'`)
    setTimeout(()=> {
      props.setNotification('')
    }, 10000)
    setContent('')
    setAuthor('')
    setInfo('')
    props.history.push('/anecdotes')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button type='submit'>
          create new
        </button>
      </form>
    </div>
  )
}

const CreateNew = withRouter(CreateNewNoHistory)
const Home = ({notification}) => {
  return(
    <div>
      {notification}
      <Footer />
    </div>
  )
}
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Route exact path='/anecdotes' render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route exact path='/anecdotes/:id' render={({ match }) => 
          <Anecdote anecdote={anecdoteById(match.params.id)}></Anecdote>
        }/>
        <Route path='/create' render={() => <CreateNew addNew={addNew} setNotification={setNotification}/>} />
        <Route path='/about' render={() => <About />} />
        <Route path='/' render={() => <Home notification={notification}/>}/>
      </div>
    </Router>
   
  )
}

export default App;