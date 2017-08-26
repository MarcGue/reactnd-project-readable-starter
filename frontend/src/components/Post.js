import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { incrementPostScore, decrementPostScore } from '../actions'
import VoteBox from './VoteBox'

class Post extends Component {

    incrementPostScore = (post) => {
        const { dispatch } = this.props
        dispatch(incrementPostScore(post))
    }

    decrementPostStore = (post) => {
        const { dispatch } = this.props
        dispatch(decrementPostScore(post))
    }

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
            <div className='container'>
                <div className='row'>
                    <div className='col-3'>
                        <VoteBox 
                            data={post} 
                            onIncrementScore={this.incrementPostScore}
                            onDecrementStore={this.decrementPostStore}
                        />
                    </div>
                    <div className='col-9'>
                        <h3 className='mb-4'><Link to={`/${post.category}/${post.id}`}>{ post.title }</Link></h3>
                        <div>Author: { post.author }</div>
                        <div>Kommentare: { this.getCommentSize(post.id) }</div> 
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    comments: state.comments
})

export default connect(mapStateToProps)(Post)