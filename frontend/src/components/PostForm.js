import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, editPost, fetchPostById } from '../actions'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { v1 } from 'uuid'

class PostForm extends Component {

    componentDidMount() {
        const { dispatch, match } = this.props
        const postId = match.params.postId
        if (postId) {
            dispatch(fetchPostById(postId))
        }
    }

    handleValueChanged = (e, post) => {
        e.preventDefault()

        if (e.target.id === 'title') {
            post.title = e.target.value
        }

        // dispatch valueChange(post, name, value)
    }

    handleSubmit = e => {
        e.preventDefault()

        const { dispatch, match, history } = this.props

        const title = e.target.title.value
        const category = e.target.category.value
        const author = e.target.author.value
        const body = e.target.body.value

        const post = {
            id: v1(),
            timestamp: new Date().getTime(),
            title: title,
            body: body,
            author: author,
            category: category
        }

        if (match.path.endsWith('edit')) {
            dispatch(editPost(post))
            history.push(`/${post.category}/${post.id}`)
        } else {
            dispatch(addPost(post))
            history.push('/')
        } 
    }

    render() {
        const { categories, posts, match } = this.props
        let header = match.path.endsWith('edit') ? 'Edit post' : 'Add post'
        let post = posts.find(data => data.id === match.params.postId)
        if (!post) {
            post = {
                title: '',
                category: categories[0],
                author: '',
                body: '',
            } 
        }

        return (
            <Form onSubmit={e => this.handleSubmit(e)}>
                <h3>{header}</h3>
                <hr />
                <FormGroup>
                    <Label for='title'>Title:</Label>
                    <Input 
                        type='text' 
                        name='title' 
                        id='title' 
                        value={post.title} 
                        onChange={e => this.handleValueChanged(e, post)}
                        required/>
                </FormGroup>
                <FormGroup>
                    <Label for='category'>Category:</Label>
                    <Input type="select" name='category' id='category' value={post.category} required>
                        { categories.map(category => (
                            <option key={category}>{category}</option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for='author'>Author:</Label>
                    <Input type='text' name='author' id='author' value={post.author} required/>
                </FormGroup>
                <FormGroup>
                    <Label for='body'>Value:</Label>
                    <Input type='textarea' name='body' id='body' rows='5' value={post.body} required/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories.items,
    posts: state.posts.items
})

export default withRouter(connect(mapStateToProps)(PostForm))