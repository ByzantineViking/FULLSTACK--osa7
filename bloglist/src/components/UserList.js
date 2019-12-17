import React from 'react'
import { connect } from 'react-redux'
import { setUsers } from '../reducers/appreducers'
import { Link } from 'react-router-dom'


const byAmount = (b1, b2) => b2.blogs.length - b1.blogs.length
const padding = {
    borderSpacing: '10px 0',
}
const UserList = (props) => {
    return (
        <div>
            <table style={padding}>
                <tbody>
                    <tr>
                        <th>User</th>
                        <th>Blogs created</th>
                    </tr>
                    {
                        props.users.sort(byAmount).map(user =>
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}
const mapDispatchToProps = {
    setUsers
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList)