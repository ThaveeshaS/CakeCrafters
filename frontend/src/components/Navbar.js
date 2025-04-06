import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">cakecrafters</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-post">create post</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;