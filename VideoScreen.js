import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Video from 'react-native-af-video-player'
const theme = {
  title: '#FFF',
  more: '#446984',
  center: '#7B8F99',
  fullscreen: '#446984',
  volume: '#A5957B',
  scrubberThumb: '#234458',
  scrubberBar: '#DBD5C7',
  seconds: '#DBD5C7',
  duration: '#DBD5C7',
  progress: '#446984',
  loading: '#DBD5C7'
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});

export default class VideoScreen extends React.Component {
  componentDidMount() {
    console.log(this.props.navigation)
  }
  play() {
    this.video.play()
    this.video.seekTo(25)
  }

  pause() {
    this.video.pause()
  }

  render() {
    return (
      <View style={ styles.container }>
        <Video url={ this.props.navigation.state.params.url } ref={ (ref) => { this.video = ref } }
          theme={ theme } />
        <Button title="Play" onPress={ () => this.play() }>Play</Button>
        <Button title="Pause" onPress={ () => this.pause() }>Pause</Button>
      </View>
    );
  }
}
