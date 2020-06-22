import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar/navbar.component";
import About from "./components/about/about.component";
import News from './components/newslist/news.list.component'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />

        <Route exact path="/" render={(props) =>
          <News {...props}
                navbarTitle={"US Global News"}
                newsType={"top-headlines"}
                language={"en"}
                country={"us"}
                pageSize={"10"}
                searchKeywordQuery={""}
                category={""}
          />} />

        <Route exact path="/finance" render={(props) =>
          <News {...props}
                navbarTitle={"UK business News"}
                newsType={"top-headlines"}
                searchKeywordQuery={""}
                language={"en"}
                country={"gb"}
                pageSize={"10"}
                category={"business"}
          />} />

        <Route exact path="/bitcoin" render={(props) =>
          <News {...props}
                navbarTitle={"Bitcoin Articles"}
                newsType={"everything"}
                searchKeywordQuery={"bitcoin"}
                language={"en"}
                country={""}
                pageSize={"10"}
                pageNumber={"1"}
                category={""}
          />} />

        <Route path="/about" exact component={About} />
      </div>
    </Router>
  );
}

export default App;
