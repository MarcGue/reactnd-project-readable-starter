import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories, fetchPostsByCategory } from './actions'
import Posts from './components/Posts'

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
        <Route path="/category/:category" render={({match}) => (
          <div>
            <Posts 
              category={match.params.category}
            />
          </div>
        )}/>

        <ul>
          { categories.map(category => (
            <li key={ category }>
              <Link to={'/category/' + category} onClick={e => this.handleClickCategory(category)}>
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