import styles from "./style";
import React, { Component } from 'react';
import Button from "react-native-button";
import {
  ActivityIndicator,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  PermissionsAndroid
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import axios from 'axios';
import MenuImage from '../../components/MenuImage/MenuImage';
import { Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';


const { width: viewportWidth } = Dimensions.get('window');

export default class UploadImage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Upload Image',
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      uploading: false,
      message: "",
      userid: "",
      sendphoto: null,
    };
  }


  render() {
    let {
      image
    } = this.state;

    const { navigation } = this.props;
    const userid = navigation.getParam('userid');
    // this.setState({userid: navigation.getParam('userid')})

    return (
      <ScrollView style={styles.container}>
        <NavigationEvents onDidFocus={() => this.refreshpage()} />

        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>Food Identification</Text>

          <View style={styles.infoContainer}>


            <Button
              containerStyle={styles.ButtonContainer}
              style={styles.Buttontext}
              onPress={this._pickImage}
            >
              Take image from Gallery
            </Button>
          </View>

          <View style={styles.infoContainer}>
                <Text style={styles.category}>OR</Text>
          </View>

          <View style={styles.infoContainer}>

            <Button
              containerStyle={styles.ButtonContainer}
              style={styles.Buttontext}
              onPress={this._takePhoto}
            >
               Take a Photo
             </Button>
          </View>

        <View style={styles.maybeRenderImageContainer}>
            <Image source={{ uri: image }} style={styles.maybeRenderImage} />

        </View>

        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => this.onPressUpload()}
        >
            <Text style={styles.category}>Upload Photo</Text>
        </Button>

        <View style = {styles.infoContainer}>
        <Button
          containerStyle={styles.ButtonContainer}
          style={styles.Buttontext}
          onPress={() => this.onpressShow()}
        >
          Show Attributes
        </Button>
      </View>

        </View>



      </ScrollView>


    );
  }

  onpressShow = () =>{

    this.props.navigation.navigate('ShowAttributes', { image: this.state.image});
  }

  onPressUpload = () => {

          const formData = new FormData();
          formData.append('image', {
            uri: this.state.image,
            type: 'image/jpg', // or photo.type
            name: 'testPhotoName',
          });

          const config = {
            method: 'POST',
            body: formData,
          };


          let flag = 0
          fetch('http://192.168.0.7:5000/uploadphoto', config)
          .then(function(response) {
            // return response.json();
            console.log("response:  ",response.json());

            })
              .catch(err => {
                // console.log(err);
              });




          // this.props.navigation.navigate('ShowAttributes', { image: this.state.image});
  };



  refreshpage = () =>{
    this.setState({
      image: null,
      uploading: false,
      message: "",
      sendphoto: null,
    });
  }


  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);


    const options = {
      title: 'Select a photo',
      allowsEditing: true,
      aspect: [4, 4],
      storageOptions: {
        skipBackup: true,
        path:'images',
        // cameraRoll: true
      },
    };

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      // let pickerResult = await ImagePicker.launchCameraAsync({
      //   allowsEditing: true,
      //   aspect: [4, 3],
      // });

      let response = await ImagePicker.launchCameraAsync(options);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }  else {
        const source = { uri: response.uri };
      }

      console.log('response:', response);
      console.log('path: ', response.path);
      this.setState({
        image: response.uri,
        uploading:true,
      });

    }
  };

  _pickImage = async () => {
    const options = {
      title: 'Select a photo',
      allowsEditing: true,
      aspect: [4, 4],
      storageOptions: {
        skipBackup: true,
        path:'images',
        // cameraRoll: true
      },
    };


    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraRollPerm === 'granted') {
      let response = await ImagePicker.launchImageLibraryAsync(options);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }  else {
        const source = { uri: response.uri };
      }

      console.log('response:', response);

      this.setState({
        image: response.uri,
        uploading:true,
        sendphoto: response,
      });


  };



  };
}
