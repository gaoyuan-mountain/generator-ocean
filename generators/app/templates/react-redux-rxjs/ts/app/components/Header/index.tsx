import * as React from 'react';
import cx from 'classnames';
import { login } from '../../actions/index';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  dispatch;
}

class Header extends React.Component<HeaderProps, {}> {
  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    return (
      <header className="app-header">
        <div className="app-container">
          <ul className="app-header-menu">
            <li>
              <NavLink
                  to="/"
                  className="app-header-link"
                  activeClassName="is-active"
                  exact
              >
                  Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/private"
                className="app__header__link"
                activeClassName="is-active"
              >
                Private
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
