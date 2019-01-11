// import React, { Component } from 'react'
// import axios from 'axios';
// import CommentForm from './CommentForm'

// class Comments extends Components

//   componentDidMount() {
//     axios.get('/api/blogs')
//       .then(res => {
//         this.setState({ blogs: res.data })
//     })
//   }

//   componentDidMount() {
//     axios.get('/api/blogs')
//       .then(res => {
//         this.setState({ blogs: res.data })
//     })
//   }

//   submit = (blog) => {
//     axios.post('/api/blogs', { blog })
//       .then(res => {
//         this.setState({ blogs: [...this.state.blogs, res.data]})
//     })
//   }

//   deleteComment = (id) => {
//     axios.delete(`/api/blogs/${id}`)
//       .then(res => {
//         });   
//     return  (
//     window.location.href = "/blogs"
//     )
//   }

//   editComment = (id, e) => {
//     return (
//       <div>
//       <CommentForm {...this.state.blog} editSubmit={this.editSubmit}/>
//       </div>
//     )
//   }

//   listComments = () => {
//     return this.state.blogs.map(b => {
          
//       return (
//         <ul key={b.id}>
//           <li>
//             <Link to={`/blogs/${b.id}`}>{b.title}</Link>
//           </li>
//         </ul>
//       )
//     })
//   }

//   render() {
//     return(
//       <div>
//         {this.listBlogs()}
//         <h2>Add Blogs</h2>
//         <BlogForm submit={this.submit} /> 
//       </div>
//     )
//   }
// }

//   export const getApps = () => {
//     return (dispatch) => {
//       axios.get('/api/apps')
//         .then( res => dispatch({ type: APPS, apps: res.data}))
//     }
//   }

// export const addApp = (app) => {
//   return (dispatch) => {
//     axios.post('/api/apps', { app })
//       .then( res => dispatch({ type: ADD_APP, app: res.data}))
//   }
// }

// export const updateApp = (app) => {
//   return (dispatch) => {
//     axios.put(`/api/apps/${app.id}`, { app })
//     .then( res => dispatch({type: UPDATE_APP, app: res.data}))
//   }
// }

// export const deleteApp = (id) => {
//   return (dispatch) => {
//     axios.delete(`/api/apps/${id}`)
//       .then( res => dispatch({ type: DELETE_APP, id }))
//   }
// }

// export default (state = [], action) => {
//   switch(action.type) {
//     case APPS:
//       return action.apps
//     case ADD_APP:
//       return [action.app, ...state]
//     case UPDATE_APP:
//       return state.map( a => {
//         if(a.id === action.id)
//           return action.app
//         return a
//       })
//     case DELETE_APP:
//       return state.filter( a => a.id !== action.id)
//     default:
//       return state;
//   }
// }