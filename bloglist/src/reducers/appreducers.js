// Initial state centralized
const initialState = {
    notification: '',
    blogs: [],
    user: null,
    users: [],
    userPage: null
}
export const setUsers = (users) => {
    return async (dispatch) => {
        dispatch({
            type:'SET_USERS',
            data: {
                users
            }
        })
    }
}
export const usersReducer = (state = initialState.users, action) => {
    switch(action.type) {
    case('SET_USERS'):
        return action.data.users
    default:
        return state
    }
}
export const setUserPage = (user) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_USERPAGE',
            data: {
                user
            }
        })
    }
}
export const userPageReducer = (state = initialState.userPage, action) => {
    switch(action.type) {
    case('SET_USERPAGE'):
        return action.data.user
    default:
        return state
    }
}

export const setNotification = (message, outcome, time) => {
    // redux-thunk
    /*console.log('message: ',message)
    console.log('outcome', outcome)
    console.log('time', time)*/
    return async (dispatch) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                message,
                outcome
            }
        })
        setTimeout(() => {
            dispatch({
                type:'CLEAR_NOTIFICATION',
            })
        }, time)
    }
}
export const notificationReducer = (state = initialState.notification, action) => {
    switch(action.type) {
    case 'SET_NOTIFICATION':
        return {
            message: action.data.message,
            outcome: action.data.outcome
        }
    case 'CLEAR_NOTIFICATION':
        return ''
    default:
        return state
    }
}
export const setBlogs = (blogs) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_BLOGS',
            data: {
                blogs
            }
        })
    }
}
export const blogsReducer = (state = initialState.blogs, action) => {
    switch(action.type) {
    case 'SET_BLOGS':
        return action.data.blogs
    default:
        return state
    }
}

export const setUser = (user) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_USER',
            data: {
                user
            }
        })
    }
}

export const userReducer = (state = initialState.user, action) => {
    switch(action.type) {
    case 'SET_USER':
        return action.data.user
    default:
        return state
    }
}