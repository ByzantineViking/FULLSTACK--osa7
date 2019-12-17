import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import userService from '../services/users'
import { setUserPage } from '../reducers/appreducers'


const User = (props) => {
    useEffect( () => {
        userService.getUser(props.id).then( (user) => {
            props.setUserPage(user)
        })
    }, [])
    if (!props.userPage) {
        return null
    }
    return (
        <div>
            <h2>{props.userPage.name}</h2>

            <h3>added blogs</h3>
            {props.blogs.map(blog =>
                blog.user.id === props.id ? <div key={blog.id}>{blog.title}</div> : <div key={blog.id}></div>
            )}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        userPage: state.userPage
    }
}
const mapDispatchToProps = {
    setUserPage
}
export default connect(mapStateToProps, mapDispatchToProps)(User)
