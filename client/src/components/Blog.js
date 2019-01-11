import React, { Component } from 'react'
import axios from 'axios'
import { Header, Divider, Button, Card, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import PostForm from './PostForm';
import BlogForm from './BlogForm';

class Blog extends Component {
  state = { blog: {}, posts: [], edit: false }

  componentDidMount() {
    axios.get(`/api/blogs/${this.props.match.params.id}/posts`)
    .then(res => {
      this.setState({ posts: res.data })
    });
    axios.get(`/api/blogs/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ blog: res.data })
      })
  }

  listPosts = () => {
    return this.state.posts.map(p => {
      return (
        <Card.Group key={p.id} style={{margin: '15px'}}>
          <Card>
            <Card.Content>
              <Card.Header as='h2'>
                <Link to={`/blogs/${this.props.match.params.id}/posts/${p.id}`}>
                  {p.name}
                </Link>
              </Card.Header>
              <Card.Meta>
                {p.description}
              </Card.Meta>
            </Card.Content>
            <Card.Content>
              {p.body}
            </Card.Content>
            <Card.Content extra as='h5'>
              Date of post: {p.date}
            </Card.Content>
          </Card>
        </Card.Group>
      )
    })
  }

  deleteBlog = (id) => {
    const remove = window.confirm("Delete blog?")
    if (remove)
      axios.delete(`/api/blogs/${id}`)
        .then(res =>  this.props.history.push('/blogs'))
  }

  toggleEdit = () => {
    this.setState( state => {
      return { edit: !this.state.edit}
    })
  }

  editBlog = () => {
    return (
      <div>
        <BlogForm {...this.state.blog} submit={this.submitBlog} />
      </div>
    )
  }

  submitPost = (post) => {
    axios.post(`/api/blogs/${this.props.match.params.id}/posts/`, { post })
      .then(res => {
        this.setState({ posts: [res.data, ...this.state.posts], showForm: false})
      })
  }

  submitBlog = (blog) => {
    axios.put(`/api/blogs/${this.props.match.params.id}`, { blog })
      .then(res => {
        this.setState({ blog: res.data, edit: false })
      })
  }

  toggleForm = () => {
    this.setState(state => {
      return { showForm: !state.showForm }
    })
  }

  postForm = () => {
    return <PostForm submit={this.submitPost} />
  }

  render() {
    const { blog: { id, title, category }, edit, showForm } = this.state
    return (
      <div style={{margin: '15px'}}>
        <Segment style={{textAlign:'center'}} inverted>
          <Header>
            <Header.Content as='h1'>{title}</Header.Content>
            <Header.Content as='h3'>>{category}</Header.Content>
          </Header>
          <Button inverted onClick={this.toggleEdit} size='tiny' color="black">
            { edit ? 'Cancel' : 'Edit' }
          </Button>
          <Button content='Delete' icon='trash alternate' inverted onClick={() => this.deleteBlog(id)} color="black" size="tiny" />
          {edit ? this.editBlog() : null }
        </Segment>
        <Divider />
          <Button onClick={this.toggleForm} color='black' size='tiny'>
            { showForm ? 'Cancel' : 'Create New Post'}
          </Button>
          {showForm ? this.postForm() : null }
        <Divider />
        <br />
        <br />
        <Card.Group>
          {this.listPosts()}
        </Card.Group>
      </div>
    )

  }


}
export default Blog;