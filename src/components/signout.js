/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import {connect} from 'react-redux'
import {fetchPosts} from '../redux/actions/postActions.js';
import { Actions } from 'react-native-router-flux';
import {firebaseRef} from '../services/Firebase'
import Toast from 'react-native-simple-toast';
class Signup extends Component {
 constructor(props){
     super(props)
     this.state = {
         email: "",
         password: "",
         verifypassword : "",
         status: ""
     }
 }
  render() {
     
    return (
      <View></Vie
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


 export default Signout;
