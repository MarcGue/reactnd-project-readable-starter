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

export const incrementPostScore = (post) => {
    return fetch(API_URL + '/posts/' + post.id, {
        headers,
        method: 'POST',
        body: JSON.stringify({
            option: 'upVote'
	    })
    })
}