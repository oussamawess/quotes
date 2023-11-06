import React, { useState, useEffect } from 'react';
import './App.css';
import MyIcons from './components/MyIcons'
import {FaTwitter, FaTumblr, FaQuoteLeft, FaQuoteRight, FaPlusCircle, FaPenNib} from 'react-icons/fa'


let colorIndex = 0;

function changeColor() {
    const colors = ['#428bca', '#FF5733', '#C70039', '#FF9130', '#900C3F'];
    const newColor = colors[colorIndex];
    colorIndex = (colorIndex + 1 ) % colors.length;
    document.documentElement.style.setProperty('--main-color', newColor);
}

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const getNewQuote = async () => {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    setQuote(data.content);
    setAuthor(data.author);
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <div>  
      <div id="wrapper"> 
      
        <div id="quote-box">
        <div id="text"><FaQuoteLeft/> {quote} <FaQuoteRight/></div>
        <div id="author"><FaPenNib/> {author}</div>
        <button id="new-quote" onClick={() =>{getNewQuote();changeColor();}}><FaPlusCircle /> New Quote</button>
        
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote} - ${author}`)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <FaTwitter alt="twitter"/> */}
        <MyIcons color="white"/>
        </a>
        <a href="https://timbler.com" id="tumbler-quote"><FaTumblr alt="tumblr"/></a>  
        </div>
      </div> 
    </div>
  );
}

export default App;