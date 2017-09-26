import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories, fetchPostsByCategory } from './actions'
import { Container, Row, Col, ListGroup, ListGroupItem, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Posts from './components/Posts'
import PostDetail from './components/PostDetail'
import PostForm from './components/PostForm'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
  }

  handleClickCategory = category => {
    const { dispatch } = this.props
    dispatch(fetchPostsByCategory(category))
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        
        <Navbar color='faded' light toggleable>
          <NavbarBrand href='/'>Readable</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/posts/add">Create Post</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        
        <Container className='mt-5'>
          <Row>
            <Col xs='12' sm='12' lg='3' className='mb-5'>
              <aside>
                <ListGroup>
                  <ListGroupItem tag='a' href='/' action>All</ListGroupItem>
                  { categories.map(category => (
                    <ListGroupItem key={ category } tag='a' href={`/${category}`} action onClick={e => this.handleClickCategory(category)}>
                          {category}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </aside>
            </Col>
            <Col xs='12' sm='12' lg='9' className='mb-5'>
              <main>
                <Switch>
                  <Route exact path='/' component={Posts}/>
                  <Route exact path='/posts/add' component={PostForm}/>
                  <Route exact path='/:category/:postId/edit' component={PostForm}/>
                  <Route exact path='/:category' component={Posts}/>
                  {/* <Route exact path='/:category/:postId' render={({match}) => (
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
                  )}/> */}
                  <Route exact path='/:category/:postId' component={PostDetail}/>
                </Switch>
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