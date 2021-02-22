import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Navbar from "../Navbar/Navbar";
import About from "../../Containers/App/App";
import Dashboard from '../Dashboard/Dashboard'
import articleData from "../../data/newsObject";


function App() {

  return (
    <Router>
      <div className="container">
        <Navbar />
        <div>
          {
            articleData.articles.map((item, id) => {
              return (
                <Route key={id} exact path={item.path} render={(props) =>
                  <Dashboard {...props}
                        navbarTitle={item.navbarTitle}
                        newsType={item.newsType}
                        q={item.q}
                        language={item.language}
                        country={item.country}
                        category={item.category}
                        ticker={item.ticker}
                        tickerSource={item.tickerSource}
                        assetType={item.assetType}
                        symbol={item.symbol}
                  />}/>
              )
            })
          }
        </div>
        <Route path="/about" exact component={About} />
      </div>
    </Router>
  );
}

export default App;
