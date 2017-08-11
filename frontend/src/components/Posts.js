import React, { Component } from 'react'

class Posts extends Component {

    render() {
        const { posts } = this.props
        return (
            <ul>
                { posts.map(post => (
                    <li key={ post.id }>
                        <h1>{ post.title }</h1>
                    </li>
                ))}
            </ul>
        )
    }
}
export default Posts