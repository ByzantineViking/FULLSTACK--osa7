import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {
    if (!props.notification.message) {
        return null
    }
    const style = {
        color: props.notification.outcome === 'error' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        <div style={style}>
            {props.notification.outcome === 'error' ? 'Succesfully removed the blog' : props.notification.message}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}
export default connect(mapStateToProps)(Notification)
