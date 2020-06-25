import React from 'react';
import './news.list.component.css'
const apikeyFile = require('../../core/data/apikey')


function HomeNewsList(props) {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [articles, setItems] = React.useState([]);

  const [pageNumber, setPageNumber] = React.useState(1)

  function incrementPageNumber() {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
  }

  function decrementPageNumber() {
    setPageNumber(prevPageNumber => prevPageNumber - 1)
  }

  // the [pageNumber] means useEffect will run only when the state pageNumber is updated
  React.useEffect(() => {
    fetch(`http://localhost:5000/getnews?newsType=${props.newsType}&language=${props.language}&country=${props.country}&q=${props.q}&category=${props.category}&pageNumber=${pageNumber}`, {
      dataType: 'jsonp'}
  )
      .then(res => res.json())
      .then(
        (res) => {
          setIsLoaded(true);
          setItems(res.articles);
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>


        <h1>{props.navbarTitle}</h1>

        <ul>
          {articles.map(item => (
            <div style={
              {border: '2px solid black',
                margin: '10px 0',
              }
            }>
              <ul>
                <h3>{item.title}</h3>
                Source: <a href={item.url}>{item.source.name}</a>
                <br></br>
                Author: {item.author}
                <br></br>
                <img src={item.urlToImage} alt="Logo" />;
                <br></br>
                <br></br>
                <br></br>
                <br></br>

              </ul>
            </div>
          ))}
          <br></br>
        </ul>

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <button onClick={decrementPageNumber}>Previous page</button>
          <span>You are on page {pageNumber}</span>
          <button onClick={incrementPageNumber}>Next page</button>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default HomeNewsList;