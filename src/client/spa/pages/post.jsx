import React from 'react';
import { Post } from '../Partial';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    if (props.post) this.state = { post: props.post };
    else this.state = {};
  }

  componentDidMount() {
    if (this.state.post) return;
    const toCall = `/api/contentful${window.location.pathname}`;
    fetch(toCall)
      .then(r => r.json())
      .then(post => this.setState({ post }));
  }

  render() {
    if (this.state.post) return <Post {...this.state.post} />;
    return <h1>Loading</h1>;
  }
}

export default PostPage;
