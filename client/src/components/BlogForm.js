import React, { Component } from 'react';

class BlogForm extends Component {
  defaultValues = { title: '', category: '' }
  state = { ...this.defaultValues }

  componentDidMount() {
    if (this.props.id) {
      this.setState({...this.blogs})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const blog = { ...this.state }
    this.props.submit(blog)
    this.setState({ ...this.defaultValues })
  }

  handleChange = (e) => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value })
  }

  render() {
    const { title, category } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={category}
          onChange={this.handleChange}
          required
        />
        <button>Submit</button>
      </form>
    )
  }
}

export default BlogForm;