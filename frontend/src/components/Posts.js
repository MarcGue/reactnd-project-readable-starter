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

    componentWillReceiveProps(nextProps) {
        if (nextProps.category !== this.props.category) {
            const { dispatch, category } = nextProps
            dispatch(fetchPostsByCategory(category))
        }
    }

    getCommentSize = (postId) => {
        const { comments } = this.props
        if (comments[postId]) {
            return comments[postId].length
        }
        return 0
    }

    render() {
        const { posts } = this.props
        return (
            <ul>
                { posts.map(post => (
                    
                    <li key={ post.id }>
                        <VoteBox 
                            post={post}
                        />
                        <h1>{ post.title }</h1>
                        <div>Author: { post.author }</div>
                        <div>Kommentare: { this.getCommentSize(post.id) }</div> 
                    </li>
                ))}
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    comments: state.comments
})

export default connect(mapStateToProps)(Posts)