import express from 'express';
import path from 'path';
import morgan from 'morgan';
import compression from 'compression';
import contentful, { getAuthorByName, getAllPosts, getPostBySlug } from './contentful';
import render from './ssr';

const app = express();
const port = parseInt(process.env.PORT || 8080, 10);

app.use(morgan('dev'));

app.use(compression());

app.use('/public', express.static(path.join(process.cwd(), 'public')));

app.use('/api/contentful', contentful);

app.get('/', async (req, res) => {
  const posts = await getAllPosts();
  render({ posts }, req, res);
});

app.get('/post/:slug', async (req, res) => {
  const post = await getPostBySlug(req.params.slug);
  render({ post }, req, res);
});

app.get('/author/:name', async (req, res) => {
  const author = await getAuthorByName(req.params.name);
  render({ author }, req, res);
});


app.listen(port, () => console.log(`process listening on ${port}`));
