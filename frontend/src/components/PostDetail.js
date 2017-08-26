import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostById } from '../actions'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Post from './Post'

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
                                <Form>
                                    <FormGroup>
                                        <Label for="comment">Add a comment:</Label>
                                        <Input type="textarea" name="text" id="comment" rows="5"/>
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