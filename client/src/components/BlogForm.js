import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react'

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
      <Segment inverted>
        <Form inverted onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              name="title"
              placeholder="Blog Title"
              value={title}
              onChange={this.handleChange}
              required
            />
            <Form.Input
              name="category"
              placeholder="Blog Category"
              value={category}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Button inverted type='submit' size='tiny'>Submit</Form.Button>
        </Form>
      </Segment>
    )
  }
}

export default BlogForm;