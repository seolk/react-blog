import React, { Component } from 'react';

class CommentForm extends Component {
  defaultValues = { subject: '', body: ''}
  state = { ...this.defaultValues }

  handleSubmit = (e) => {
    e.preventDefault();
    const post = { ...this.state }
    this.props.submit(post)
    this.setState({ ...this.defaultValues })
  }

  handleChange = (e) => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value })
  }

  render() {
    const { subject, body } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="subject"
          placeholder="subject"
          value={subject}
          onChange={this.handleChange}
          required
        /> <br/>
        <textarea
          name="body"
          placeholder="Body"
          value={body}
          onChange={this.handleChange}
        /> <br/>
        <button>Submit</button>
      </form>
    )
  }
}

export default CommentForm;