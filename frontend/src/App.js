import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories, fetchPostsByCategory } from './actions'
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
        <Route exact path='/' render={() => (
          <Posts />
        )}/>
        <Route exact path="/category/:category" render={({match}) => (
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

        <ul>
          <li>
            <Link to='/'>All</Link>
          </li>
          { categories.map(category => (
            <li key={ category }>
              <Link to={`/category/${category}`} onClick={e => this.handleClickCategory(category)}>
                  {category}
              </Link>
            </li>
          ))}
        </ul>
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