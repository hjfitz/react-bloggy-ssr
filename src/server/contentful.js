import express from 'express';
import * as contentful from 'contentful';
import marked from 'marked';

const cfClient = contentful.createClient({
  space: process.env.CF_SPACE,
  accessToken: process.env.CF_ACCESS,
});

const cfAPI = express.Router();

const calculateReadTime = body => `Estimated reading time: ${(body.length / 220).toFixed()} minutes`;

const removeHeaders = text => text.split('\n').filter(line => line.indexOf('#') !== 0).join('\n');

export const getPostBySlug = slug => cfClient.getEntries({
  content_type: 'blogPost',
  'fields.slug': slug,
  include: 3,
  limit: 1,
}).then(resp => resp.items[0])
  .then((post) => {
    const { fields } = post;
    fields.readingTime = calculateReadTime(fields.body);
    fields.body = marked(fields.body);
    return fields;
  });

export const getAuthorByName = name => cfClient.getEntries({
  content_type: 'author',
  'fields.name': name,
  include: 2,
  limit: 1,
}).then(resp => resp.items[0]);

export const getAllPosts = () => cfClient
  .getEntries({
    content_type: 'blogPost', include: 3, limit: 5, order: 'fields.publishDate',
  })
  .then(r => r.items.map((item) => {
    const { fields, sys } = item;
    fields.id = sys.id;
    fields.readingTime = calculateReadTime(fields.body);
    fields.body = `${marked(removeHeaders(fields.body)).substring(0, 497)}...`;
    return fields;
  }));


cfAPI.get('/post/:slug', async (req, res) => {
  const post = await getPostBySlug(req.params.slug);
  res.json(post || {});
});

cfAPI.get('/author/:name', async (req, res) => {
  const author = await getAuthorByName(req.params.name);
  res.json(author || {});
});

cfAPI.get('/', async (_, res) => {
  const items = await getAllPosts();
  res.json(items);
});

export default cfAPI;
