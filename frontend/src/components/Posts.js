import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPostsByCategory } from '../actions'
import * as API from '../utils/api'
import VoteBox from './VoteBox'


class Posts extends Component {

    componentDidMount() {
        const { dispatch, category } = this.props
        if (category) {
            dispatch(fetchPostsByCategory(category))
        } else {
            dispatch(fetchPosts())
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category !== this.props.category) {
            const { dispatch, category } = nextProps
            dispatch(fetchPostsByCategory(category))
        }
    }

    getComments = (post) => {
        API.fetchCommentyByPost(post).then(response => response.json()).then(json => console.log(json))
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
                        <div>Author: { post.author }</div>
                        <div>Kommentare {this.getComments(post)}</div>
                    </li>
                ))}
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps)(Posts)