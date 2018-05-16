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
  AsyncStorage
} from 'react-native';
import {connect} from 'react-redux'
import {fetchPosts} from '../redux/actions/postActions.js';
import { Actions } from 'react-native-router-flux';
class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            datalist : "",
            newdaata: ''
        }
        this.catid = this.catid.bind(this)
    }
    catid(idcat){
        // console.log("idadata",idcat)
        this.props.fetchPosts(this.props.newsitem,idcat)
        // Actions.newsList({newsids:idcat})
    }
  render() {
    //   console.log("itemcategory", this.props.newsitem)
    return (
        <ScrollView>
                <TouchableOpacity onPress = {()=>{this.catid("entertainment")}}>
                <Text>Entertinment</Text>
                </TouchableOpacity>
                
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
    console.log(state.posts.items)
        return{
            postdata : state.posts.items
        }
        

    // else {
    //     return {};
    //     }
    
  
    // console.log(state)
 }
 export default connect(mapStateToProps, {fetchPosts})(Category);
