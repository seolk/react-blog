import React, { Component } from 'react'
import axios from 'axios'
import { Header, Divider, Button, Grid, Icon, Card, } from 'semantic-ui-react';
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
        <ul key={p.id}>
          <li>
            <Link to={`/blogs/${this.props.match.params.id}/posts/${p.id}`}><h1>{p.name}</h1></Link>
            <h5>
              Post Date:
              <br />
              {p.date}
            </h5>
            <br />
          </li>
        </ul>
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

  // listPosts = () => {
  //   return this.state.posts.map(p => (
  //     <PostPreview key={p.id} {...p} />
  //   ))
  // }

  render() {
    const { blog: { id, title, category }, edit, showForm } = this.state
    return (
      <div>
        <Header style={{'fontSize': '50px'}} textAlign='center'>{title}</Header>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
            <Button onClick={this.toggleEdit} size='tiny' color="black">
              { edit ? 'Cancel' : 'Edit Title' }
            </Button>
            <Button onClick={() => this.handleDelete(id)} color="black" size="tiny">
            Delete
            </Button>
            </Grid.Column>
            <Grid.Column textAlign='center' as='h2'>
              {category}
            </Grid.Column>
          </Grid.Row>
        </Grid>
          {edit ? this.editBlog() : null}
        <Divider />
        <div>
          <Button onClick={this.toggleForm} color='black' size='tiny'>
            { showForm ? 'Cancel' : 'Create New Post'}
          </Button>
          {showForm ? this.postForm() : null }
        </div>
        <br />
        <br />
        <Card.Group>
          { this.listPosts() }
        </Card.Group>
        
      </div>
    )

  }


}
export default Blog;