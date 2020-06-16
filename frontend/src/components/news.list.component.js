import React, { Component } from 'react';
import NewsData from '../../src/core/data/overview.json'

var articleIndex = 0
class NewsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleUrl: NewsData.articles[articleIndex].url,
      articleSource: NewsData.articles[articleIndex].source.name,
      articleAuthor: NewsData.articles[articleIndex].author,
      articleDescription: NewsData.articles[articleIndex].description,
      articlePublishedTimestamp: NewsData.articles[articleIndex].publishedAt,
    };
  }




  render() {
    return (
      <div>
        <h1>NICKS BITCOIN ARTICLES</h1>
        <h3>Article Number {this.state.articleIndex}</h3>
        <h2>{this.state.articleDescription}</h2>
        <h3>Article Source: {this.state.articleSource}</h3>
        <h3>
          <a href={this.state.articleUrl}>Original Article URL</a>
        </h3>
        <h3>Article Author: {this.state.articleAuthor}</h3>
        <h3>Article Published at: {this.state.articlePublishedTimestamp}</h3>

      </div>
    )
  }
}

export default NewsList;