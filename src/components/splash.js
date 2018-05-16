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
  StatusBar
} from 'react-native';
// import {connect} from 'react-redux'
import {fetchPosts} from '../redux/actions/postActions.js';
import { Actions } from 'react-native-router-flux';
class Splash extends Component {

    componentWillMount(){
        // StatusBar.setHidden(true);
        {
            setTimeout(()=>{
                Actions.intro()
            }, 3000)
        }
    }
  render() {
 
    return (
      
       <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#4971ff',
        justifyContent:'center'
      }}>
      {/* <StatusBar hidden={true} /> */}
        <Image source={require('../../assets/images/news.gif')} />
        </View>
     
      
    
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


 export default Splash;
