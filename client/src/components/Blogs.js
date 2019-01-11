import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogForm from './BlogForm';
import { List, Header, Segment, Button, Card } from 'semantic-ui-react';


class Blogs extends Component {
  state = { blogs: [], showForm: false };

  componentDidMount() {
    axios.get('/api/blogs')
      .then(res => {
        this.setState({ blogs: res.data })
    })
  }

  toggleForm = () => {
    this.setState( state => {
      return { showForm: !state.showForm }
    })
  }

  form = () => {
    return <BlogForm submit={this.submit} />
  }

  submit = (blog) => {
    axios.post(`/api/blogs`, { blog })
      .then(res => {
        this.setState({ blogs: [res.data, ...this.state.blogs], showForm: false})
    })
  }

  listBlogs = () => {
    return this.state.blogs.map(b => {   
      return (
        <List key={b.id}>
          <List.Item>
            <List.Icon name='right trangle' />
            <List.Content>
              <List.Header>
                <Link to={`/blogs/${b.id}`}>{b.category}</Link>
              </List.Header>
              <p>{b.title}</p>
            <List.Content extra>
              <Button
                as={Link}
                to={`/blogs/${b.id}`}
                color='black'
                size='mini'
              >
                View Blog
              </Button>
            </List.Content>
            </List.Content>
          </List.Item>
        </List>
      )
    })
  }

  render() {
    const {showForm} = this.state;
    return (
      <div style={{margin: '15px'}}>
        <Segment style={{textAlign:'center'}} inverted>
            <Header as="h1">Blogs</Header>
        </Segment>
          <Button color='black' size='tiny' onClick={this.toggleForm} >
            { showForm ? 'Cancel' :'Create New Blog'}
          </Button>
          { showForm ? this.form() : '' }
          <br />
          <br />
          <Card.Group columns="four">
            {this.listBlogs()}
          </Card.Group>
      </div>
    )
  }

}


export default Blogs;