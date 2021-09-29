import React, { useContext, useState } from 'react';
import { Menu, Search, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import { ThemeContext } from '../context/theme';
import { ThemeColorConstant } from './constant';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const { setThemeColor } = useContext(ThemeContext);
  const pathname = window.location.pathname;

  const handleSelectDarkTheme = () => {
    setThemeColor(ThemeColorConstant.DARK);
  }
  const handleSelectLightTheme = () => {
    setThemeColor(ThemeColorConstant.LIGHT);
  }

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Menu position="left">
        <Menu.Item as={Link} to="/" className="logo-item">
          <div className="logo-container">
            <span>MEET</span>
          </div>
        </Menu.Item>
      </Menu.Menu>
      {/* <Menu.Item name={user.username} active as={Link} to="/" /> */}
      <Search />
      <Menu.Menu className="theme-control-button" position="left">
        <Button.Group>
          <Button secondary onClick={handleSelectDarkTheme}>Dark</Button>
          <Button.Or color="orange"/>
          <Button positive onClick={handleSelectLightTheme} color="yellow">Light</Button>
        </Button.Group>
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Menu position="left">
          <div className="logo-container">
            <span>MEET</span>
          </div>
        </Menu.Menu>
        <Search placeholder='Search...' />
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          {'  '}
          <Menu.Item
            name="register"
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    );

  return menuBar;
}

export default MenuBar;
