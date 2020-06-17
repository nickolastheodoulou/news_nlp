import React from 'react';
import './news.list.component.css'
const apikeyFile = require('../../core/data/apikey')


function HomeNewsList(props) {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [articles, setItems] = React.useState([]);

  const [pageNumber, setPageNumber] = React.useState(1)

  const today = new Date();
  const dateToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  function incrementPageNumber() {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
  }

  function decrementPageNumber() {
    setPageNumber(prevPageNumber => prevPageNumber - 1)
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  React.useEffect(() => {
    fetch("https://newsapi.org/v2/"+props.newsType+"?q="+props.searchKeywordQuery+"&language="+props.language+"&country="+props.country+"&pageSize="+props.pageSize+"&page="+pageNumber+"&category="+props.category+"&from="+dateToday+"&sortBy=publishedAt&apiKey="+apikeyFile.newsApiKey)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.articles);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [pageNumber])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (

      <div>
        <h1>{props.navbarTitle}</h1>
        <ul>
          {articles.map(item => (
            <li key={item.author}>
              <h3>{item.title}</h3>
              Source: <a href={item.url}>{item.source.name}</a>
              <br></br>
              Author: {item.author}
              <img src={item.urlToImage} alt="Logo" />;
              <br></br>
              <br></br>
              <br></br>
              <br></br>

            </li>
          ))}
        </ul>

        <button onClick={decrementPageNumber}>Previous page</button>
        <span>You are on page {pageNumber}</span>
        <button onClick={incrementPageNumber}>Next page</button>
        <br></br>
        <br></br>

      </div>
    );
  }
}

export default HomeNewsList;