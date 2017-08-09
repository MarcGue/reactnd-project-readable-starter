const API_URL = 'http://localhost:5001/'

const headers = {
    'Authorization': 'anything'
}

export const fetchCategories = () => {
    return fetch('http://localhost:5001/categories', {
        headers: headers
    })
}

export const fetchPosts = () => {
    return fetch(API_URL + 'posts', {
        headers: headers
    })
}

export const fetchPostsByCategory = (category) => {
    return fetch(API_URL + category + '/posts', {
        headers: headers
    })
}

export const incrementPostScore = (post) => {
    return fetch(API_URL + 'posts/' + post.id + '?option=upVote', {
        header: headers,
        method: 'POST'
    })
}