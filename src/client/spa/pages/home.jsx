import React from 'react';
import { Post } from '../Partial';

const renderPage = posts => posts.map(post => <Post {...post} key={post.id} />);

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    if (props.posts) this.state = { posts: props.posts };
    else this.state = {};
  }

  componentDidMount() {
    if (this.props.posts) return;
    fetch('/api/contentful/')
      .then(r => r.json())
      .then(newPosts => this.setState({ posts: newPosts }));
  }

  render() {
    if (this.state.posts) return renderPage(this.state.posts);
    return <h1>Loading</h1>;
  }
}

export default Home;
