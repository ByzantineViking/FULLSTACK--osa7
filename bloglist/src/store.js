
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { notificationReducer, blogsReducer, userReducer, usersReducer, userPageReducer } from './reducers/appreducers'


const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
    userPage: userPageReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
store.subscribe(() => console.log(store.getState()))

export default store