import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import NavBar from './components/NavBar';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import Post from './components/Post';
// import Comment from './components/Comment';

const App = () => (
  <Fragment>
    <NavBar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/blogs/' component={Blogs} />
      <Route exact path='/blogs/:id' component={Blog} />
      <Route exact path='/blogs/:blog_id/posts/:id' component={Post} />
      {/* <Route exact path='/blogs/:blog_id/posts/:post_id/comments/:id' component={Comment} /> */}
      <Route component={NoMatch} />
    </Switch>
  </Fragment>
)

export default App;

