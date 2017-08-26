import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { incrementPostScore, decrementPostScore } from '../actions'
import { Container, Row, Col, Button } from 'reactstrap';
import VoteBox from './VoteBox'
import Comment from './Comment'

class Post extends Component {

    incrementPostScore = (post) => {
        const { dispatch } = this.props
        dispatch(incrementPostScore(post))
    }

    decrementPostStore = (post) => {
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
            <div className='container'>
                <Row>
                    <Col lg='12'>
                        <h3 className=''>
                            <Row>
                                <Col lg='9'>
                                    <Link to={`/${post.category}/${post.id}`}>{ post.title }</Link>
                                </Col>
                                <Col lg='3'>
                                    <Button>Edit</Button>
                                    <Button className='ml-2'>Delete</Button>
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
                    <Col lg='1'>
                        <VoteBox 
                            data={post} 
                            onIncrementScore={this.incrementPostScore}
                            onDecrementStore={this.decrementPostStore}
                        />
                    </Col>
                    <Col lg='11'>
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
            </div>
        )
    }
}

const mapStateToProps = state => ({
    showComments: state.posts.showComments,
    comments: state.comments
})

export default connect(mapStateToProps)(Post)