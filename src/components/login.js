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
  TextInput,
  AsyncStorage,
  BackHandler,
  Alert,
  Navigator
} from 'react-native';
import {connect} from 'react-redux'
import {fetchPosts} from '../redux/actions/postActions.js';
import { Actions } from 'react-native-router-flux';
import {firebaseRef} from '../services/Firebase'
import Modal from "react-native-modal";
import Toast from 'react-native-simple-toast';
let email =''
class Login extends Component {
 constructor(props){
     super(props)
     this.state = {
         email: "",
         password: "",
         status: "",
         name : '',
         keydata: '',
         eye: false,
         emptystate : false
     }
     this._login = this._login.bind(this)
     this.changeeye = this.changeeye.bind(this)
     this.handleBackButton = this.handleBackButton.bind(this)
    //  this.resetapp = this.resetapp.bind(this)
    //  this._forgot = this._forgot.bind(this)
 }
 changeeye(){
     this.setState({
        eye : !this.state.eye
     })
     
 }
//  componentWillMount(){
//     StatusBar.setHidden(false);
//  }
 componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  handleBackButton() {
      if(this.props.signdetect == "true"){
        return true;
        console.log("clicked")
        // Alert.alert(
        //     'Exit',
        //     'Do you want to exit the app', [{
        //         text: 'Cancel',
        //         onPress: () => console.log('Cancel Pressed'),
        //         style: 'cancel'
        //     }, {
        //         text: 'OK',
        //         onPress: () => this.resetapp()
               
        //     }, ], {
        //         cancelable: false
        //     }
        //  )
         
      }
      else{
          return false
      }
    //   return true
    //   console.log("popdata",this.props.navigator.pop())
    // this.props.navigation.goBack(null)
      
  }
//   resetapp(){
//     BackHandler.exitApp()
//     Actions.splash({type:'reset'})
//   }
 _login(){
     console.log(this.state.email)
   
     firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(response) {
         console.log("res", response)

         Actions.newsList()
     })
     .catch(function(error) {
        console.log(error)
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        if(errorCode =='auth/user-not-found'){
            Toast.show("User not found")
        }
        if(errorCode =='auth/invalid-email'){
            Toast.show("Not valid email id")
        }
        if(errorCode =='auth/wrong-password'){
            Toast.show("Not valid password")
        }
        // alert("Please enter valid login details")
      });
    //   var user = firebaseRef.auth().currentUser;

    //   user.sendEmailVerification().then(function() {
    //     // Email sent.
    //     console.log("sent")
    //   })
    //   .catch(function(error) {
    //     // An error happened.
    //   });
    //   firebaseRef.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //       // User is signed in.
    //       let displayName = user.displayName;
    //       email = user.email;
    //       let emailVerified = user.emailVerified;
    //       let photoURL = user.photoURL;
    //       let isAnonymous = user.isAnonymous;
    //       let uid = user.uid;
    //       let providerData = user.providerData;
    //       // ...
    //       console.log("dsdsd",email)
      
    //     } else {
    //       // User is signed out.
    //       // ...
    //     }
    //   }
    // );
    AsyncStorage.setItem('my_key', 'my_value', () => {
        this.setState({
            keydata : email
        })
     });
 }
 
 
