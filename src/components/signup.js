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
     this._register = this._register.bind(this)
 }
 _register(){
   if(this.state.password == this.state.verifypassword){
    firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(function(response){
      console.log(response)
      Toast.show("successfully Registered")
      Actions.newsList()
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      console.log(errorCode)
      if(errorCode == "auth/weak-password"){
        Toast.show("Week password password should be more then 6 characters");
      }
      
      if(errorCode == 'auth/email-already-in-use'){
        Toast.show(errorMessage);
        // alert(errorMessage)
      }
      // ...
    });
 
   }
   else{
    Toast.show("Password did not match")
   }

 }
  render() {
     
    return (
      // <ScrollView>
      //      <TextInput
      //   value = {this.state.email}
      //   onChangeText={(text)=>this.setState({email: text})}
      //   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        
      // />
      //  <TextInput
      //  value = {this.state.password}
      //  onChangeText={(text)=>this.setState({password: text})}
      //   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        
      // />
      //   <TextInput
      //  value = {this.state.verifypassword}
      //  onChangeText={(text)=>this.setState({verifypassword: text})}
      //   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        
      // />
      // <TouchableOpacity onPress = {this._register}>
      //     <Text>Sign in</Text>
      // </TouchableOpacity>
      // </ScrollView>
      <ScrollView style = {{
        flex: 1,
        backgroundColor: '#fbfbfb',
      }}>
      <View style = {{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fbfbfb',
        padding: 25
    }}>
    
        <View style = {{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
        }}>
        <Text style = {{
            paddingTop: 10,
            fontFamily: "SanFranciscoText-Bold",
            fontSize: 35,
        }}>Sign up with email</Text>
        <Text 
       
        style = {{
            color: '#565656',
            marginTop: 40,
            fontFamily: "SanFranciscoText-Light",
            fontSize: 16
        }}>Email</Text>
          <TextInput
        //    onEndEditing = {this._login}
          underlineColorAndroid='transparent' 
          value = {this.state.email}
          onChangeText={(text)=>this.setState({email: text})}
        style={{color: '#484848', borderLeftWidth: 0,fontFamily: "SanFranciscoText-Light",paddingBottom: 5, borderTopWidth: 0,height: 40,alignSelf: 'stretch',borderColor: '#dde0e6', borderWidth: 1, borderRightWidth: 0}}
    
   />
    <Text secureTextEntry={true} style = {{
            color: '#565656',
            marginTop: 15,
            fontFamily: "SanFranciscoText-Light",
            fontSize: 16
        }}>Password</Text>
          <TextInput
          underlineColorAndroid='transparent' 
            value = {this.state.password}
            onChangeText={(text)=>this.setState({password: text})}
        style={{color: '#484848', borderLeftWidth: 0,fontFamily: "SanFranciscoText-Light",paddingBottom: 5, borderTopWidth: 0,height: 40,alignSelf: 'stretch',borderColor: '#dde0e6', borderWidth: 1, borderRightWidth: 0}}
    
   />
    <Text secureTextEntry={true} style = {{
            color: '#565656',
            marginTop: 15,
            fontFamily: "SanFranciscoText-Light",
            fontSize: 16
        }}>Verify password</Text>
          <TextInput
          underlineColorAndroid='transparent' 
            value = {this.state.verifypassword}
            onChangeText={(text)=>this.setState({verifypassword: text})}
        style={{color: '#484848', borderLeftWidth: 0,fontFamily: "SanFranciscoText-Light",paddingBottom: 5, borderTopWidth: 0,height: 40,alignSelf: 'stretch',borderColor: '#dde0e6', borderWidth: 1, borderRightWidth: 0}}
    
   />
        </View>
        <View style = {{
        flex: 1,
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent: 'flex-start'
    }}>
        <TouchableOpacity 
        disabled={this.state.verifypassword !=="" && this.state.email !== "" && this.state.password !== "" ?false:true}
        onPress = {this._register}
        style = {{
            backgroundColor:  this.state.verifypassword !=="" && this.state.email !== "" && this.state.password !== "" ? '#4971ff': '#c6cbd5',
            padding: 18,
            borderRadius: 5,
            flex: 1,
            marginTop: 20
            // alignItems:'flex-start'
        }}>
            <Text style = {{
                fontFamily: "SanFranciscoText-Bold",
                fontWeight: '200',
                color: this.state.verifypassword !=="" && this.state.email !== "" && this.state.password !== "" ? '#fff': '#000',
                fontSize: 16,
                textAlign: 'center',
                justifyContent: 'center'
            }}>Sign up</Text>
        </TouchableOpacity>
    </View>
    {/* <TouchableOpacity onPress = {this._forgot}>
        
        <Text>Forgot password</Text>
        
        </TouchableOpacity> */}
         {/* <Modal isVisible={true}>
      <View style={{ flex: 1 }}>
        <Text>I am the modal content!</Text>
      </View>
        </Modal> */}
    </View>
    </ScrollView>
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


 export default Signup;
