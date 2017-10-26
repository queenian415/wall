import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Posts from './Posts';
import Form from './Form';

const originPosts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

const url = "http://localhost:5000/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: '',
      postTitle: '',
      postContent: '',
      posts: originPosts
    }

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
  }

  hello() {
    fetch(url)
      .then((response) => response.text())
      .then((text) => { 
        this.setState({
          welcome: text
        });
      });
  }

  componentDidMount() {
    this.hello();
  }

  handleFormInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handlePostSubmit(title, content) {
    const id = this.state.posts.length + 1;
    const post = {
      id: id,
      title: title,
      content: content
    };
    originPosts.push(post);

    this.setState({
      postTitle: '',
      postContent: '',
      posts: originPosts
    }, () => {console.log("this.state.posts" + this.state.posts);});
  }

  render() {
    const h = <h1>{this.state.welcome}</h1>;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {h}
        <Form postTitle={this.state.postTitle} 
              postContent={this.state.postContent}
              onInputChange={this.handleFormInputChange} 
              onSubmit={this.handlePostSubmit} />
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
