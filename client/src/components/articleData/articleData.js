import React, {useEffect, useState } from 'react';
import axios from '../../axios'

const ArticleData = (props) => {

  const [articles, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(1)
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // the [pageNumber] means useEffect will run only when the state pageNumber is updated
  useEffect(() => {
    axios.get(`/getnews?newsType=${props.newsType}&language=${props.language}&country=${props.country}&q=${props.q}&category=${props.category}&pageNumber=${pageNumber}`, {
        dataType: 'jsonp'}
        )
      .then(
        response => {
          setIsLoaded(true);
          setItems(response.data.articles);
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



  function incrementPageNumber() {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
    window.scrollTo(0, 0)
  }

  function decrementPageNumber() {
    setPageNumber(prevPageNumber => prevPageNumber - 1)
    window.scrollTo(0, 0)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
    <div>
      <ul className="divlist">
          {articles.map((item, id) => (
            <div key={id} className="article">
              <h3>{item.title}</h3>
              Source: <a href={item.url}>{item.source.name}</a>
              <br></br>
              Author: {item.author}
              <br></br>
              <a href={item.url}>
                <img src={item.urlToImage} alt="Logo" />
              </a>
            </div>
          ))}
          <br></br>
        </ul>

        <div className="pageChange">
          <button onClick={decrementPageNumber}>Previous page</button>
          <span>You are on page {pageNumber}</span>
          <button onClick={incrementPageNumber}>Next page</button>
        </div>
        <br></br>
        <br></br>
    </div>
  )
}
}
export default ArticleData;