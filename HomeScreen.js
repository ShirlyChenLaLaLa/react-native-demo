import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import videos from './videos.json';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 30,
    backgroundColor: '#1f1f1f'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    height: 40,
    borderRadius: 2,
    backgroundColor: '#38b2a6',
  },
  image: {
    width: '100%',
    height: 233,
    marginBottom: 5,
  },
});

export default class HomeScreen extends React.Component {

  goProfile = (videoUrl) => {
    this.props.navigation.navigate('Video', { url: videoUrl });
  }

  render() {
    const videosShow = videos.map((item, index) => {
      return <TouchableOpacity key={ index } onPress={ () => this.goProfile(item.url) }>
        <Image  style={ styles.image } source={ { uri: item.cover } } />
      </TouchableOpacity>
    })

    return (
      <View style={ styles.container }>
        <ScrollView horizontal={ false } >{ videosShow }</ScrollView>
      </View>
    );
  }
}
