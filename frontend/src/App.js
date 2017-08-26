import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories, fetchPostsByCategory } from './actions'
import { Container, Row, Col, ListGroup, ListGroupItem, Navbar, NavbarBrand } from 'reactstrap';
import Posts from './components/Posts'
import PostDetail from './components/PostDetail'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
  }

  handleClickCategory = category => {
    this.props.dispatch(fetchPostsByCategory(category))
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        
        <Navbar color='faded' light toggleable>
          <NavbarBrand href='/'>Readable</NavbarBrand>
        </Navbar>
        
        <Container className='mt-5'>
          <Row>
            <Col sm='12' lg='3' className='mb-5'>
              <aside>
                <ListGroup>
                  <ListGroupItem tag='a' href='/'>All</ListGroupItem>
                  { categories.map(category => (
                    <ListGroupItem key={ category } tag='a' href={`/category/${category}`} onClick={e => this.handleClickCategory(category)}>
                          {category}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </aside>
            </Col>
            <Col sm='12' lg='9' className='mb-5'>
              <main>
                <Route exact path='/' render={() => (
                  <Posts />
                )}/>
                <Route exact path='/category/:category' render={({match}) => (
                    <Posts category={match.params.category} />
                )}/>
                <Route exact path='/:category/:postId' render={({match}) => (
                  <div>
                    { 
                      match.params.category !== 'category' ? 
                      <PostDetail 
                        category={match.params.category}
                        postId={match.params.postId}
                      />
                      :null
                    }
                  </div>
                )}/>
              </main>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

const mapStateToProps = state => {
  const { categories, posts } = state
  return {
    categories: categories.items,
    posts: posts.items
  } 
}

export default withRouter(connect(mapStateToProps)(App))