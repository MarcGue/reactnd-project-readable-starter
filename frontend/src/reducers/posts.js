import {
    REQUEST_POSTS, RECEIVE_POSTS,
    REQUEST_POSTS_BY_CATEGORY, RECEIVE_POSTS_BY_CATEGORY,
    REQUEST_POST_BY_ID, RECEIVE_POST_BY_ID,
    REQUEST_INCREMENT_POST_SCORE, RECEIVE_INCREMENT_POST_SCORE,
    REQUEST_DECREMENT_POST_SCORE, RECEIVE_DECREMENT_POST_SCORE,
    REQUEST_DELETE_POST, RECEIVE_DELETE_POST
} from '../actions'

export const posts = (state = {
    isFetching: false,
    items: [],
    showComments: false
}, action) => {
    switch(action.type) {
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching: true,
                showComments: false
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                showComments: false,
                items: action.posts.filter(post => post.deleted === false)
            }
        case REQUEST_POSTS_BY_CATEGORY:
            return {
                ...state,
                isFetching: true,
                showComments: false,
            }
        case RECEIVE_POSTS_BY_CATEGORY:
            return {
                ...state,
                isFetching: false,
                showComments: false,
                items: action.posts.filter(post => post.deleted === false)
            }
        case REQUEST_POST_BY_ID:
            return {
                ...state,
                isFetching: true,
                showComments: true
            }
        case RECEIVE_POST_BY_ID:
            return {
                ...state,
                isFetching: false,
                showComments: true,
                items: action.post.deleted === true ? [] : [action.post]
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
                items: state.items.map((post) => {
                    if (post.id === action.post.id) {
                        return action.post
                    }
                    return post
                })
            }
        case REQUEST_DECREMENT_POST_SCORE:
            return {
                ...state,
                isFetching: false
            }
        case RECEIVE_DECREMENT_POST_SCORE: 
            return {
                ...state,
                isFetching: false,
                items: state.items.map((post) => {
                    if (post.id === action.post.id) {
                        return action.post
                    }
                    return post
                })
            }
        case REQUEST_DELETE_POST:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_DELETE_POST:
            return {
                ...state,
                isFetching: false,
                items: state.items.map((post) => {
                    if (post.id === action.post.id) {
                        post.deleted = true
                        return post
                    }
                    return post
                })
            }
        default:
            return state
    }
}