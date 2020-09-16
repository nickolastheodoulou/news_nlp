import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar/navbar.component";
import About from "./components/about/about.component";
import News from './components/newslist/news.list.component'
import Test from './components/test/test.component'

import articleData from "./data/articleData";


function App() {

  return (
    <Router>
      <div className="container">
        <Navbar />
        <div>
          {
            articleData.articles.map((item) => {
              return (
                <Route exact path={item.path} render={(props) =>
                  <News {...props}
                        navbarTitle={item.navbarTitle}
                        newsType={item.newsType}
                        q={item.q}
                        language={item.language}
                        country={item.country}
                        category={item.category}
                        ticker={item.ticker}
                        tickerSource={item.tickerSource}
                        assetType={item.assetType}
                  />}/>
              )
            })
          }
        </div>


        <Route path="/about" exact component={About} />
        <Route path="/test" exact component={Test} />

      </div>
    </Router>
  );
}

export default App;
