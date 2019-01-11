import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'

class PostForm extends Component {
  defaultValues = { name: '', description: '', body: '', date: '' }
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
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    const { name, description, body, date } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            name="name"
            placeholder="Post Name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            name="description"
            placeholder="Short Description"
            value={description}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            name="date"
            placeholder="Date"
            value={date}
            type="date"
            onChange={this.handleChange}
            required          
          />
        </Form.Group>
        <Form.TextArea
          name="body"
          placeholder="Body"
          value={body}
          onChange={this.handleChange}
          required
        />
        <Form.Button type='submit' size='tiny'>Submit</Form.Button>
      </Form>
    )
  }
}

export default PostForm;