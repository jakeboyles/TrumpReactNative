import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import cssStyles from './styles';
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

  changeQuote(data){
    let _this = this;
    axios.post('https://trumpdonald.herokuapp.com/search',{
      search:data.text
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

const styles = StyleSheet.create(cssStyles);

AppRegistry.registerComponent('TrumpSearch', () => TrumpSearch);
