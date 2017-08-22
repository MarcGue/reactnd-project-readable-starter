import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { posts } from './posts'
import { categories } from './categories'
import { comments } from './comments'

export default combineReducers({
    router: routerReducer,
    categories,
    posts,
    comments
})