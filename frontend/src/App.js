import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories, fetchPostsByCategory } from './actions'
import { ListGroup, ListGroupItem, Navbar, NavbarBrand } from 'reactstrap';
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
        <div className='container-fluid'>
          <div className='row'>
            <aside className='col-3'>
              <ListGroup>
                <ListGroupItem tag='a' href='/'>All</ListGroupItem>
                { categories.map(category => (
                  <ListGroupItem key={ category } tag='a' href={`/category/${category}`} onClick={e => this.handleClickCategory(category)}>
                        {category}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </aside>

            <main className='col-9'>
              <Route exact path='/' render={() => (
                <Posts />
              )}/>
              <Route exact path='/category/:category' render={({match}) => (
                <div>
                  <Posts 
                    category={match.params.category}
                  />
                </div>
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

            
          </div>
        </div>
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