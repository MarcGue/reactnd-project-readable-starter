import { 
    REQUEST_COMMENTS_BY_POST,
    RECEIVE_COMMENTS_BY_POST,
    REQUEST_INCREMENT_COMMENT_SCORE,
    RECEIVE_INCREMENT_COMMENT_SCORE,
    REQUEST_DECREMENT_COMMENT_SCORE,
    RECEIVE_DECREMENT_COMMENT_SCORE,
    REQUEST_ADD_COMMENT,
    RECEIVE_ADD_COMMENT
} from '../actions'

export const comments = (state = {
    isFetching: false
}, action) => {
    switch(action.type) {
        case REQUEST_COMMENTS_BY_POST:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_COMMENTS_BY_POST:
            return {
                ...state,
                isFetching: false,
                [action.post.id]: action.comments 
            }
        case REQUEST_INCREMENT_COMMENT_SCORE:
            return {
                ...state,
                isFetching: true,
            }
        case RECEIVE_INCREMENT_COMMENT_SCORE:
            return {
                ...state,
                isFetching: false,
                [action.comment.parentId]: state[action.comment.parentId].map((comment) => {
                    if (comment.id === action.comment.id) {
                        return action.comment
                    }
                    return comment
                })
            }
        case REQUEST_DECREMENT_COMMENT_SCORE:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_DECREMENT_COMMENT_SCORE:
            return {
                ...state,
                isFetching: false,
                [action.comment.parentId]: state[action.comment.parentId].map((comment) => {
                    if (comment.id === action.comment.id) {
                        return action.comment
                    }
                    return comment
                })
            }
        case REQUEST_ADD_COMMENT:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_ADD_COMMENT:
            return {
                ...state,
                isFetching: false,
                [action.comment.parentId]: [...state[action.comment.parentId], action.comment]
            }
        default:
            return state

    }
}