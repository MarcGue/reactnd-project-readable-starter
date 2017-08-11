import React, { Component } from 'react'
import { connect } from 'react-redux'
import VoteBox from './VoteBox'

class Posts extends Component {

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const { posts } = this.props
        return (
            <ul>
                { posts.map(post => (
                    <li key={ post.id }>
                        <VoteBox 
                            voteScore={ post.voteScore }
                        />
                        <h1>{ post.title }</h1>
                    </li>
                ))}
            </ul>
        )
    }
}
export default connect()(Posts)