import { 
    REQUEST_COMMENTS_BY_POST,
    RECEIVE_COMMENTS_BY_POST
} from '../actions'

export const comments = (state = {
    isFetching: false,
    items: []
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
        default:
            return state
    }
}