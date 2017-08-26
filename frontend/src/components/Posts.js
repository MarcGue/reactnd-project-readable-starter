import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPostsByCategory } from '../actions'
import Post from '../components/Post'


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

    render() {
        const { posts } = this.props
        return (
            <section>
                { posts.map(post => (
                    <article key={ post.id }>
                        <Post post={post} />
                        <hr />
                    </article>
                ))}
            </section>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items,
})

export default connect(mapStateToProps)(Posts)