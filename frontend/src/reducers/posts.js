import {
    REQUEST_POSTS, RECEIVE_POSTS,
    REQUEST_POSTS_BY_CATEGORY, RECEIVE_POSTS_BY_CATEGORY,
    REQUEST_POST_BY_ID, RECEIVE_POST_BY_ID,
    REQUEST_INCREMENT_POST_SCORE, RECEIVE_INCREMENT_POST_SCORE,
    REQUEST_DECREMENT_POST_SCORE, RECEIVE_DECREMENT_POST_SCORE
} from '../actions'

export const posts = (state = {
    isFetching: false,
    items: [],
    selectedPost: {}
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
        case REQUEST_POST_BY_ID:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_POST_BY_ID:
            return {
                ...state,
                isFetching: false,
                selectedPost: action.post
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
                        return {
                            ...post,
                            ...post.voteScore++ 
                        }
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
                        return {
                            ...post,
                            ...post.voteScore-- 
                        }
                    }
                    return post
                })
            }
        default:
            return state
    }
}