import React, { Component } from 'react';
import axios from 'axios';
import BlogForm from './BlogForm';
import { Header, Segment, Button, Card } from 'semantic-ui-react';

class Blogs extends Component {
  state = { blogs: [], showForm: false };

  componentDidMount() {
    axios.get('/api/blogs')
      .then(res => {
        this.setState({ blogs: res.data })
    })
  }

  toggleForm = () => {
    this.setState( state => {
      return { showForm: !state.showForm }
    })
  }

  blogForm = () => {
    return <BlogForm submit={this.submit} />
  }

  submit = (blog) => {
    axios.post(`/api/blogs`, { blog })
      .then(res => {
        this.setState({ blogs: [res.data, ...this.state.blogs], showForm: false})
    })
  }

  listBlogs = () => {
    return this.state.blogs.map(b => {   
      return (
        <Card 
          key={b.id}
          href={`/blogs/${b.id}`}
          header={b.title}
          meta={b.category}
      />
      )
    })
  }

  render() {
    const {showForm} = this.state;
    return (
      <div style={{margin: '15px'}}>
        <Segment style={{textAlign:'center'}} inverted>
          <Header as="h1">Blogs</Header>
          <Button inverted size='tiny' onClick={this.toggleForm} >
            { showForm ? 'Cancel' :'Create New Blog'}
          </Button>
          { showForm ? this.blogForm() : '' }
        </Segment>
        <br />
        <br />
        <Card.Group>
          {this.listBlogs()}
        </Card.Group>
      </div>
    )
  }
}


export default Blogs;