import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const NavBar = () => (
  <Menu inverted>
    <Menu.Item name='home'>
      <NavLink exact to='/'>Home</NavLink>
    </Menu.Item>
    <Menu.Item name='bog'>
      <NavLink exact to='/blogs'>Blogs</NavLink>
    </Menu.Item>
  </Menu>
)

export default NavBar;