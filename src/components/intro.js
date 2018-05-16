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
  BackHandler
} from 'react-native';
import {connect} from 'react-redux'
import {fetchPosts} from '../redux/actions/postActions.js';
import { Actions } from 'react-native-router-flux';
class Intro extends Component {
    constructor(props){
        super(props)
        this.handleBackButton = this.handleBackButton.bind(this)
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      }
      
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
      handleBackButton() {
            return true
      }
  render() {
     
    return (
      
       <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fbfbfb',
        padding: 30
      }}>
        <View style={{flex: 2,justifyContent: 'center'}}>
            <Text style = {{
                fontFamily: "SanFranciscoText-Bold",
                fontSize: 35
            }}>Welcome</Text>
            <Text style = {{
                paddingTop: 10,
                fontFamily: "SanFranciscoText-Bold",
                fontSize: 25
            }}>Login to get the latest news</Text>
        </View>
        <View style={{flex: 1}}>
            <TouchableOpacity 
            onPress= {()=>Actions.signup()}
            style = {{
                backgroundColor: '#333333',
                padding: 18,
                borderRadius: 5
           
            }}>
                <Text style = {{
                    fontFamily: "SanFranciscoText-Bold",
                    fontWeight: '200',
                    color: '#fff',
                    fontSize: 16,
                    textAlign: 'center'
                }}>Create an account</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress = {()=>Actions.login()}
            style = {{
                backgroundColor: '#4971ff',
                padding: 18,
                borderRadius: 5,
                marginTop: 10
            }}>
                <Text style = {{
                    fontFamily: "SanFranciscoText-Bold",
                    fontWeight: '200',
                    color: '#fff',
                    fontSize: 16,
                    textAlign: 'center'
                }}>Login</Text>
            </TouchableOpacity>
        </View>
              {/* <TouchableOpacity onPress= {()=>Actions.signup()}>
                <Text>Create an account</Text>
               
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=>Actions.login()}>
                <Text>Login with email</Text>
            </TouchableOpacity> */}
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


 export default Intro;
