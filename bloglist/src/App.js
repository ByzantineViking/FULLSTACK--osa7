import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import UserList from './components/UserList'
import { useField } from './hooks'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
// Styling
import { Container, Form, Button, Menu } from 'semantic-ui-react'

// Reducers
import { setNotification, setBlogs, setUser, setUsers } from './reducers/appreducers'
import User from './components/User'
import userService from './services/users'
const App = (props) => {
    const [username] = useField('text')
    const [password] = useField('password')
    useEffect(() => {
        blogService.getAll().then(blogs => {
            //console.log(blogs)
            props.setBlogs(blogs)
        })
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        userService.getAll().then(users => {
            //console.log(blogs)
            props.setUsers(users)
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            props.setUser(user)
            blogService.setToken(user.token)
        }
        // eslint-disable-next-line
    }, [])

    const notify = (message, outcome, time = 5000) => {
        props.setNotification( message, outcome, time )
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value,
                password: password.value
            })

            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            props.setUser(user)
        } catch (exception) {
            notify('wrong username of password', 'error')
        }
    }

    const handleLogout = () => {
        props.setUser(null)
        blogService.destroyToken()
        window.localStorage.removeItem('loggedBlogAppUser')
    }

    const createBlog = async (blog) => {
        const createdBlog = await blogService.create(blog)
        newBlogRef.current.toggleVisibility()
        props.setBlogs(props.blogs.concat(createdBlog))
        notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, 'success')
    }

    const likeBlog = async (blog) => {
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        const updatedBlog = await blogService.update(likedBlog)
        props.setBlogs(props.blogs.map(b => b.id === blog.id ? updatedBlog : b))
        notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`, 'success')
    }

    const removeBlog = async (blog) => {
        const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
        if (ok) {
            const updatedBlog = await blogService.remove(blog)
            props.setBlogs(props.blogs.filter(b => b.id !== blog.id))
            notify(`blog ${updatedBlog.title} by ${updatedBlog.author} removed!`, 'error')
        }
    }

    if (props.user === null) {
        return (
            <Container>
                <h2>log in to application</h2>

                <Notification/>

                <Form onSubmit={handleLogin}>
                    <Form.Field>
                        Username
                        <input id='username' {...username} />
                    </Form.Field>
                    <Form.Field>
                        Password
                        <input id='password'{...password} />
                    </Form.Field>
                    <Button id='loginButton' type="submit">Log in</Button>
                </Form>
            </Container>
        )
    }

    const newBlogRef = React.createRef()

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const padding = {
        paddingRight: 5
    }

    return (
        <Router>
            <Container>
                <Menu>
                    <Menu.Item>
                        <Link to='/users' style={padding}>Users</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/blogs' style={padding}>Blogs</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <div style={{ marginRight:'10px' }}>{props.user.name} logged in</div>
                        <Button onClick={handleLogout}>logout</Button>
                    </Menu.Item>
                </Menu>
                <Notification />
                <Route exact path='/blogs' render={() =>
                    <BlogList byLikes={byLikes} likeBlog={likeBlog} removeBlog={removeBlog} createBlog={createBlog} newBlogRef={newBlogRef}/>}
                />
                <Route exact path='/users' render={() =>
                    <UserList/>
                }/>
                <Route path='/users/:id' render={({ match }) =>
                    <User id={match.params.id}/>
                }/>
                <Route path='/blogs/:id' render={({ match }) =>
                    <BlogView id={match.params.id} like={likeBlog} not={notify}/>
                } />
            </Container>
        </Router>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
}
const mapDispatchToProps = {
    setNotification,
    setBlogs,
    setUser,
    setUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
