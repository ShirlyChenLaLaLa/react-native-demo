import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});

export default class AboutScreen extends React.Component {
  componentDidMount(){
    console.log(this.props.navigation)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm about</Text>
      </View>
    );
  }
}
