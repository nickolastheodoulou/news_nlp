import React, { Component } from 'react';
const apikeyFile = require('../core/data/apikey')

function NewsList() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [articles, setItems] = React.useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  React.useEffect(() => {
    fetch("http://newsapi.org/v2/everything?q=bitcoin&from=2020-05-16&sortBy=publishedAt&apiKey=" + apikeyFile.newsApiKey)
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
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Bitcoin Articles</h1>
        <ul>
          {articles.map(item => (
            <li key={item.author}>
              {item.source.name}
              <br></br>
              {item.author}
              <br></br>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default NewsList;