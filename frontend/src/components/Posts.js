import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementPostScore } from '../actions'
import VoteBox from './VoteBox'

class Posts extends Component {

    handleIncrementScore = (post) => {
        this.props.dispatch(incrementPostScore(post))
    }

    render() {
        const { posts, onClickCategory } = this.props
        return (
            <div>
                { posts.map(post => (
                    <article>
                        <h1>{ post.title }</h1>
                        <VoteBox 
                            onIncrementScore= {() => this.handleIncrementScore(post) }
                            voteScore={ post.voteScore }/>
                        <p>{ post.body }</p>
                        <button onClick={ e => onClickCategory(post.category) }>{ post.category }</button>
                        <hr />
                    </article>
                ))}
            </div>
        )
    }
}
export default connect()(Posts)