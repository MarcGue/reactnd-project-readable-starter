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
        const { posts, postId } = this.props
        const post = posts.find(data => data.id === postId)
        if (post) {
            return (
                <div>
                    <VoteBox post={post}/>
                    <h1>{ post.title }</h1>
                    <div>Author: { post.author }</div>
                    <ul>
                        { this.getComments(post.id).map(comment => (
                            <li key={comment.id}>{comment.body}</li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    {`Could not find a Post with the Id: ${postId}`}
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    comments: state.comments
})

export default connect(mapStateToProps)(PostDetail)