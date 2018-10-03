import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout';

const entry = document.getElementById('react');

console.log(window.__layoutProps);

const jsx = (
  <BrowserRouter>
    <Layout
      post={window.__layoutProps.post}
      posts={window.__layoutProps.posts}
      author={window.__layoutProps.author}
    />
  </BrowserRouter>
);

ReactDOM.hydrate(jsx, entry);
