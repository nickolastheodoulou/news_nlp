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

        <Route exact path="/search" render={(props) =>
          <News {...props}
                navbarTitle={"Your Search"}
                newsType={"everything"}
                q={"Apple"}
                language={"en"}
                country={""}
                category={""}
          />} />

        <Route exact path="/" render={(props) =>
          <News {...props}
                navbarTitle={"US Global News"}
                newsType={"top-headlines"}
                language={"en"}
                country={"us"}
                q={""}
                category={""}
          />} />

        <Route exact path="/finance" render={(props) =>
          <News {...props}
                navbarTitle={"UK business News"}
                newsType={"top-headlines"}
                q={""}
                language={"en"}
                country={"gb"}
                category={"business"}
          />} />

        <Route exact path="/bitcoin" render={(props) =>
          <News {...props}
                navbarTitle={"Bitcoin Articles"}
                newsType={"everything"}
                q={"bitcoin"}
                language={"en"}
                country={""}
                category={""}
          />} />


        <Route exact path="/football" render={(props) =>
          <News {...props}
                navbarTitle={"Football"}
                newsType={"everything"}
                q={"football"}
                language={"en"}
                country={""}
                category={""}
          />} />

        <Route path="/about" exact component={About} />
      </div>
    </Router>
  );
}

export default App;
