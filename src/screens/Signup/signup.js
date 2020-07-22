import React, { Component } from "react";

import styles from "./style";
// import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
// import { Button } from 'react-native-elements';
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import Button from "react-native-button";
import { Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {NavigationEvents} from 'react-navigation';
import axios from 'axios';

const appId = "1047121222092614"


export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      name: "",
      email:"",
      password: "",
      age: "",
      gender: "",
      height: "",
      weight: "",
      activity: "",

      useriderror: "",
      nameerror: "",
      emailerror: "",
      passworderror: "",
      ageerror: "",
      heighterror: "",
      weighterror: "",
      message: 0
    };
  }
  render() {
    const { navigation } = this.props;
    let gender_data = [{
      value: 'Male',
    }, {
      value: 'Female',
    }];

    let activity_data = [{
      value: 'Active',
    }, {
      value: 'Moderate',
    },
    {
      value: 'Inactive',
    }];


    return (
      <ScrollView>
            <NavigationEvents onDidFocus={() => this.refreshpage()} />
        <View style={styles.container}>
          <Text style={styles.infoRecipeName}>SIGNUP</Text>
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
              placeholder="Name"
              onChangeText={text => this.setState({ name: text })}
              value={this.state.name}
              placeholderTextColor={styles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          {this.state.nameerror != ""? <Text style={{textAlign:"left", alignSelf: 'stretch', paddingLeft: 50, color:'red'}}>{this.state.nameerror}</Text>: null }

          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Email"
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
              placeholderTextColor={styles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          {this.state.emailerror != ""? <Text style={{textAlign:"left", alignSelf: 'stretch', paddingLeft: 50, color:'red'}}>{this.state.emailerror}</Text>: null }

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

          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              keyboardType={'numeric'}
              placeholder="Age"
              onChangeText={text => this.setState({ age: text })}
              value={this.state.age}
              placeholderTextColor={styles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          {this.state.ageerror != ""? <Text style={{textAlign:"left", alignSelf: 'stretch', paddingLeft: 50, color:'red'}}>{this.state.ageerror}</Text>: null }

          <View style={styles.InputContainer}>
            <Dropdown
              style={styles.dropdownStyle}
              placeholderTextColor={styles.color.grey}
              underlineColorAndroid="transparent"
              label='    Gender'
              data={gender_data}
              dropdownOffset={{ 'top': 0 }}
              onChangeText={(value)=> {this.setState({
          gender: value
        });}}
            />
          </View>



          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              keyboardType={'numeric'}
              placeholder="Height"
              onChangeText={text => this.setState({ height: text })}
              value={this.state.height}
              placeholderTextColor={styles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          {this.state.heighterror != ""? <Text style={{textAlign:"left", alignSelf: 'stretch', paddingLeft: 50, color:'red'}}>{this.state.heighterror}</Text>: null }


          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              keyboardType={'numeric'}
              placeholder="Weight"
              onChangeText={text => this.setState({ weight: text })}
              value={this.state.weight}
              placeholderTextColor={styles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          {this.state.weighterror != ""? <Text style={{textAlign:"left", alignSelf: 'stretch', paddingLeft: 50, color:'red'}}>{this.state.weighterror}</Text>: null }


          <View style={styles.InputContainer}>
            <Dropdown
              style={styles.dropdownStyle}
              placeholderTextColor={styles.color.grey}
              underlineColorAndroid="transparent"
              label='     Activities'
              data={activity_data}
              dropdownOffset={{ 'top': 0 }}
              onChangeText={(value)=> {this.setState({
          activity: value
        });}}
            />
          </View>

          <Button
            containerStyle={styles.signupContainer}
            style={styles.signupText}
            onPress={() => this.onPressSignup()}
          >
            Signup
          </Button>

          <Text style={styles.category}>OR</Text>

          <Button
            containerStyle={styles.signupContainer}
            style={styles.signupText}
            onPress={() => this.onPressLogin()}
          >
            Login
          </Button>

        </View>
      </ScrollView>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  refreshpage = () =>{
    this.setState({
      userid: "",
      name: "",
      email:"",
      password: "",
      age: "",
      gender: "",
      height: "",
      weight: "",
      activity: "",

      useriderror: "",
      nameerror: "",
      emailerror: "",
      passworderror: "",
      ageerror: "",
      heighterror: "",
      weighterror: "",
      message: 0
    });
  }

  onPressLogin = () => {
          this.props.navigation.navigate('Login');
  };

  onPressSignup = () => {
    var valid = true;

    if (this.state.userid == ""){
      this.setState({useriderror: "userID is required."});
      valid = false;
    }
    else{
        this.setState({useriderror: ""});
    }

    if(this.state.name == ""){
      this.setState({nameerror: "Name is required."});
      valid = false;
    }
    else{
        this.setState({useriderror: ""});
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      this.setState({emailerror: "Email is not correct."});
      valid = false;
    }
    else{
        this.setState({useriderror: ""});
    }

    let pwd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (pwd.test(this.state.password) ===  false){
      this.setState({passworderror: "Password must contain at least one number and special character."});
      valid = false;
    }
    else{
        this.setState({useriderror: ""});
    }

    if(this.state.age == ""){
      this.setState({ageerror: "Age is required."});
      valid = false;
    }
    else{
        this.setState({useriderror: ""});
    }

    if(this.state.height == ""){
      this.setState({heighterror: "Height is required."});
      valid = false;
    }
    else{
        this.setState({useriderror: ""});
    }

    if(this.state.weight == ""){
      this.setState({weighterror: "Weight is required."});
      valid = false;
    }
    else{
        this.setState({useriderror: ""});
    }

    if (valid == true){

      axios.post(`http://192.168.0.7:5000/signup`, { userid: this.state.userid,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      age: this.state.age,
      gender: this.state.gender,
      height: this.state.height,
      weight: this.state.weight,
      activity: this.state.activity})
      .then(res => {
        // console.log(res);
        console.log(res.data);
        this.setState({message: res.data.status});

        if(this.state.message== 0 ){
          // this.props.navigation.navigate('UploadImage');
          Alert.alert("User Account already exists.");
          this.refreshpage();
        }
        else{
          this.props.navigation.navigate('UploadImage', { userid: this.state.userid });
          // Alert.alert(this.state.message);
        }

      });
    }




    // this.props.navigation.navigate('UploadImage');
  }


}
