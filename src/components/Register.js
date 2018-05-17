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
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import {connect} from 'react-redux'
import {fetchPosts} from '../redux/actions/postActions.js';
import { Actions } from 'react-native-router-flux';
let innerdata
class Register extends Component {
    // componentWillMount(){
    //     this.props.fetchPosts()
    // }
    // componentWillMount(){
    //     BackHandler.addEventListener('hardwareBackPress', function() {
    //         Actions.Posts()
    //       });
    // }
  render() {
      console.log("routeddata",this.props.iddata)
      innerdata = this.props.iddata
      const datafomat = innerdata.publishedAt
      const formateed = new Date(datafomat)
     let formatedlist = formateed.toString().split(" ")
     console.log(formatedlist)
     let month = formatedlist[1]
     let day = formatedlist[2]
     let year = formatedlist[3]

    //   console.log(formateed.split("-"))
      
    //   console.log("imagedata",innerdata.urlToImage)
    return (
        <ScrollView style = {{
            backgroundColor: '#fff'
        }}>
      <View style={styles.container}>
            <View style = {{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: '#fff'
            }}>
            <Image
                resizeMode="cover"
                style={{ flexShrink: 1, flex: 1, width: null,  height: 220}}
                source={{uri: innerdata.urlToImage}}
            />
            </View>
            <View style = {{
                flex: 2,
                // backgroundColor: 'red',
                flexDirection: 'column',
                width:'100%',
                padding: 30,
                paddingLeft: 20
            }}>
                <Text style = {{
                    justifyContent: 'flex-start',
                     alignItems: 'flex-start',
                     fontFamily: "SanFranciscoText-Light",
                     color: 'rgba(0, 0, 0, 0.5)'
                }}>
                    Updated: {month} {day}, {year} 17:19 IST
                </Text>
                <Text style = {{
                    fontSize: 30,
                    paddingTop: 10,
                    fontFamily: "SanFranciscoText-Bold",
                }}>
                {this.props.iddata.title}
                </Text>
                <Text style = {{
                     justifyContent: 'flex-start',
                     alignItems: 'flex-start',
                     fontFamily: "SanFranciscoText-Light",
                     color: 'rgba(0, 0, 0, 0.8)',
                     fontSize: 16,
                     paddingTop: 20
                }}>
                {this.props.iddata.description}
                {/* The World Happiness Report was released on 20th March, 2017 and it seems to have brought out some interesting results. The report is a measure of happiness published by the United Nations Sustainable Development Solutions Network. The first World Happiness Report was released on April 1, 2012. In 2012, the U.N. General Assembly declared March 20 as World Happiness Day. They believe that happiness is an important measure of the country's progress and when social well-being is the goal there is more motivation towards formulating a better public policy. */}
                </Text>
                <TouchableOpacity
                onPress = {()=> Actions.webviewlink({urllinks: innerdata.url})} 
                style = {{
                    marginTop: 20
                }}>
                <Text>
                    Read more at {innerdata.source.name}
                </Text>
            </TouchableOpacity>
            </View>
      </View>
      </ ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
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
    return{
        postdata : state.posts.items
    }
  
    // console.log(state)
 }
 export default Register;
