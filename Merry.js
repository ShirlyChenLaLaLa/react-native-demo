import React from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  Animated,
  Image,
  Easing,
} from 'react-native';
import Snow from './imgs/snow.png';
import SantaClaus from './imgs/12.png';
import Tree from './imgs/tree.png';
import SnowMan from './imgs/snowMan.png';
const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');
const arr = [];
const snowNumber = 50;
for (var i = 0; i < snowNumber; i++) {
  arr.push(i);
}

export default class DragSquare extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    // 	animatedValue: new Animated.Value(0),
    // };
    this.animateSnowmanValue = new Animated.Value(0);
    this.animatedValue = [];
    arr.forEach(value => {
      this.animatedValue[value] = new Animated.Value(0);
    });
  }

  componentWillMount() {
    this._animatedValue = new Animated.ValueXY();
    this._value = { x: 0, y: 0 };
    this._animatedValue.addListener(value => (this._value = value));

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (e, gestureState) => {
        this._animatedValue.setOffset({ x: this._value.x, y: this._value.y });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this._animatedValue.x, dy: this._animatedValue.y },
      ]),
      onPanResponderRelease: () => {
        this._animatedValue.flattenOffset();
      },
    });
  }

  componentDidMount() {
    this.animateSnow();
    this.animateSnowMan();
  }

  animateSnowMan() {
    this.animateSnowmanValue.setValue(0);
    Animated.timing(this.animateSnowmanValue, {
      toValue: 100,
      duration: 1000,
      easing: Easing.linear,
    }).start(() => this.animateSnowMan());
  }

  animateSnow() {
    arr.forEach(value => {
      this.animatedValue[value].setValue(0);
    });
    const animations = arr.map(item => {
      return Animated.timing(this.animatedValue[item], {
        toValue: snowNumber,
        duration: 10000,
        easing: Easing.linear,
      });
    });
    Animated.stagger(300, animations).start(() => this.animateSnow());
  }

  snowAnimate(item) {
    return {
      position: 'absolute',
      left: parseInt(Math.random() * deviceWidth, 10),
      top: this.animatedValue[item].interpolate({
        inputRange: [0, snowNumber],
        outputRange: [-100, deviceHeight - 100],
      }),
      // transform: [{
      // 	rotate: this.animatedValue[item].interpolate({
      // 		inputRange: [0, 100],
      // 		outputRange: ['0deg', '180deg']
      // 	}),
      // }]
    };
  }

  render() {
    let interpolatedRotation = this._animatedValue.x.interpolate({
      inputRange: [0, deviceWidth / 2, deviceHeight],
      outputRange: ['-360deg', '0deg', '360deg'],
    });
    const animateSnowMan = {
      transform: [
        {
          rotate: this.animateSnowmanValue.interpolate({
            inputRange: [0, 50, 100],
            outputRange: ['-50deg', '50deg', '-50deg'],
          }),
        },
        {
          translateX: 0.5,
        },
        {
          translateY: 1,
        },
      ],
    };
    const animations = arr.map((a, i) => {
      return (
        <Animated.View key={i} style={[styles.snowBox, this.snowAnimate(a)]}>
          <Image source={Snow} style={styles.snow} />
        </Animated.View>
      );
    });

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                { translateX: this._animatedValue.x },
                { translateY: this._animatedValue.y },
                { rotate: interpolatedRotation },
              ],
            },
          ]}
          {...this._panResponder.panHandlers}
        >
          <Image style={styles.image} source={SantaClaus} />
        </Animated.View>
        {animations}
        <Animated.View style={styles.tree}>
          <Image style={styles.image} source={Tree} />
        </Animated.View>
        <Animated.View style={[styles.snowMan, animateSnowMan]}>
          <Image style={styles.image} source={SnowMan} />
        </Animated.View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 50,
    height: 50,
  },
  tree: {
    width: 200,
    height: 200,
  },
  snowMan: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  snowBox: {
    width: 30,
    height: 30,
  },
  snow: {
    width: '100%',
    height: '100%',
  },
});
