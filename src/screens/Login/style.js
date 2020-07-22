const React = require("react-native");
import { StyleSheet, Dimensions } from 'react-native';
const { width: viewportWidth } = Dimensions.get('window');



export default {
  container: {
    flex: 1,
    alignItems: "center"
  },
  or: {
    // fontFamily: "Noto Sans",
    color: "black",
    marginTop: 40,
    marginBottom: 10
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#cf3f3d",
    marginTop: 20,
    marginBottom: 20
  },
  centerTitle: {
    alignSelf: "stretch",
    textAlign: "center",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: 20,
    color: "#696969"
  },
  // loginContainer: {
  //   width: "70%",
  //   backgroundColor: "#cf3f3d",
  //   borderRadius: 25,
  //   padding: 10,
  //   marginTop: 30
  // },
  loginContainer:{
    // flex: 1,
    height: 40,
    width: "80%",
    marginTop: 30,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 100,
    borderColor: '#2cd18a',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    fontSize: 14,
    color: '#2cd18a'
  },
  placeholder: {
    // fontFamily: "Noto Sans",
    color: "red"
  },
  InputContainer: {
    width: "80%",
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "grey",
    borderRadius: 25
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#696969"
  },
  color: {
    grey:"grey"
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#2cd18a'
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
};
