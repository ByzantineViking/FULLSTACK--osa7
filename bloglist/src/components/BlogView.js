import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/appreducers'
const BlogView = (props) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const commentOnBlog = async (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        event.target.comment.value = ''
        const newComments = props.blog.comments ? props.blog.comments.concat(comment) : [comment]
        // This thing only works if ...props.blog is before setting the new comments
        // the comments: newComments overrides(?) the comments from ...props.blog
        const commentedBlog = { ...props.blog, comments: newComments }
        const updatedBlog = await blogService.update(commentedBlog)
        props.setBlogs(props.blogs.map(b => b.id === props.blog.id ? updatedBlog : b))
        props.not(`You commented on ${props.blog.title}!`, 'success')
    }
    if (!props.blog) {
        return null
    }
    const commentsOnThis = () => {
        return(
            props.blog.comments ? props.blog.comments.map(comment => <li key={comment}>{comment}</li>) : <div>Be the first to comment!</div>
        )
    }
    return (
        <div style={blogStyle}>
            <h3>{props.blog.title}</h3>
            <a href={props.blog.url}>{props.blog.url}</a>
            <div>{props.blog.likes} likes
                <button onClick={() => props.like(props.blog)}>like</button>
            </div>
            <div>added by {props.blog.user.name}</div>
            <h4>Comments</h4>
            <form onSubmit={commentOnBlog}>
                <input type='text' name='comment' id='commentInput'/>
                <button type="submit">Comment</button>
            </form>
            <ul>
                {commentsOnThis()}
            </ul>
        </div>
    )
}
// ownProps
const mapStateToProps = (state, props) => {
    const visibleBlog = state.blogs.find(blog => blog.id === props.id)
    //console.log('visibleBlog: ', visibleBlog)
    return {
        blog: visibleBlog,
        blogs: state.blogs,
        comments: state.comments
    }
}
const mapDispatchToProps = {
    setBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView)
