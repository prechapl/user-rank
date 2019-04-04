import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ location, userCount }) => {
  const pathname = location.pathname;
  const links = ['/home', '/users', '/ranked', '/create'];
  console.log('props in Nav ', userCount);
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
              {link === '/users' ? (
                <span className="badge badge-pill badge-light">
                  {userCount}
                </span>
              ) : (
                ''
              )}
              {link.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
