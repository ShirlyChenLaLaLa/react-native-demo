# 练习
主题：摇滚音乐视频APP - shout

# 步骤：
1. 预备
创建一个名叫shout的react-native项目
在xcode中允许该项目使用http请求

安装必须的组件
npm install react-navigation --save
npm install react-native-af-video-player --save
react-native link react-native-video
react-native link react-native-keep-awake
react-native link react-native-vector-icons
react-native link react-native-orientation
react-native link react-native-linear-gradient

在项目根目录建立src文件夹，导入demo/shout下的所有资源文件
项目文件结构完备，只需要在根目录的App.js中导入src/App.js即可:
```jsx
import App from './src/App.js';
export default App;
```

2. 每个页面需要呈现
## HomeScreen
设置页面背景色为黑色，使用ScrollView和Image组件显示videos.json中所有视频的封面图片(键名是cover)
图片宽100%，高度233, 每张图片之间有5像素的margin
点击图片页面可以跳转到VideoScreen，并带上该视频的连接

提示：
```jsx
// 这样可以导入视频数据
import videos from './videos.json';
```
请参考 demo/ScrollView.js


## VideoScreen
设置页面背景色为黑色，通过HomeScreen提交的视频连接，使用Video组件来播放它，另外视频需要居中显示

提示：
```jsx
// 视频组件使用方式
import Video from 'react-native-af-video-player'
<Video url={{uri: video.url}} />
```


## AboutScreen
设置页面背景色为黑色，使用Image组件进行居中显示about.png
```jsx
// 显示本地图片
<Image source={require('图片路径')} />
```


3. 完善
为tab导航加上图标，stack导航加上页面标题
