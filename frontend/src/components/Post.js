import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementPostScore } from '../actions'
import VoteBox from './VoteBox'

class Post extends Component {

    handleIncrementScore = (post) => {
        this.props.dispatch(incrementPostScore(post))
    }

    render() {
        const { post } = this.props

        return (
            <article>
                <h1>{ post.title }</h1>
                    <VoteBox 
                        onIncrementScore= {() => this.handleIncrementScore(post) }
                        voteScore={ post.voteScore }/>
                <p>{ post.body }</p>
                <button onClick={ e => onClickCategory(post.category) }>{ post.category }</button>
            </article>
        )
    }
}

export default connect()(Post)