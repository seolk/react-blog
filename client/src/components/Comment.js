import React, { Component } from 'react'
import axios from 'axios'
import { Card } from 'semantic-ui-react';

class Comment extends Component {
  state = { comment: {} }
  

  componentDidMount() {
    const url = this.props.match.url;
    axios.get(`/api/${url}`)
      .then(res => {
        this.setState({ comment: res.data })
      })
  }


  showComment = () => {
    const { comment: {subject, body} }  = this.state

    return (
      <Card>
        <Card.Content>
          <h1>{subject}</h1>
        </Card.Content>
        <Card.Content>
          <p>{body}</p>
        </Card.Content>
      </Card>
    )
  }

  render() {
    // const { edit } = this.state
    return (
      <div>
        {this.showComment()}
      </div>
    )
  }

}

export default Comment;