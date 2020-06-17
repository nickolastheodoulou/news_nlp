import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import CryptoNewsList from "./components/cryptonewslist/crypto.news.list.component";
import Navbar from "./components/navbar/navbar.component";
import About from "./components/about/about.component";
import Home from './components/home/home.news.list.component'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/crypto" exact component={CryptoNewsList} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

export default App;
