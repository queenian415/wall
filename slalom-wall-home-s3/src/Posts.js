import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TitleArea extends Component {
    render() {
        return <h3>{this.props.title}</h3>;
    }
}

class ContentArea extends Component {
    render() {
        return <p>{this.props.content}</p>;
    }
}

class Post extends Component {
    render() {
        const post = this.props.post;

        return(
            <div key={post.id}>
                <TitleArea title={post.title} />
                <ContentArea content={post.content} />
            </div>
        );
    }
}

class Posts extends Component {
    render() {
        const posts = this.props.posts;

        return (
            <div>
                {posts.map((post) => <Post key={post.id} post={post} />)}
            </div>
        );
    };
}

Posts.propTypes = {
    posts: PropTypes.array
}

export default Posts;