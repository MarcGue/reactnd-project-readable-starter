import React, { Component } from 'react'
import { Row, Col, Card, CardBlock, CardText, CardHeader } from 'reactstrap';
import VoteBox from './VoteBox'

class Comment extends Component {
    render() {
        const { comment } = this.props
        
        return (
            <Card className='mb-2'>
                <CardHeader>Author: {comment.author}</CardHeader>
                <CardBlock>
                    <Row>
                        <Col xs='3' sm='2' lg='1'>
                            <VoteBox data={comment}/>
                        </Col>
                        <Col xs='9' sm='10' lg='11'>
                            <CardText>{comment.body}</CardText>
                        </Col>
                    </Row>
                </CardBlock>
            </Card>
        )
    }
}

export default Comment