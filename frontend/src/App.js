import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import NewsList from "./components/newslist/news.list.component";
import Navbar from "./components/navbar/navbar.component";
import About from "./components/about/about.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={NewsList} />
        <Route path="/about" component={About} />

      </div>
    </Router>
  );
}

export default App;
