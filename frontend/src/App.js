import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, fetchPostsByCategory } from './actions'
import Posts from './components/Posts'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      posts: []
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
    dispatch(fetchPosts())
  }

  handleClickCategory = category => {
    this.props.dispatch(fetchPostsByCategory(category))
  }

  render() {
    const { categories, posts } = this.props
    return (
      <div>
        <Route exact path="/" render={() => (
            <Posts 
              posts={ posts }
              onClickCategory={ this.handleClickCategory }
            />
        )}/>

        <ul>
          { categories.map(category => (
            <li key={ category }>
              <button onClick={ e => this.handleClickCategory(category) }>
                { category }
              </button>
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