import React, { Component } from 'react'
import { TiArrowSortedUp, TiArrowSortedDown} from 'react-icons/lib/ti'
import './VoteBox.css'

class VoteBox extends Component {
    render() {
        const { onIncrementScore, voteScore, onDecrementStore } = this.props
        return (
            <div className="voteBox">
                <TiArrowSortedUp onClick={onIncrementScore} className="vote" />
                <div>{ voteScore }</div>
                <TiArrowSortedDown onClick={onDecrementStore} className="vote" />
            </div>
        )
    }
}

export default VoteBox