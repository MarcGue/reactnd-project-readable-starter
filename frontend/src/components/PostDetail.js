import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostById, addComment } from '../actions'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Post from './Post'
import { v1 } from 'uuid'

class PostDetail extends Component {
    
    componentDidMount() {
        const { dispatch, postId } = this.props
        dispatch(fetchPostById(postId))
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, postId } = this.props 
        if (nextProps.postId !== this.props.postId) {
            dispatch(fetchPostById(postId))
        }
    }

    handleSubmit = (event, post) => {
        const { dispatch } = this.props
        
        event.preventDefault()
        const owner = event.target.author.value
        const body = event.target.comment.value
        
        const comment = {
            id: v1(),
            timestamp: new Date().getTime(),
            body: body,
            owner: owner,
            parentId: post.id
        }
    
        dispatch(addComment(comment))
    }

    render() {
        const { posts, postId } = this.props
        const post = posts.find(data => data.id === postId)
        if (post) {
            return (
                <div>
                    <Post post={post} />
                    <hr />
                    <Container>
                        <Row>
                            <Col lg='12'>
                                <Form onSubmit={e => this.handleSubmit(e, post)}>
                                    <FormGroup>
                                        <Label for='author'>Author:</Label>
                                        <Input type='text' name='author' id='author' required/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='comment'>Comment:</Label>
                                        <Input type='textarea' name='comment' id='comment' rows='5' required/>
                                    </FormGroup>
                                    <Button>Submit</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        } else {
            return (
                <div>
                    {`Could not find a Post with the Id: ${postId}`}
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    comments: state.comments
})

export default connect(mapStateToProps)(PostDetail)