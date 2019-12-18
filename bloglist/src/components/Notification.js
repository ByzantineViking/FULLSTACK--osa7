import React from 'react'
import { connect } from 'react-redux'
import { Container, Message } from 'semantic-ui-react'


const Notification = (props) => {
    if (!props.notification.message) {
        return null
    }
    console.log(props)
    const col = props.notification.outcome  === 'error' ? 'red' : 'green'

    return (
        <Container>
            <Message color={col}>
                {props.notification.outcome === 'error' ? 'Removed the blog' : props.notification.message}
            </Message>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}
export default connect(mapStateToProps)(Notification)
