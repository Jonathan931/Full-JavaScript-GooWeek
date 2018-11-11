import React, {Component} from 'react';
import twitterLogo from '../twitter.svg'; 
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';
import './Timeline.css';


export default class Timeline extends Component{
  
  state = {
    tweets: [],
    newTweet: ''
  }
  
  render(){
    return (
      <div className='timeline-wrapper'>
        <img src={twitterLogo} height={24} alt="GoTwitter" />
        <form>
          <textarea 
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            placeholder="O que está acontecendo?"
            onKeyDown={this.handleNewTweet}
          />
        </form>
        <ul className="tweet-list">
          { this.state.tweets.map( tweet => 
              <Tweet key={tweet._id} tweet={tweet}  /> 
          )}
        </ul>
      </div>
    )
  }

  async componentDidMount(){
    this.subsribeToEvents();
    const response = await api.get('tweets');
    this.setState({
      tweets: response.data
    })
  }

  handleInputChange = (e) =>{
    this.setState({
      newTweet: e.target.value
    })
  }

  handleNewTweet = async (e) =>{
    if (e.keyCode !== 13)return;
    const content  = this.state.newTweet;
    const author = localStorage.getItem("@GoTwitter:username");
    await api.post('tweet', { content, author });
    this.setState({
      newTweet: ' '
    });
  }

  subsribeToEvents = () =>{
    const io = socket('http://localhost:3000');

    io.on('tweet', data =>{
      this.setState({
        tweets: [data, ...this.state.tweets] 
      })
    })

    io.on('like', data =>{
      this.setState({
        tweets: this.state.tweets.map( tweet => tweet._id === data._id ? data : tweet )
      })
    });
  }
}