//  _forgot(){
//     var actionCodeSettings = {
//         url: 'https://newsapp-ef9e0.firebaseapp.com/?email='+this.state.email+'',
//         iOS: {
//           bundleId: 'org.reactjs.native.example.newsapp'
//         },
//         android: {
//           packageName: 'com.newsapp',
//           installApp: true,
//           minimumVersion: '12'
//         },
//         handleCodeInApp: true
//       };
//       firebaseRef.auth().sendPasswordResetEmail(
//         this.state.email, actionCodeSettings)
//         .then(function(response) {
//             console.log("responsegot",response)
//           // Password reset email sent.
//         })
//         .catch(function(error) {
//             console.log("noresonse",error)
//           // Error occurred. Inspect error.code.
//         });
//  }
  render() {
    console.log(this.state.eye)
    console.log("detectsignout", this.props.signdetect)
    // console.log("dsdsdsa", this.state.emptystate)
    // let iconchange = this.state.eye == false ? require('../../assets/images/eye-opens.png') : require('../../assets/images/eye-close.png') 
    return (
    //   <ScrollView>
    //        <TextInput
    //     value = {this.state.email}
    //     onChangeText={(text)=>this.setState({email: text})}
    //     style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        
    //   />
    //    <TextInput
    //    value = {this.state.password}
    //    onChangeText={(text)=>this.setState({password: text})}
    //     style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        
    //   />
    //   <TouchableOpacity onPress = {this._login}>
    //       <Text>Sign in</Text>
    //   </TouchableOpacity>
    //   </ScrollView>
    <ScrollView style = {{
        flex: 1,
        backgroundColor: '#fbfbfb',
    }}>
        <View style = {{
            flexDirection: 'column',
            flex: 2,
            backgroundColor: '#fbfbfb',
            padding: 25
        }}>
        
            <View style = {{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
            }}>
            <View style = {{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                  <Text style = {{
                paddingTop: 80,
                fontFamily: "SanFranciscoText-Bold",
                fontSize: 35,
            }}>Login with email</Text>
            </View>
          
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
            style={{color: '#484848', borderLeftWidth: 0,fontFamily: "SanFranciscoText-Light",paddingBottom: 5, borderTopWidth: 0,height: 40,alignSelf: 'stretch',borderColor: '#dde0e6', borderRightWidth: 0,borderWidth: 1}}
        
       />
        <Text style = {{
                color: '#565656',
                marginTop: 15,
                fontFamily: "SanFranciscoText-Light",
                fontSize: 16
            }}>Password</Text>
        <View style = {{flexDirection: 'row', flex: 1}}>
              <TextInput
              secureTextEntry={this.state.eye==false ? true : false}
              underlineColorAndroid='transparent' 
                value = {this.state.password}
                onChangeText={(text)=>this.setState({password: text})}
            style={{flex: 6,color: '#484848', borderLeftWidth: 0,fontFamily: "SanFranciscoText-Light",paddingBottom: 5, borderTopWidth: 0,height: 40,alignSelf: 'stretch',borderColor: '#dde0e6', borderRightWidth: 0,  borderWidth: 1}}
       />
       <TouchableOpacity 
       disabled= {this.state.password !== ''? false: true}
       onPress = {this.changeeye}
       style = {{flex: 0.5, justifyContent: 'flex-start', alignItems: 'flex-end'}}>
       {
           this.state.eye == true? <Image style = {{opacity: this.state.password !== ""? 0.8: 0.3}} source={require('../../assets/images/eye-opens.png')}/> : <Image style = {{opacity: this.state.password !== ""? 0.8: 0.3}} source={require('../../assets/images/eye-close.png')}/> 
       }
      
       </TouchableOpacity>
       </View>
            </View>
            <View style = {{
            flex: 1,
            flexDirection: 'row',
            alignItems:'flex-start',
            justifyContent: 'flex-start'
        }}>
            <TouchableOpacity 
            disabled={this.state.email !== "" && this.state.password !== "" ?false:true}
            onPress = {this._login}
            style = {{
                backgroundColor:  this.state.email !== "" && this.state.password !== "" ? '#4971ff': '#c6cbd5',
                padding: 18,
                borderRadius: 5,
                flex: 1,
                marginTop: 20
                // alignItems:'flex-start'
            }}>
                <Text style = {{
                    fontFamily: "SanFranciscoText-Bold",
                    fontWeight: '200',
                    color: this.state.email !== "" && this.state.password !== "" ? '#fff': '#393939',
                    fontSize: 16,
                    textAlign: 'center',
                    justifyContent: 'center'
                }}>Login</Text>
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


 export default Login;
