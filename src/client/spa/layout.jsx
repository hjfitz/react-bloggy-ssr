import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Post, Author, Home } from './Pages';


const Layout = props => (
  <Switch>
    <Route exact path="/post/:slug" render={() => <Post post={props.post} />} />
    <Route exact path="/author/:name" render={() => <Author author={props.author} />} />
    <Route exact path="/" render={() => <Home posts={props.posts} />} />
  </Switch>
);

export default Layout;
