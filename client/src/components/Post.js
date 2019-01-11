import React, { Component } from 'react'
import axios from 'axios'
// import CommentForm from './CommentForm'
import { Link } from 'react-router-dom';
import { Header, Button, Divider, Segment, Container } from 'semantic-ui-react';
import PostForm from './PostForm';

class Post extends Component {
  state = { blog: {}, post: {}, showForm: false }
  
  componentDidMount() {
    const { blog_id, id } = this.props.match.params;
    axios.get(`/api/blogs/${blog_id}/posts/${id}`)
    .then(res => {
      this.setState({ post: res.data })
  })
    axios.get(`/api/blogs/${blog_id}`)
      .then(res => {
        this.setState({ blog: res.data })
    })
  }

  submit = (post) => {
    const { blog_id, id } = this.props.match.params;
    axios.put(`/api/blogs/${blog_id}/posts/${id}`, { post })
      .then(res => {
        this.setState({ post: res.data, edit: false })
      })
  }

  deletePost = (blog_id, id) => {
    const remove = window.confirm("Delete post?")
    if (remove)
      axios.delete(`/api/blogs/${blog_id}/posts/${id}`)
        .then( res => 
          this.props.history.push(`/blogs/${blog_id}`)
      )
  }

  toggleEdit = () => {
    this.setState(state => {
      return { edit: !this.state.edit}
    })
  }
  // displayComments = () => {
  //   const url = this.props.match.url;
  //   return this.state.comments.map(r => {
  //     return (
  //       <List divided relaxed key={r.id}>
  //         <List.Item>
  //           <List.Content>
  //             <List.Header>
  //               <Link to={`${url}/comments/${r.id}`}>{r.subject}</Link>
  //             </List.Header>
  //             <List.Discription>
  //               <p>{r.body}</p>
  //               </List.Discription>
  //               </List.Content>
  //               </List.Item>>
  //               </List>
  //     )
  //   })
  // }

  editPost = () => {
    return <PostForm {...this.state.post} submit={this.submit}/>
  }

  toggleForm = () => {
    this.setState(state => {
      return { showForm: !state.showForm }
    })
  }

  // showPost = () => {
  //   const { name, description, body, date }  = this.state
  //     return (
  //       <div>
  //       <h1>{name}</h1>
  //       <h1>{description}</h1>
  //     <h3>{body}</h3>
  //     <h3>Date: {date}</h3>
  //     <br />
  //     {/* <h2>Comments</h2> */}
  //     {/* {this.displayComments()}
  //     <h2>Leave a comment</h2>
  //     <CommentForm submit={this.submit} /> */}
  //     </div>
  //   )
  // }

  render() {
    const { post: {name, description, body, date, blog_id, id}, edit } = this.state
    return (
      <div style={{margin: '15px'}}>
        <Segment style={{textAlign: 'center'}} inverted>
          <Header>
            <Header.Content as='h1'>{name}</Header.Content>
          </Header>
            <Button inverted onClick={this.toggleEdit} size='tiny' color="black">
              { edit ? 'Cancel' : 'Edit Post' }
            </Button>
            <Button content='Delete' icon='trash alternate' inverted onClick={() => this.deletePost(blog_id, id)} size='tiny' color='black' />
              {edit ? this.editPost() : null }
            </Segment>
            <Divider />
            <Segment>
            <Container fluid>
              Description: {description}
              <Divider />
              {body}
              <Divider />
              Date of entry: {date}
            </Container>
            </Segment>
        <Button as={Link} to={`/blogs/`} color="black" size="tiny">
          Return to blogs
        </Button>
        <br />
        <br />
        <br />
      </div>
    )
  }


}

export default Post;