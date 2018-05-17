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
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux'
import {fetchPosts} from '../redux/actions/postActions.js';
import { Actions } from 'react-native-router-flux';
import {firebaseRef} from '../services/Firebase'
import Toast from 'react-native-simple-toast';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";
let mobiletoken = ""
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
 
 componentDidMount(){
  FCM.requestPermissions();

  FCM.getFCMToken().then(token => {
    console.log("TOKEN (getFCMToken)", token);
    mobiletoken = token
    console.log("mobilegot",mobiletoken)
  });
  FCM.getInitialNotification().then(notif => {
    console.log("INITIAL NOTIFICATION", notif)
  });
  this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
    console.log("Notification", notif);
    if(notif.local_notification){
      return;
    }
    if(notif.opened_from_tray){
      return;
    }

    if(Platform.OS ==='ios'){
            //optional
            //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
            //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
            //notif._notificationType is available for iOS platfrom
            switch(notif._notificationType){
              case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
              case NotificationType.NotificationResponse:
                notif.finish();
                break;
              case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                break;
            }
          }
    this.showLocalNotification(notif);
  });

  this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
    console.log("TOKEN (refreshUnsubscribe)", token);
  });
 }
 showLocalNotification(notif) {
  FCM.presentLocalNotification({
    title: notif.title,
    body: notif.body,
    priority: "high",
    click_action: notif.click_action,
    show_in_foreground: true,
    local: true,
    wake_screen: true,
    show_in_foreground : true
  });
}
componentWillUnmount() {
  this.notificationListner.remove();
  this.refreshTokenListener.remove();
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}
 _register(){
   if(this.state.password == this.state.verifypassword){
    firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(function(response){
      console.log(response)
      Toast.show("successfully Registered")
      Actions.newsList()
      fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AIzaSyCyFR32KamcpbxE7_91TbAZ-PBf3pdIYCM'
        },
        body: JSON.stringify({
            "to": mobiletoken,
            "data": {
                "custom_notification": {
                "body": "News",
                "title": "Thanks for signing up",
                "color":"#00ACD4",
                "priority":"high",
                "group": "GROUP",
                "sound": "default",
                "id": "id",
                "show_in_foreground": true
                }
            }
        })
    })
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
