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
                    <Col lg='1'>
                        <VoteBox data={comment}/>
                    </Col>
                    <Col lg='11'>
                        <CardText>{comment.body}</CardText>
                    </Col>
                    </Row>
                </CardBlock>
            </Card>
        )
    }
}

export default Comment