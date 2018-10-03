import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

import template from './template';
import Layout from '../client/spa/layout';


const render = (props, req, res) => {
  const page = template(
    renderToString(
      <StaticRouter context={{}} location={req.url}>
        {React.createElement(Layout, props)}
      </StaticRouter>,
    ), props,
  );
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(page);
};

export default render;
