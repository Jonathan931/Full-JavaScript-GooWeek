import React, {Component} from 'react';
import like from '../like.svg';
import api from '../services/api';
import './Tweet.css';

export default class Tweet extends Component{
  render(){
    const { tweet } = this.props;
    return (
      <li className='tweet'>
        <strong>{tweet.author}</strong>
        <p>{tweet.content}</p>
        <button type="button" onClick={this.handleClick}>
          <img src={like} alt="Like" />
          {tweet.likes}
        </button>
      </li>
    )
  }

  handleClick = async () =>{
    const { _id } = this.props.tweet;
    await api.get(`likes/${_id}`);
  }
}