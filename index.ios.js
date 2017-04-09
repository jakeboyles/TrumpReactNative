import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import axios from 'axios';

export default class TrumpSearch extends Component {

  constructor(state){
    super(state);
    this.state = {
      data:"",
    }
  }

  componentDidMount(){
    let _this = this;
    axios.get('https://trumpdonald.herokuapp.com/random')
    .then( response => {
      _this.setState({
        data:response.data.value,
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  changeQuote(text){
    let _this = this;
    axios.post('https://trumpdonald.herokuapp.com/search',{
      search:text.text
    })
    .then(response => {
      let rando = Math.floor(Math.random() * response.data._embedded.quotes.length) + 1;
      _this.setState({
        data:response.data._embedded.quotes[rando-1].value
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
  render() {
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          placeholder="About What?"
          autoFocus={true}
          onChangeText={(text) => this.changeQuote({text})}
        />

        <Text style={styles.welcome}>
         Trump Thinks...
        </Text>

        <Text style={styles.quotes}>
        "{this.state.data}"
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffca92',
  },
  input:{
    height: 40,
    backgroundColor:'#fff',
    color:'black',
    marginTop:50,
    marginBottom:30,
    width:'90%',
    marginLeft:'5%',
    padding:10
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color:'#fff',
    fontWeight:'800',
    paddingLeft:40,
    paddingRight:40,
    textShadowColor:'rgba(0,0,0,.2)',
    textShadowOffset:{width:1,height:1},
    textShadowRadius:2
  },
  quotes: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 15,
    padding:20,
    lineHeight:25,
    fontSize:22,
    textShadowColor:'rgba(0,0,0,.2)',
    textShadowOffset:{width:1,height:1},
    textShadowRadius:2
  },
});

AppRegistry.registerComponent('TrumpSearch', () => TrumpSearch);
