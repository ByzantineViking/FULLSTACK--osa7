import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
const Blog = ({ blog, like, remove, creator, expanded, setExpanded, visibility }) => {
    const details = () => (
        <div className='details'>
            <a href={blog.url}>{blog.url}</a>
            <div>{blog.likes} likes
                <button onClick={() => like(blog)}>like</button>
            </div>
            <div>added by {blog.user.name}</div>
            {creator && (<button onClick={() => remove(blog)}>remove </button>)}
        </div>
    )
    return (
        <Table.Row>
            <Table.Cell data-cy='expand' onClick={() => setExpanded(!expanded)} className='name' style={{ cursor: 'pointer' }}>
                <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                </Link>
            </Table.Cell>
            <Table.Cell>
                {blog.author}
            </Table.Cell>
            <Table.Cell style={{ display: visibility() }}>
                {expanded && details()}
            </Table.Cell>
        </Table.Row>
    )
}


Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    like: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    creator: PropTypes.bool.isRequired
}

export default Blog
