import * as API from '../utils/api'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const REQUEST_POSTS_BY_CATEGORY = 'REQUEST_POSTS_BY_CATEGORY'
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY'

export const REQUEST_POST_BY_ID = 'REQUEST_POST_BY_ID'
export const RECEIVE_POST_BY_ID = 'RECEIVE_POST_BY_ID'

export const REQUEST_ADD_POST = 'REQUEST_ADD_POST'
export const RECEIVE_ADD_POST = 'RECEIVE_ADD_POST'

export const REQUEST_EDIT_POST = 'REQUEST_EDIT_POST'
export const RECEIVE_EDIT_POST = 'RECEIVE_EDIT_POST'

export const REQUEST_DELETE_POST = 'REQUEST_DELETE_POST'
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST'

export const REQUEST_INCREMENT_POST_SCORE = 'REQUEST_INCREMENT_POST_SCORE'
export const RECEIVE_INCREMENT_POST_SCORE = 'RECEIVE_INCREMENT_POST_SCORE'

export const REQUEST_DECREMENT_POST_SCORE = 'REQUEST_DECREMENT_POST_SCORE'
export const RECEIVE_DECREMENT_POST_SCORE = 'RECEIVE_DECREMENT_POST_SCORE'

export const REQUEST_COMMENTS_BY_POST = 'REQUEST_COMMENTS_BY_POST'
export const RECEIVE_COMMENTS_BY_POST = 'RECEIVE_COMMENTS_BY_POST'

export const REQUEST_INCREMENT_COMMENT_SCORE = 'REQUEST_INCREMENT_COMMENT_SCORE'
export const RECEIVE_INCREMENT_COMMENT_SCORE = 'RECEIVE_INCREMENT_COMMENT_SCORE'

export const REQUEST_DECREMENT_COMMENT_SCORE = 'REQUEST_DECREMENT_COMMENT_SCORE'
export const RECEIVE_DECREMENT_COMMENT_SCORE = 'RECEIVE_DECREMENT_COMMENT_SCORE'

export const REQUEST_ADD_COMMENT = 'REQUEST_ADD_COMMENT'
export const RECEIVE_ADD_COMMENT = 'RECEIVE_ADD_COMMENT'

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

export const receivePosts = json => ({
    type: RECEIVE_POSTS,
    posts: json
})

export const fetchPostsByCategory = category => dispatch => {
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

export const requestPostsByCategory = category => ({
    type: REQUEST_POSTS_BY_CATEGORY,
    category
})

export const receivePostsByCategory = (category, posts) => ({
    type: RECEIVE_POSTS_BY_CATEGORY,
    category,
    posts: posts
})

export const fetchPostById = postId => dispatch => {
    dispatch(requestPostById(postId))
    return API.fetchPostById(postId)
        .then(response => response.json())
        .then(post => {
            dispatch(receivePostById(post))
            dispatch(fetchCommentsByPost(post))
        })
}

export const requestPostById = postId => ({
    type: REQUEST_POST_BY_ID,
    postId
})

export const receivePostById = post => ({
    type: RECEIVE_POST_BY_ID,
    post
})

export const incrementPostScore = post => dispatch => {
    dispatch(requestIncrementPostScore(post))
    return API.updatePostScore(post, 'upVote')
        .then(response => response.json())
        .then(data => dispatch(receiveIncrementPostScore(data)))
}

export const requestIncrementPostScore = post => ({
    type: REQUEST_INCREMENT_POST_SCORE,
    post
})

export const receiveIncrementPostScore = post => ({
    type: RECEIVE_INCREMENT_POST_SCORE,
    post
})

export const decrementPostScore = post => dispatch => {
    dispatch(requestDecrementPostScore(post))
    return API.updatePostScore(post, 'downVote')
        .then(response => response.json())
        .then(data => dispatch(receiveDecrementPostScore(data)))
}

export const requestDecrementPostScore = post => ({
    type: REQUEST_DECREMENT_POST_SCORE,
    post
})

export const receiveDecrementPostScore = post => ({
    type: RECEIVE_DECREMENT_POST_SCORE,
    post
})

export const addPost = post => dispatch => {
    dispatch(requestAddPost(post))
    return API.addPost(post)
        .then(response => response.json())
        .then(data => dispatch(receiveAddPost(data)))
}

export const requestAddPost = post => ({
    type: REQUEST_ADD_POST,
    post
})

export const receiveAddPost = post => ({
    type: RECEIVE_ADD_POST,
    post
})

export const editPost = post => dispatch => {
    dispatch(requestEditPost)
    return API.editPost(post)
        .then(response => response.json())
        .then(data => dispatch(receiveEditPost(post)))
}

export const requestEditPost = post => ({
    type: REQUEST_EDIT_POST,
    post
})

export const receiveEditPost = post => ({
    type: RECEIVE_EDIT_POST,
    post
})

export const deletePost = post => dispatch => {
    dispatch(requestDeletePost(post))
    return API.deletePost(post)
        .then(response => dispatch(receiveDeletePost(post)))
}

export const requestDeletePost = post => ({
    type: REQUEST_DELETE_POST,
    post
})

export const receiveDeletePost = post => ({
    type: RECEIVE_DELETE_POST,
    post
})

export const fetchCommentsByPost = post => dispatch => {
    dispatch(requestCommentsByPost(post))
    return API.fetchCommentyByPost(post)
        .then(response => response.json())
        .then(data => dispatch(receiveCommentsByPost(post, data)))
}

export const requestCommentsByPost = post => ({
    type: REQUEST_COMMENTS_BY_POST,
    post
})

export const receiveCommentsByPost = (post, comments) => ({
    type: RECEIVE_COMMENTS_BY_POST,
    post,
    comments
})

export const incrementCommentScore = comment => dispatch => {
    dispatch(requestIncrementCommentScore(comment))
    return API.updateCommentScore(comment, 'upVote')
        .then(response => response.json())
        .then(data => dispatch(receiveIncrementCommentScore(data)))
}

export const requestIncrementCommentScore = comment => ({
    type: REQUEST_INCREMENT_COMMENT_SCORE,
    comment
})

export const receiveIncrementCommentScore = comment => ({
    type: RECEIVE_INCREMENT_COMMENT_SCORE,
    comment
})

export const decrementCommentScore = (comment) => dispatch => {
    dispatch(requestDecrementCommentScore(comment))
    return API.updateCommentScore(comment, 'downVote')
        .then(response => response.json())
        .then(data => dispatch(receiveDecrementCommentScore(data)))
}

export const requestDecrementCommentScore = (comment) => ({
    type: REQUEST_DECREMENT_COMMENT_SCORE,
    comment
})

export const receiveDecrementCommentScore = (comment) => ({
    type: RECEIVE_DECREMENT_COMMENT_SCORE,
    comment
})

export const addComment = (comment) => dispatch => {
    dispatch(requestAddComment(comment))
    return API.addComment(comment)
        .then(response => response.json())
        .then(data => dispatch(receiveAddComment({
            ...comment, 
            voteScore: data.voteScore,
            deleted: data.deleted,
            parentDeleted: data.parentDeleted
        })))
}

export const requestAddComment = (comment) => ({
    type: REQUEST_ADD_COMMENT,
    comment
})

export const receiveAddComment = (comment) => ({
    type: RECEIVE_ADD_COMMENT,
    comment
})

