import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {


  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">

            <li className="navbar-item">
              <Link to="/" className="navbar-brand">Home</Link>
            </li>

            <li className="navbar-item">
              <Link to="/finance" className="navbar-brand">Finance</Link>
            </li>

            <li className="navbar-item">
              <Link to="/bitcoin" className="navbar-brand">Bitcoin</Link>
            </li>

            <li className="navbar-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>

          </ul>
        </div>
      </nav>
    );
  }
}