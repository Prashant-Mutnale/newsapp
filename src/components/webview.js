import React from 'react';
import {
    TextInput,
    Text,
    TouchableOpacity,
    Image,
    View, StyleSheet, Dimensions, ScrollView, Platform,WebView
} from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class webviewlin extends React.Component {

      
 render()

 {
    console.log("links", this.props.urllinks)
  
     return(
        
         <View style = {{
             flex: 1
         }}>
          {/* <HeaderComponent name='Order'/> */}
              <WebView

            //   ref="webview"
        source={{uri: this.props.urllinks}}
        // source={{uri: 'https://si4.fnp.com/images/ban/l/dummy/paymentoption.html'}
        javaScriptEnabled = {true}
        domStorageEnabled = {true}
        startInLoadingState={false}
        // onNavigationStateChange={this._onNavigationStateChange.bind(this)}

        // injectedJavaScript={jscode}
      />
         </View>
         
     )
 }
}