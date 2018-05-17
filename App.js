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
  WebView,
  Image,
  BackAndroid
} from 'react-native';
import {Actions, Scene, Router, NavBar} from 'react-native-router-flux';
import {Provider, connect} from 'react-redux';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from "react-native-fcm";
import store from './src/redux/store.js'
// import Posts from './components/Posts'
import Posts from './src/components/Posts.js'
import Register from './src/components/Register.js'
import webviewlin from './src/components/webview'
import newsList from './src/components/newslist'
import Intro from './src/components/intro'
import Login from './src/components/login'
import Signup from './src/components/signup'
import Category from './src/components/category'
import {firebaseRef} from './src/services/Firebase.js'
import Toast from 'react-native-simple-toast';
import category from './src/components/category';
import Splash from './src/components/splash';
const thisClass = this; 
export default class App extends Component{
  // componentDidMount() {
  //   FCM.requestPermissions();

  //   FCM.getFCMToken().then(token => {
  //     console.log("TOKEN (getFCMToken)", token);
  //   });
  //   FCM.getInitialNotification().then(notif => {
  //     console.log("INITIAL NOTIFICATION", notif)
  //   });
  //   this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
  //     console.log("Notification", notif);
  //     if(notif.local_notification){
  //       return;
  //     }
  //     if(notif.opened_from_tray){
  //       return;
  //     }

  //     if(Platform.OS ==='ios'){
  //             //optional
  //             //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
  //             //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
  //             //notif._notificationType is available for iOS platfrom
  //             switch(notif._notificationType){
  //               case NotificationType.Remote:
  //                 notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
  //                 break;
  //               case NotificationType.NotificationResponse:
  //                 notif.finish();
  //                 break;
  //               case NotificationType.WillPresent:
  //                 notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
  //                 break;
  //             }
  //           }
  //     this.showLocalNotification(notif);
  //   });

  //   this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
  //     console.log("TOKEN (refreshUnsubscribe)", token);
  //   });
  // }
  // showLocalNotification(notif) {
  //   FCM.presentLocalNotification({
  //     title: notif.title,
  //     body: notif.body,
  //     priority: "high",
  //     click_action: notif.click_action,
  //     show_in_foreground: true,
  //     local: true,
  //     wake_screen: true,
  //     show_in_foreground : true
  //   });
  // }

  // componentWillUnmount() {
  //   this.notificationListner.remove();
  //   this.refreshTokenListener.remove();
  // }
  constructor(props){
    super(props)
    this.state = {
      signdisable : false
    }
    this._signout = this._signout.bind(this)
    // this.onBackFunction = this.onBackFunction.bind(this)
  }
  
  _signout(){
 
    // console.log("signout called")
    firebaseRef.auth().signOut().then(function(user) {
      // Sign-out successful

      Actions.intro({signdetect: 'true'})
      this.setState({
        signdisable: true
      })
     
    
      // console.log(user)
      Toast.show("Successfull signed out")
    }).catch(function(error) {
      // An error happened.
    });
    console.log("disablstate",this.state.signdisable)
  }

  // onBackFunction(){
  //   if(Actions.login()){ß
  //     console.log("trrro",true)
  //   }
  //   else{
  //     console.log(false)
  //   }
  // }
  render() {
    // console.log("signoutinitial",this.state.signdisable)
    const scenes = Actions.create(
      <Scene key="root">
       {/* <Scene  navigationBarStyle={{backgroundColor: '#fff', borderWidth: 0, borderColor: '#fff',}} key="splash" component={Splash}  hideNavBar={true}/> */}
        <Scene navigationBarStyle={{backgroundColor: '#fff', borderWidth: 0, borderColor: '#fff',}} key="intro" component={Intro} title = "Welcome" renderBackButton={()=><View/>}  gesturesEnabled= {false} initial/>
        <Scene navigationBarStyle={{backgroundColor: '#fff', borderWidth: 0, borderColor: '#fff',}} key="login" component={Login} title = "Login"  backTitle = "Back" renderBackButton={()=>this.state.signdisable?<View/>:null}/>
        <Scene navigationBarStyle={{backgroundColor: '#fff', borderWidth: 0, borderColor: '#fff',}} key="signup" component={Signup} title = "Sign up" backTitle = "Back" />
        <Scene navigationBarStyle={{backgroundColor: '#fff', borderWidth: 0, borderColor: '#fff',}} key="newsList" component={newsList} rightTitle = {"SomeIconComponent"}  title = "News Channels"  rightTitle='Sign out' onRight={this._signout} renderBackButton={()=><View/>}/>
        {/* <Scene navigationBarStyle={{backgroundColor: '#fff', borderWidth: 0, borderColor: '#fff',}} key="category" component={Category} rightTitle = {"SomeIconComponent"}  title = "News Channels" renderBackButton={()=><View/>} rightTitle='Sign out' onRight={this._signout}/> */}
        <Scene navigationBarStyle={{backgroundColor: '#fff', borderWidth: 0, borderColor: '#fff',}} key="Posts" component={Posts} backTitle = "Back" title = "Trending" backTitle = "Back" onRight={this._signout} rightTitle='Sign out' onRight={this._signout}/>
        <Scene navigationBarStyle={{backgroundColor: '#fff', borderWidth: 0, borderColor: '#fff',}} key="register" component={Register} title="News" backTitle = "Back" rightTitle='Sign out' onRight={this._signout}/>
        <Scene navigationBarStyle={{backgroundColor: '#fff', borderWidth: 0, borderColor: '#fff',}} key="webviewlink" component={webviewlin} backTitle = "Back" rightTitle='Sign out' onRight={this._signout}/>
      
        {/* <Scene key="home" component={Home}/> */}
      </Scene>
    );
    return (
      <Provider store = {store}>
           <Router  scenes={scenes}/>
           
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
