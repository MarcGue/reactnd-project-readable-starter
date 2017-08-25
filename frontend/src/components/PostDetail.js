import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostById } from '../actions'
import VoteBox from './VoteBox'

class PostDetail extends Component {
    
    componentDidMount() {
        const { dispatch, postId } = this.props
        dispatch(fetchPostById(postId))
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, postId } = this.props 
        if (nextProps.postId !== this.props.postId) {
            dispatch(fetchPostById(postId))
        }
    }

    getComments = (postId) => {
        const { comments } = this.props
        if (comments[postId]) {
            return comments[postId]
        }
        return []
    }

    render() {
        const { post } = this.props

        return (
            <section>
                <VoteBox post={post}/>
                <h1>{ post.title }</h1>
                <div>Author: { post.author }</div>
                <ul>
                    { this.getComments(post.id).map(comment => (
                        <li key={comment.id}>{comment.body}</li>
                    ))}
                </ul>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    post: state.posts.selectedPost,
    comments: state.comments
})

export default connect(mapStateToProps)(PostDetail)