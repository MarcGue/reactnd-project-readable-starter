import React, { Component } from 'react'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/lib/ti'
import './VoteBox.css'

class VoteBox extends Component {
    render() {
        const { data, onIncrementScore, onDecrementStore } = this.props
        return (
            <div className="voteBox">
                <TiArrowSortedUp onClick={e => onIncrementScore(data)} className="vote" />
                <div>{ data.voteScore }</div>
                <TiArrowSortedDown onClick={e => onDecrementStore(data)} className="vote" />
            </div>
        )
    }
}

export default VoteBox