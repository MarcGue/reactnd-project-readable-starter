const API_URL = 'http://localhost:5001'

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'anything'
}

export const fetchCategories = () => {
    return fetch(`${API_URL}/categories`, { headers })
}

export const fetchPosts = () => {
    return fetch(`${API_URL}/posts`, { headers })
}

export const fetchPostsByCategory = (category) => {
    return fetch(`${API_URL}/${category}/posts`, { headers })
}

export const fetchPostById = (postId) => {
    return fetch(`${API_URL}/posts/${postId}`, { headers})
}

export const updatePostScore = (post, option) => {
    return fetch(`${API_URL}/posts/${post.id}`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
            option: option
	    })
    })
}

export const deletePost = (post) => {
    return fetch(`${API_URL}/posts/${post.id}`, {
        headers,
        method: 'DELETE'
    })
}

export const fetchCommentyByPost = (post) => {
    return fetch(`${API_URL}/posts/${post.id}/comments`, { headers })
}

export const updateCommentScore = (comment, option) => {
    return fetch(`${API_URL}/comments/${comment.id}`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
            option: option
	    })
    })
}

export const addComment = (comment) => {
    return fetch(`${API_URL}/comments`, { 
        headers,
        method: 'POST',
        body: JSON.stringify(comment)
    })
}