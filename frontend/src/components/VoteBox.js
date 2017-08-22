import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/lib/ti'
import { incrementPostScore, decrementPostScore } from '../actions'
import './VoteBox.css'

class VoteBox extends Component {

    onIncrementScore = (post) => {
        const { dispatch } = this.props
        dispatch(incrementPostScore(post))
    }

    onDecrementStore = (post) => {
        const { dispatch } = this.props
        dispatch(decrementPostScore(post))
    }

    render() {
        const { post } = this.props
        return (
            <div className="voteBox">
                <TiArrowSortedUp onClick={e => this.onIncrementScore(post)} className="vote" />
                <div>{ post.voteScore }</div>
                <TiArrowSortedDown onClick={e => this.onDecrementStore(post)} className="vote" />
            </div>
        )
    }
}

export default connect()(VoteBox)