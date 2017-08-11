import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPostsByCategory } from '../actions'
import VoteBox from './VoteBox'


class Posts extends Component {

    componentDidMount() {
        const { dispatch, category } = this.props
        if (category) {
            dispatch(fetchPostsByCategory(category))
        } else {
            dispatch(fetchPosts())
        }
    }

    render() {
        const { posts } = this.props
        return (
            <ul>
                { posts.map(post => (
                    <li key={ post.id }>
                        <VoteBox 
                            voteScore={ post.voteScore }
                        />
                        <h1>{ post.title }</h1>
                    </li>
                ))}
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps)(Posts)