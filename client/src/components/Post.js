import React, { Component } from 'react'
import axios from 'axios'
// import CommentForm from './CommentForm'
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import PostForm from './PostForm';

class Post extends Component {
  state = { post: {}, comments: [] }
  
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

  submit = (comment) => {
    const url = this.props.match.url;
    axios.put(`/api/${url}/comments/${this.props.match.params.id}`, { comment })
      .then(res => {
        this.setState({ comments: [res.data] })
      })
  }

  deletePost = (id) => {
    const remove = window.confirm("Delete post?")
    if (remove)
      axios.delete(`/api/blogs/${this.props.match.params.id}/posts/${id}`)
        .then(res => 
          this.props.history.push(`/blogs/${this.props.match.params.id}`
        )
      )
  }

  toggleEdit = () => {
    this.setState( state => {
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

  // edit = () => {
  //   return <CommentForm  {...this.state.comment}  submit={this.submit}/>
  // }


  showPost = () => {
    const { name, description, body, date }  = this.state
    return (
      <div>
      <h1>{name}</h1>
      <h1>{description}</h1>
      <h3>{body}</h3>
      <h3>Date: {date}</h3>
      <br />
      <h2>Comments</h2>
      {this.displayComments()}
      <h2>Leave a comment</h2>
      <CommentForm submit={this.submit} />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.showPost()}
      </div>
    )
  }

}

export default Post;