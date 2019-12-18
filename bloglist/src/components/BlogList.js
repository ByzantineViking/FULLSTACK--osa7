import React, { useState }  from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import { Table } from 'semantic-ui-react'
const BlogList = (props) => {
    const [expanded, setExpanded] = useState(false)
    const visibility = () => {
        const value = expanded ? '' : 'none'
        return (
            value
        )
    }
    return(
        <div>
            <h2>blogs</h2>
            <Togglable buttonLabel='create new' ref={props.newBlogRef}>
                <NewBlog createBlog={props.createBlog} />
            </Togglable>
            <Table striped celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Blog</Table.HeaderCell>
                        <Table.HeaderCell>Author</Table.HeaderCell>
                        <Table.HeaderCell style={{ display: visibility() }}></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        props.blogs.sort(props.byLikes).map(blog =>
                            <Blog
                                key={blog.id}
                                blog={blog}
                                like={props.likeBlog}
                                remove={props.removeBlog}
                                user={props.user}
                                creator={blog.user.username === props.user.username}
                                expanded={expanded}
                                setExpanded={setExpanded}
                                visibility={visibility}
                            />
                        )
                    }
                </Table.Body>
            </Table>
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