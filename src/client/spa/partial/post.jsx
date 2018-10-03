import React from 'react';
import { Link } from 'react-router-dom';


const Post = fields => (
  <section className="post">
    <div className="post-author">
      <img className="post-author__image" src={`${fields.author.fields.image.fields.file.url}?w=200&h=200&fm=jpg&fl=progressive&q=80`} alt={fields.author.fields.name} />
      <h3 className="post-author__name">{fields.author.fields.name}</h3>
    </div>
    <div className="post-meta">
      <Link to={`/post/${fields.slug}`} className="post-meta__title">
        <h1>{fields.title}</h1>
      </Link>
      <span className="post-meta__reading_time">{(fields.readingTime)}</span>
    </div>
    <article className="post-body" dangerouslySetInnerHTML={{ __html: fields.body }} />
  </section>
);

export default Post;
