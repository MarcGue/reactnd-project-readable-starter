import * as API from '../utils/api'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const REQUEST_POSTS_BY_CATEGORY = 'REQUEST_POSTS_BY_CATEGORY'
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY'

export const REQUEST_INCREMENT_POST_SCORE = 'REQUEST_INCREMENT_POST_SCORE'
export const RECEIVE_INCREMENT_POST_SCORE = 'RECEIVE_INCREMENT_POST_SCORE'

export const REQUEST_DECREMENT_POST_SCORE = 'REQUEST_DECREMENT_POST_SCORE'
export const RECEIVE_DECREMENT_POST_SCORE = 'RECEIVE_DECREMENT_POST_SCORE'

export const REQUEST_COMMENTS_BY_POST = 'REQUEST_COMMENTS_BY_POST'
export const RECEIVE_COMMENTS_BY_POST = 'RECEIVE_COMMENTS_BY_POST'

export const fetchCategories = () => dispatch => {
    dispatch(requestCategories())
    return API.fetchCategories()
        .then(response => response.json())
        .then(json => dispatch(receiveCategories(json))) 
}

export const requestCategories = () => ({
    type: REQUEST_CATEGORIES,
})

export const receiveCategories = (json) => ({
    type: RECEIVE_CATEGORIES,
    categories: json.categories.map(category => category.name)
})

export const fetchPosts = () => dispatch => {
    dispatch(requestPosts())
    return API.fetchPosts()
        .then(response => response.json())
        .then(posts => {
            dispatch(receivePosts(posts))
            for (let post of posts) {
                dispatch(fetchCommentsByPost(post))
            }
        })
        
}

export const requestPosts = () => ({
    type: REQUEST_POSTS
})

export const receivePosts = (json) => ({
    type: RECEIVE_POSTS,
    posts: json
})

export const fetchPostsByCategory = (category) => dispatch => {
    dispatch(requestPostsByCategory(category))
    return API.fetchPostsByCategory(category)
        .then(response => response.json())
        .then(posts => {
            dispatch(receivePostsByCategory(category, posts))
            for (let post of posts) {
                dispatch(fetchCommentsByPost(post))
            }
        })
}

export const requestPostsByCategory = (category) => ({
    type: REQUEST_POSTS_BY_CATEGORY,
    category
})

export const receivePostsByCategory = (category, posts) => ({
    type: RECEIVE_POSTS_BY_CATEGORY,
    category,
    posts: posts
})

export const incrementPostScore = (post) => dispatch => {
    dispatch(requestIncrementPostScore(post))
    return API.updatePostScore(post, 'upVote')
        .then(response => response.json())
        .then(data => dispatch(receiveIncrementPostScore(data)))
}

export const requestIncrementPostScore = (post) => ({
    type: REQUEST_INCREMENT_POST_SCORE,
    post
})

export const receiveIncrementPostScore = (post) => ({
    type: RECEIVE_INCREMENT_POST_SCORE,
    post
})

export const decrementPostScore = (post) => dispatch => {
    dispatch(requestDecrementPostScore(post))
    return API.updatePostScore(post, 'downVote')
        .then(response => response.json())
        .then(data => dispatch(receiveDecrementPostScore(data)))
}

export const requestDecrementPostScore = (post) => ({
    type: REQUEST_DECREMENT_POST_SCORE,
    post
})

export const receiveDecrementPostScore = (post) => ({
    type: RECEIVE_DECREMENT_POST_SCORE,
    post
})

export const fetchCommentsByPost = (post) => dispatch => {
    dispatch(requestCommentsByPost(post))
    return API.fetchCommentyByPost(post)
        .then(response => response.json())
        .then(data => dispatch(receiveCommentsByPost(post, data)))
}

export const requestCommentsByPost = (post) => ({
    type: REQUEST_COMMENTS_BY_POST,
    post
})

export const receiveCommentsByPost = (post, comments) => ({
    type: RECEIVE_COMMENTS_BY_POST,
    post,
    comments
})