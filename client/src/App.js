import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar/navbar";
import About from "./components/about/about";
import News from './components/newslist/newsList'
import Marketpairs from "./components/marketpairs/Marketpairs"
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
