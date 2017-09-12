import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { v1 } from 'uuid'

class PostForm extends Component {

    componentDidMount() {
        const { dispatch, match } = this.props
        const postId = match.params['postId']
        if (postId) {
            dispatch(fetchPostById(postId))
        }
    }

    handleSubmit = e => {
        e.preventDefault()

        const { dispatch, history } = this.props

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

        dispatch(addPost(post))
        history.push('/');
    }

    render() {
        const { categories, posts, postId } = this.props
        const post = posts.find(data => data.id === postId)
        return (
            <Form onSubmit={e => this.handleSubmit(e)}>
                <h3>Add post</h3>
                <hr />
                <FormGroup>
                    <Label for='title'>Title:</Label>
                    <Input type='text' name='title' id='title' required/>
                </FormGroup>
                <FormGroup>
                    <Label for='category'>Category:</Label>
                    <Input type="select" name='category' id='category' required>
                        { categories.map(category => (
                            <option key={category}>{category}</option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for='author'>Author:</Label>
                    <Input type='text' name='author' id='author' required/>
                </FormGroup>
                <FormGroup>
                    <Label for='body'>Value:</Label>
                    <Input type='textarea' name='body' id='body' rows='5' required/>
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