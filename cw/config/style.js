import { StyleSheet } from 'react-native'
let Dimensions = require('Dimensions');
const hwidth = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  selectedTabStyle: {
  },
  iconStyle: {
    color: '#5C7BD2',
  },
  actidc: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    height: 80
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  swiper: {},
  img: {
    width: hwidth,
    height: hwidth * 2 / 3,
    resizeMode: 'contain',
  },
  imageStyle: {
    width: 80,
    height: 80
  },
  listViewStyle: {
    // 主轴方向  
    //flexDirection: 'row',
    // 一行显示不下,换一行  
    //flexWrap: 'wrap',
    // 侧轴方向  

  },

  innerViewStyle: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginTop: 10,
    // 文字内容居中对齐  
    alignItems: 'center'
  },

  iconStyle: {
    width: 80,
    height: 80,
  },
  header: {
    backgroundColor: '#000000'
  },
  btn: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  btnText: {
    fontSize: 18
  }
})
