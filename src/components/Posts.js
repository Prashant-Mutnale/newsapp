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
import Spinner from 'react-native-spinkit'
let newslist
class Posts extends Component {
    constructor(props){
        super(props)
        this.state = {
            datalist : "",
            index: 0,
            types: ['ArcAlt'],
            size: 100,
            color: "#FFFFFF",
            isVisible: true
        }
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
      Actions.pop()
      console.log("stateaction",Actions.state.index)
      return true
  }
    // componentWillMount(){
    //   BackHandler.addEventListener('hardwareBackPress', function() {
    //     Actions.newsList()
    //   });
        // this.props.fetchPosts()
        // this.setState({
        //     datalist: this.props.postdata.articles
        // })

    // _onScroll(e){
    //     var contentOffset = e.nativeEvent.contentOffset.y;
    //     this.state.contentOffsetY < contentOffset ? console.log("Scroll Down") : console.log("Scroll Up");
    //     this.setState({contentOffsetY: contentOffset});
    // }
    filter(stid){
      this.props.fetchPosts(this.props.sendid, stid)
    }
  render() {
    console.log("sendid", this.props.sendid)
    console.log("nechangeid", this.props.idchange)
    //   console.log("sdsd",this.state.datalist)
      if(this.props.postdata.articles !=="" || this.props.postdata!==undefined){
        console.log("newsdata", this.props.postdata.articles)
        newslist =  this.props.postdata.articles
      }
    return (
        <ScrollView>

      <View style={styles.container}>

         {
             newslist ==="" || newslist== undefined ? null :

            Object.values(newslist).map((items, i ) => {
                return(
                    <TouchableOpacity
                    key = {i}
                    style = {{
                        flex: 1,
                        paddingBottom: 10,
                        paddingTop: 10,
                      //   backgroundColor: 'red',
                        flexDirection:'row',
                        borderBottomWidth: 1,
                        borderBottomColor: "#efefef"
                    }}
                    onPress = {()=> Actions.register({iddata : items})}
                    >
                    <View style = {{
                        flex: 1
                    }}>
                    <Image
          style={{flex: 1}}
          source={{uri: items.urlToImage}}
        />
                    </View>
                      <View style = {{
                          flex: 2,
                          paddingLeft: 10
                      }}>
                      <Text
                      numberOfLines={2}
                      style = {{
                            fontFamily: "SanFranciscoText-Bold",
                            textAlign: 'left',
                            fontSize: 22,
                            justifyContent: 'flex-start'
                        }}>{items.title}</Text>
                          <Text
                          numberOfLines={1}
                          style = {{
                            fontFamily: "SanFranciscoText-Light",
                            textAlign: 'left',
                            fontSize: 12,
                            marginTop: 10,
                            justifyContent: 'flex-start'
                        }}><Text
                        style = {{
                          fontWeight: 'bold'
                        }}>Author</Text>: {items.author}</Text>
                      </View>
                    </TouchableOpacity>
                )
            })
        }

          {/* <TouchableOpacity style = {{
              flex: 1,
            //   backgroundColor: 'red',
              flexDirection:'row',
              borderBottomWidth: 0.2,
              borderBottomColor: "#efefef"
          }}>
            <View style = {{
                flex: 1,
            }}>
            <Text style = {{
                  fontFamily: "SanFranciscoText-Bold",
                  textAlign: 'left',
                  fontSize: 32,
                  justifyContent: 'flex-start'
              }}>World Happiness Report</Text>
                <Text style = {{
                  fontFamily: "SanFranciscoText-Light",
                  textAlign: 'left',
                  fontSize: 16,
                  marginTop: 10,
                  justifyContent: 'flex-start'
              }}>18k People Talking about this</Text>
            </View>
          </TouchableOpacity> */}

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
  spinner: {
    marginBottom: 50
  },
});

function mapStateToProps(state) {
    // console.log("stateitems",state.posts.items)
        return{
            postdata : state.posts.items
        }


    // else {
    //     return {};
    //     }


    // console.log(state)
 }
 export default connect(mapStateToProps, {fetchPosts})(Posts);
