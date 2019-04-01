import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location }) => {
  const pathname = location.pathname;
  const links = ['/home', '/users', '/topRanked', '/create'];
  return (
    <nav className="nav">
      <a className="navBar-brand mb-0 h1">ACME</a>

      <ul className="nav">
        {links.map(link => (
          <li className="nav-item" key={link}>
            <Link
              to={link}
              className={`nav-link${link === pathname ? ' active' : ''}`}
            >
              {link.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
