import React, { Component } from 'react';

class PostForm extends Component {
  defaultValues = { name: '', body: '', description: '', date: '' }
  state = { ...this.defaultValues }

  componentDidMount() {
    if (this.props.id) {
      this.setState({...this.props})
    }
  }

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
    const { name, description, body, date } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={name}
          onChange={this.handleChange}
          required
        /> <br/>
        <input
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
        /> <br/>
        <textarea
          name="body"
          placeholder="Body"
          type="text"
          value={body}
          onChange={this.handleChange}
        /> <br/>
        <input
          name="date"
          placeholder="mm/dd/yyyy"
          value={date}
          type="date"
          onChange={this.handleChange}
        /> 
        
        <button>Submit</button>
      </form>
    )
  }
}

export default PostForm;