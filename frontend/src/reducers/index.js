import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { posts } from './posts'
import { categories } from './categories'
import { comments } from './comments'

export default combineReducers({
    router: routerReducer,
    form: formReducer,
    categories,
    posts,
    comments
})