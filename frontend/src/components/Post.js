import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import VoteBox from './VoteBox'

class Post extends Component {

    getCommentSize = (postId) => {
        const { comments } = this.props
        if (comments[postId]) {
            return comments[postId].length
        }
        return 0
    }

    render() {
        const { post } = this.props

        return (
            <article className='container'>
                <VoteBox post={post}/>
                <div>
                    <h1><Link to={`/${post.category}/${post.id}`}>{ post.title }</Link></h1>
                    <div>Author: { post.author }</div>
                    <div>Kommentare: { this.getCommentSize(post.id) }</div> 
                </div>
            </article>
        )
    }
}

const mapStateToProps = state => ({
    comments: state.comments
})

export default connect(mapStateToProps)(Post)