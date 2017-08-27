import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { incrementPostScore, decrementPostScore } from '../actions'
import { Container, Row, Col, Button } from 'reactstrap';
import { MdCreate } from 'react-icons/lib/md'
import { FaTrash } from 'react-icons/lib/fa'
import VoteBox from './VoteBox'
import Comment from './Comment'

class Post extends Component {

    incrementPostScore = (post) => {
        const { dispatch } = this.props
        dispatch(incrementPostScore(post))
    }

    decrementPostScore = (post) => {
        const { dispatch } = this.props
        dispatch(decrementPostScore(post))
    }

    getComments = (postId) => {
        const { comments } = this.props
        if (comments[postId]) {
            return comments[postId]
        }
        return []
    }

    render() {
        const { post, showComments } = this.props

        return (
            <Container className='post py-3'>
                <Row>
                    <Col sm='12' lg='12'>
                        <h3>
                            <Row>
                                <Col xs='8' sm='8' lg='9'>
                                    <Link to={`/${post.category}/${post.id}`}>{ post.title }</Link>
                                </Col>
                                <Col xs='4' sm='4' lg='3' className='text-right'>
                                    <Button size='sm'>
                                        <MdCreate/>
                                    </Button>
                                    <Button size='sm' className='ml-2'>
                                        <FaTrash/>
                                    </Button>
                                </Col>
                            </Row>
                        </h3>
                        <hr className='m-1'/>
                        <small className='text-muted'>
                            <Row>
                                <Col>
                                    Comments: { this.getComments(post.id).length }
                                </Col>
                                <Col className='text-right'>
                                    Author: { post.author } 
                                </Col>
                            </Row>
                        </small>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col xs='3' lg='1'>
                        <VoteBox 
                            data={post} 
                            onIncrementScore={this.incrementPostScore}
                            onDecrementScore={this.decrementPostScore}
                        />
                    </Col>
                    <Col xs='9' lg='11'>
                        <p className='pt-2'>
                            {post.body}
                        </p>
                    </Col>
                </Row>
                { showComments ? 
                <Row className='mt-5'>
                    <Col lg='12'>
                        { this.getComments(post.id).map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))}
                    </Col>
                </Row>
                : null}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    showComments: state.posts.showComments,
    comments: state.comments
})

export default connect(mapStateToProps)(Post)