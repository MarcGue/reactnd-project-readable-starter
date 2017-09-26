import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPostsByCategory } from '../actions'
import Post from '../components/Post'


class Posts extends Component {

    componentDidMount() {
        const { dispatch, match } = this.props

        let category = match.params.category
        if (category) {
            dispatch(fetchPostsByCategory(category))
        } else {
            dispatch(fetchPosts())
        }
    }

    render() {
        const { posts } = this.props
        return (
            <section>
                { posts.map(post => (
                    <article key={ post.id } className='mb-5'>
                        <Post post={post} />
                    </article>
                ))}
            </section>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items.filter(post => post.deleted === false),
})

export default connect(mapStateToProps)(Posts)