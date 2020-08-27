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
                ticker={""}
          />} />

        <Route exact path="/usbusiness" render={(props) =>
          <News {...props}
                navbarTitle={"US business News"}
                newsType={"top-headlines"}
                q={""}
                language={"en"}
                country={"us"}
                category={"business"}
                ticker={""}
          />} />

        <Route exact path="/bitcoin" render={(props) =>
          <News {...props}
                navbarTitle={"Bitcoin"}
                newsType={"everything"}
                q={"\"bitcoin\""}
                language={"en"}
                country={""}
                category={""}
                ticker={"BTCUSDT"}
                assetType={'crypocurrency'}
          />} />


        <Route exact path="/ethereum" render={(props) =>
          <News {...props}
                navbarTitle={"Ethereum"}
                newsType={"everything"}
                q={"ethereum"}
                language={"en"}
                country={""}
                category={""}
                ticker={"ETHUSDT"}
                assetType={'crypocurrency'}
          />} />

        <Route exact path="/litecoin" render={(props) =>
          <News {...props}
                navbarTitle={"Litecoin"}
                newsType={"everything"}
                q={"litecoin"}
                language={"en"}
                country={""}
                category={""}
                ticker={"LTCUSDT"}
                assetType={'crypocurrency'}
          />} />

        <Route exact path="/apple" render={(props) =>
          <News {...props}
                navbarTitle={"Apple"}
                newsType={"everything"}
                q={"apple"}
                language={"en"}
                country={""}
                category={""}
                ticker={""}
          />} />

        <Route path="/about" exact component={About} />
      </div>
    </Router>
  );
}

export default App;
