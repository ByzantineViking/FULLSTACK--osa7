import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
const BlogList = (props) => {
    return(
        <div>
            <h2>blogs</h2>
            <Togglable buttonLabel='create new' ref={props.newBlogRef}>
                <NewBlog createBlog={props.createBlog} />
            </Togglable>
            {
                props.blogs.sort(props.byLikes).map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        like={props.likeBlog}
                        remove={props.removeBlog}
                        user={props.user}
                        creator={blog.user.username === props.user.username}
                    />
                )
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    return{
        user: state.user,
        blogs: state.blogs
    }
}
export default connect(mapStateToProps)(BlogList)