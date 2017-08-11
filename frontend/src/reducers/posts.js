import {
    REQUEST_POSTS, RECEIVE_POSTS,
    REQUEST_POSTS_BY_CATEGORY, RECEIVE_POSTS_BY_CATEGORY,
    REQUEST_INCREMENT_POST_SCORE, RECEIVE_INCREMENT_POST_SCORE
} from '../actions'

export const posts = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch(action.type) {
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                items: action.posts
            }
        case REQUEST_POSTS_BY_CATEGORY:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_POSTS_BY_CATEGORY:
            return {
                ...state,
                isFetching: false,
                items: action.posts
            }
        case REQUEST_INCREMENT_POST_SCORE:
            return {
                ...state,
                isFetching: false
            }
        case RECEIVE_INCREMENT_POST_SCORE:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state
    }
}