import React, { Component } from "react";

import styles from "./style";
// import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
// import { Button } from 'react-native-elements';
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
import Button from "react-native-button";
import {NavigationEvents} from 'react-navigation';
import axios from 'axios';



export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading: true,
      userid: "",
      password: "",

      useriderror: "",
      passworderror: "",
      message: null
    };
  }
  render() {
    const { navigation } = this.props;
    return (

        <View style={styles.container}>
          <NavigationEvents onDidFocus={() => this.refreshpage()} />
          <Text style={styles.infoRecipeName}>LOGIN</Text>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="User ID"
              onChangeText={text => this.setState({ userid: text })}
              value={this.state.userid}
              placeholderTextColor={styles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          {this.state.useriderror != ""? <Text style={{textAlign:"left", alignSelf: 'stretch', paddingLeft: 50, color:'red'}}>{this.state.useriderror}</Text>: null }
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
              placeholderTextColor={styles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          {this.state.passworderror != ""? <Text style={{textAlign:"left", alignSelf: 'stretch', paddingLeft: 50, color:'red'}}>{this.state.passworderror}</Text>: null }
          <Button
            containerStyle={styles.loginContainer}
            style={styles.loginText}
            onPress={() => this.onPressLogin()}
          >
            Login
          </Button>


                <Text style={styles.category}>OR</Text>


          <Button
            containerStyle={styles.loginContainer}
            style={styles.loginText}
            onPress={() => this.onPressSignup()}
          >
            Signup
          </Button>

        </View>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  refreshpage = () =>{
    this.setState({
      userid: "",
      password: "",

      useriderror: "",
      passworderror: "",
      message: null
    });
  }

  onPressLogin = () => {
          var valid = true;
          if (this.state.userid == ""){
            this.setState({useriderror: "UserID required."});
            valid = false;
          }
          else{
            this.setState({useriderror:""});
          }

          if(this.state.password == ""){
            this.setState({passworderror: "Password is required."});
            valid = false;
          }
          else{
            this.setState({passworderror: ""});
          }

          if(valid == true){

            axios.post(`http://192.168.0.7:5000/login`, {userid: this.state.userid,
            password: this.state.password, })
            .then(res => {
              // console.log(res);
              console.log(res.data.status);
              this.setState({message: res.data.status});
              if (this.state.message==0){
                Alert.alert("UserID or password is incorrect.");
              }
              else{
                this.props.navigation.navigate('UploadImage', { userid: this.state.userid });
              }


            });
          }


          // if (this.state.message == 0){
          //   Alert.alert("UserID or password is incorrect.");
          //   // this.setState({message:1, userid: "", password: ""});
          // }
          // else{
          //   this.props.navigation.navigate('UploadImage');
          // }


          }


  onPressSignup = () => {
          this.props.navigation.navigate('Signup');
  };
}
