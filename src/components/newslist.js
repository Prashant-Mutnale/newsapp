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
  AsyncStorage,
  BackHandler
} from 'react-native';
import {connect} from 'react-redux'
import {fetchPosts} from '../redux/actions/postActions.js';
import { Actions, route} from 'react-native-router-flux';
import {firebaseRef} from '../services/Firebase'
class newsList extends Component {
    constructor(props){
        super(props)
        // this.props.fetchPosts()
        this.state = {
            datalist : "",
            newdaata: '',
            prevPath: ''
        }
        // this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
        this.handleBackButton = this.handleBackButton.bind(this)
        // this.getData = this.getData.bind(this)
    }

    componentWillUnmount() {
      console.log('unMount');
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentDidMount() {
      console.log('Mount');
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton() {
      // if(this.props.datachange == "idchange"){
      //   console.log("entered")
      // BackHandler.exitApp()
       console.log("stateaction",Actions.state.index)
      return true
      // if(Actions.state.index==3){
      //   BackHandler.exitApp()
      // }
    }
    // code for toast
    // if(this.state.initialstate === 1){
    //   console.log("foundinitialstates",this.state.initialstate)
    //   BackHandler.exitApp()
    // }
    // else{
    //   Toast.show("please tap to close")
    //   console.log("foundinitial",this.state.initialstate)
    //   this.setState({
    //     initialstate : 1
    //   })
    //   return true
    // }
      // code for toast
    // else{
    //   BackHandler.exitApp()
    //   return false
    // }
  //  componentWillMount() {
  //     var user = firebaseRef.auth().currentUser;

  //     user.sendEmailVerification().then(function() {
  //       // Email sent.
  //       console.log("sent")
  //     })
  //     .catch(function(error) {
  //       // An error happened.
  //     });
      //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }
  
  // componentWillUnmount() {
  //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }
    getlist(id){
        this.props.fetchPosts(id)
        Actions.Posts({sendid: id})
        // Actions.category({newsitem: id})
    }
    // handleBackButtonClick = () => {
      // this.props.navigation.goBack(Actions.refresh())
      
      // console.log("routerdata", )
      // if(route.key === 'login'){
      //   console.log("yesback")
      // }
      // else{
      //   console.log("noback")
      // }
      // if (this.isSelectionModeEnabled()) {
      //   this.disableSelectionMode();
      //   return true;
      // } else {
      //   return false;
      // }
    // };
  render() {
    // console.log("initialsstata",this.state.prevPatch)
    //  console.log("datafoundcat", this.props.newsids)
    console.log("newslistback", this.props.datachange)
    return (
        <ScrollView>
      <View style={styles.container}>
          <TouchableOpacity 
          onPress = {()=>{this.getlist('nbc-news')}}
          style = {{
              flex: 1,
            //   backgroundColor: 'red',
              flexDirection:'row',
              borderBottomWidth: 0.2,
              borderBottomColor: "#efefef"
          }}>
          <View>
            <Image
            style = {{width: 80, height: 80}}
            source={require('../../assets/images/cbc.png')}
            />
          </View>
            <View style = {{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'center'
            }}>
            <Text style = {{
                  fontFamily: "SanFranciscoText-Bold",
                  textAlign: 'left',
                  fontSize: 20,
                  justifyContent: 'center'
              }}>CBC</Text>
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress = {()=>{this.getlist('the-washington-post')}}
          style = {{
              flex: 1,
              marginTop: 10,
            //   backgroundColor: 'red',
              flexDirection:'row',
              borderBottomWidth: 0.2,
              borderBottomColor: "#efefef"
          }}>
          <View>
            <Image
            style = {{width: 80, height: 80}}
            source={{uri: 'https://www.washingtonpost.com/apple-touch-icon-precomposed.png'}}
            />
          </View>
            <View style = {{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'center'
            }}>
            <Text style = {{
                  fontFamily: "SanFranciscoText-Bold",
                  textAlign: 'left',
                  fontSize: 20,
                  justifyContent: 'flex-start'
              }}>The Washington Post</Text>
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress = {()=>{this.getlist('the-next-web')}}
          style = {{
              flex: 1,
              marginTop: 10,
            //   backgroundColor: 'red',
              flexDirection:'row',
              borderBottomWidth: 0.2,
              borderBottomColor: "#efefef"
          }}>
          <View>
            <Image
            style = {{width: 80, height: 80}}
            source={{uri: 'https://cdn0.tnwcdn.com/wp-content/themes/cyberdelia/assets/icons/apple-touch-icon-120x120.png?v=1525769425'}}
            />
          </View>
            <View style = {{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'center'
            }}>
            <Text style = {{
                  fontFamily: "SanFranciscoText-Bold",
                  textAlign: 'left',
                  fontSize: 20,
                  justifyContent: 'flex-start'
              }}>The Next</Text>
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress = {()=>{this.getlist('espn')}}
          style = {{
              flex: 1,
              marginTop: 10,
            //   backgroundColor: 'red',
              flexDirection:'row',
              borderBottomWidth: 0.2,
              borderBottomColor: "#efefef"
          }}>
          <View>
            <Image
            style = {{width: 80, height: 80}}
            source={require('../../assets/images//espn-icon.png')}
            />
          </View>
            <View style = {{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'center'
            }}>
            <Text style = {{
                  fontFamily: "SanFranciscoText-Bold",
                  textAlign: 'left',
                  fontSize: 20,
                  justifyContent: 'flex-start'
              }}>ESPN</Text>
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress = {()=>{this.getlist('the-wall-street-journal')}}
          style = {{
              flex: 1,
              marginTop: 10,
            //   backgroundColor: 'red',
              flexDirection:'row',
              borderBottomWidth: 0.2,
              borderBottomColor: "#efefef"
          }}>
          <View>
            <Image
            style = {{width: 80, height: 80}}
            source={{uri: 'https://s.wsj.net/media/wsj_apple-touch-icon-120x120.png'}}
            />
          </View>
            <View style = {{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'center'
            }}>
            <Text style = {{
                  fontFamily: "SanFranciscoText-Bold",
                  textAlign: 'left',
                  fontSize: 20,
                  justifyContent: 'flex-start'
              }}>The Wall Street Journal</Text>
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress = {()=>{this.getlist('the-verge')}}
          style = {{
              flex: 1,
              marginTop: 10,
            //   backgroundColor: 'red',
              flexDirection:'row',
              borderBottomWidth: 0.2,
              borderBottomColor: "#efefef"
          }}>
          <View>
            <Image
            style = {{width: 80, height: 80}}
            source={{uri: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/7395359/ios-icon.0.png'}}
            />
          </View>
            <View style = {{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'center'
            }}>
            <Text style = {{
                  fontFamily: "SanFranciscoText-Bold",
                  textAlign: 'left',
                  fontSize: 20,
                  justifyContent: 'flex-start'
              }}>The Verge</Text>
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress = {()=>{this.getlist('the-new-york-times')}}
          style = {{
              flex: 1,
              marginTop: 10,
            //   backgroundColor: 'red',
              flexDirection:'row',
              borderBottomWidth: 0.2,
              borderBottomColor: "#efefef"
          }}>
          <View>
            <Image
            style = {{width: 80, height: 80}}
            source={{uri: 'https://mobile.nytimes.com/vi-assets/static-assets/apple-touch-icon-319373aaf4524d94d38aa599c56b8655.png'}}
            />
          </View>
            <View style = {{
                flex: 1,
                marginLeft: 10,
                justifyContent: 'center'
            }}>
            <Text style = {{
                  fontFamily: "SanFranciscoText-Bold",
                  textAlign: 'left',
                  fontSize: 20,
                  justifyContent: 'flex-start'
              }}>The New York Times</Text>
              
            </View>
          </TouchableOpacity>
      
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

function mapStateToProps(state) {
    // console.log(state.posts.items)
        return{
            postdata : state.posts.items
        }
        

    // else {
    //     return {};
    //     }
    
  
    // console.log(state)
 }
 export default connect(mapStateToProps, {fetchPosts})(newsList);
