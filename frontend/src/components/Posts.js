import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPostsByCategory, fetchCommentsByPost } from '../actions'
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.category !== this.props.category) {
            const { dispatch, category } = nextProps
            dispatch(fetchPostsByCategory(category))
        }
    }

    render() {
        const { posts, dispatch, fetchCommentsByPost } = this.props
        return (
            <ul>
                { posts.map(post => (
                    
                    <li key={ post.id }>
                        <VoteBox 
                            voteScore={ post.voteScore }
                        />
                        <h1>{ post.title }</h1>
                        <div>Author: { post.author }</div>
                        <div>Kommentare</div>
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