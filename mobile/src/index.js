import React, {Component} from 'react';
import {View} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Routes from './routes';

export default class App extends Component {
  render() {
    return (
      <Routes />
    );
  }
}
