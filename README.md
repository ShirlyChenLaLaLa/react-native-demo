### 初始化雪花
首先来个五十片雪花吧，在class外面定义一个数组。
```
const snowNumber = 50;
for (var i = 0; i < snowNumber; i++) {
	arr.push(i);
}
```
### 设置每片雪花动画的初始值
为了创建一个动画，我们首先要创建一个动画使用的值。
```
import React from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  Animated,
  Image,
  Easing
} from 'react-native';

export default class Snow extends React.Component {
  constructor(props) {
    super(props);
    arr.forEach((value) => {
      this.animatedValue[value] = new Animated.Value(0);
    });
  }
```
### 为每片雪花创建一个animated view
由于每片雪花的动画是一样的，因此我们让每片雪花使用同样的样式`this.snowAnimate()`,该方法返回一个样式对象。
```
  render() {
    const animations = arr.map((a, i) => {
      return (
        <Animated.View
          key={i}
          style={[styles.snowBox, this.snowAnimate(a)]}
        >
		  <Image source={Snow} style={styles.snow}/>
        </Animated.View>
      );
    });
    return (
      <View style={styles.container}>
	    {animations}     
      </View>
    );
  }
```
### 为每片雪花的创建动画
由于想让无限的落雪，因此在函数一开始又将每片雪花的动画值设置成了0。
使用`animated.timing`创建了一个动画，使一个值按照一个过渡曲线而随时间变化。（消耗类型的），在它开始后又调用了本身，这是创建无限动画的一种方式。Animated.stagger()：一个动画数组，传入一个时间参数来设置队列动画间的延迟，即在前一个动画开始之后，隔一段指定时间才开始执行下一个动画里面的动画，并不关心前一个动画是否已经完成，所以有可能会出现同时执行（重叠）的情况。设置好，每片雪花的相隔时间，这样就能让雪一片一片飘落啦！
```
  animateSnow () {
    arr.forEach((value) => {
      this.animatedValue[value].setValue(0)
    });
    const animations = arr.map((item) => {
      return Animated.timing(
        this.animatedValue[item],
        {
          toValue: snowNumber,
          duration: 10000,
          easing: Easing.linear
        }
      );
    })
    Animated.stagger(300, animations).start(() => this.animateSnow());
  }
  
```
### 每片雪花的动画样式
为了让雪花飘落显得真实自然，这里使用`Math.random`打乱了雪花的左右顺序。
```
	snowAnimate (item) {
		return {
			position: 'absolute',
			left: parseInt(Math.random()*(deviceWidth),10),
			top: this.animatedValue[item].interpolate({
				inputRange: [0, snowNumber],
				outputRange: [-100, deviceHeight-100],
			})
    	}

	}
```
![雪花效果图哦~](https://upload-images.jianshu.io/upload_images/7225268-bbe20a1108da8d56.gif?imageMogr2/auto-orient/strip)
## 最后，祝大家圣诞快乐！！！