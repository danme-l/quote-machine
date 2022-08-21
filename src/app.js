import React from 'react';
import './style.css';
import { SiTwitter } from 'react-icons/si'
const axios = require('axios').default;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quote:'Dan is great',
      author:'Abraham Lincoln, probably'
    };
    this.refreshQuote = this.refreshQuote.bind(this);
    this.getQuote = this.getQuote.bind(this);
  }
  
  getQuote() {
      let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

      axios.get(url)
         .then(res => {
            let data = res.data.quotes
            let quoteNum = Math.floor(Math.random() * data.length)
            let randomQuote = data[quoteNum]
            this.setState({
               quote: randomQuote['quote'],
               author: randomQuote['author']
            })
         })
   }
  
  refreshQuote() {
    this.getQuote()
  }
  
  render() {
    return (
      <div id='wrapper'>
        <h1>Dan's Random Quote Machine</h1>
        <div id="quote-box">
          <div id="buttons">
            <a href={`https://twitter.com/intent/tweet?text= "${this.state.quote}" - ${this.state.author}`} target="_blank" rel="noreferrer" title="Post this quote on twitter!" id='tweet-quote'>
            <SiTwitter class="icon"/>
         </a>
            <button id="new-quote" onClick={this.refreshQuote}> New Quote!</button>           
          </div>
          <QuoteCard quote={this.state.quote} author={this.state.author} id='quoteCard'/>
        </div>
      </div>
    );
  }
}

class QuoteCard extends React.Component {
  render() {
    return (
      <div> 
        <p id="text">{this.props.quote}</p>
        <p id="author"> - {this.props.author}</p>
      </div>    
    )
  }
} 

export default App