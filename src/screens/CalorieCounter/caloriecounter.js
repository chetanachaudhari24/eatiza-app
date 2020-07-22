import React, { Component } from "react";

import styles from "./style";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  TextInput,
} from 'react-native';
// import Pie from 'react-native-pie';
import { Dropdown } from 'react-native-material-dropdown';
import Button from "react-native-button";
import {
  LineChart
} from "react-native-chart-kit";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {NavigationEvents} from 'react-navigation';
import DialogInput from 'react-native-dialog-input';
import axios from 'axios';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import MenuImage from '../../components/MenuImage/MenuImage';

const { width: viewportWidth } = Dimensions.get('window');

export default class CalorieCounter extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      calorie_intake: 0,
      food_intake: 0,
      exercise: 0,
      line_values: [0,0,0,0,0,0,0],
      isDialogVisible: false,
      exercise_activity: "",
      hours : 0,
      user_weight : 0,
      hour_error : "",
      exercise_activity_error : "",
    };
  }

  onPressViewIngredients = () => {
          this.props.navigation.navigate('ShowIngredients');
  };

  showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }

  onpressDialog = () =>{
    this.setState({isDialogVisible: true});
    <DialogInput isDialogVisible={this.state.isDialogVisible}
          title={"Exercise"}
          message={"Enter Calories burnt during Exercise"}
          hintInput ={"Cal"}
          keyboardType={'numeric'}
          submitInput={ (inputText) => {this.setState({ exercise: Number(inputText), isDialogVisible:false });} }
          closeDialog={ () => {this.showDialog(false)}}>
</DialogInput>
  }

  updateContents = () =>{
    axios.get(`http://192.168.0.7:5000/caloriecounter`)
  .then(response =>{
    // handle success
    console.log(response.data);
    this.setState({
      calorie_intake: response.data.calorie_intake,
      food_intake: response.data.food_intake,
      line_values: response.data.line_values,
      user_weight : response.data.user_weight,
    });

  })
  .catch(function (error) {
    // handle error
    console.log(error);

  })
  .finally(function () {
    // always executed
  });
  }

  onPressEnergy = () =>{
    var valid = 0;

    if(this.state.exercise_activity == "")
    {
      this.setState({
        exercise_activity_error : "Please select valid option."
      });
      valid = 0;
    }
    else{
      valid = 1;
    }

    if(this.state.hours == ""){
      this.setState({hour_error : "Enter valid number."});
      valid = 0;
    }
    else{
      valid = 1;
    }

    if(valid == 1){
    var MET = 0;
    if(this.state.exercise_activity == 'Bicycling'){
      MET = 8;
    }
    else if(this.state.exercise_activity == 'Running'){
      MET = 11.5;
    }
    else if (this.state.exercise_activity == 'Swimming'){
      MET = 10;
    }
    else{
      MET = 4;
    }

    console.log("MET: ", MET);
    console.log("Hours: ", this.state.hours);
    console.log(this.state.user_weight);
    var calorie_per_minute =  0.0175 * MET*this.state.user_weight;
    var total = calorie_per_minute*60*this.state.hours;
    console.log(calorie_per_minute, total);
    this.setState({
      'exercise' : Math.floor(total),
    });
  }
  }


  render() {
    // const { activeSlide } = this.state;
    const { navigation } = this.props;

    const chartConfig = {
      backgroundGradientFrom: "#FFFFFF",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#FFFFFF",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 3, // optional, default 3
      barPercentage: 0.5
    };
    let Exercise_activity = [{
      value: 'Bicycling',
    }, {
      value: 'Running',
    },
    {
      value: 'Swimming',
    },
    {
      value: 'Walking',
    }];



// const data = {
//       labels: ["5 days before", "4 days before", "3 days before", "2 days before", "Yesterday", "Today"],
//       datasets: [
//         {
//           data: [20, 45, 28, 80, 99, 43],
//           // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
//           // strokeWidth: 2 // optional
//         }
//       ],
//
//     };


    return (
      <ScrollView style={styles.container}>
        <NavigationEvents onDidFocus={this.updateContents} />
        <View style={[styles.infoRecipeContainer, {marginTop:80}]}>
          <Text style={styles.infoRecipeName}>Calorie Counter</Text>

          <View style={styles.InputContainer}>
            <Dropdown
              style={styles.dropdownStyle}
              placeholderTextColor={styles.color.grey}
              underlineColorAndroid="transparent"
              label='   Select Exercise Activity'
              data={Exercise_activity}
              dropdownOffset={{ 'top': 0 }}
              onChangeText={(value)=> {this.setState({
          exercise_activity: value
        });}}
            />
          </View>
          {this.state.exercise_activity_error != ""? <Text style={{textAlign:"left", alignSelf: 'stretch', paddingLeft: 50, color:'red'}}>{this.state.exercise_activity_error}</Text>: null }



          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              keyboardType={'numeric'}
              placeholder="Number of Hours"
              onChangeText={text => this.setState({ hours: text })}
              value={this.state.hours}
              placeholderTextColor={styles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          {this.state.hour_error != ""? <Text style={{textAlign:"left", alignSelf: 'stretch', paddingLeft: 50, color:'red'}}>{this.state.hour_error}</Text>: null }

          <Button
            containerStyle={styles.signupContainer}
            style={styles.signupText}
            onPress={() => this.onPressEnergy()}
            >
            Calculate Energy Expenditure
          </Button>



          <View style={[styles.infoContainer, {marginTop: 30,alignItems:'center'}]}>
                <Text style={styles.category}>Track your calories</Text>
          </View>

          <View style={[{flex: 1,flexDirection: 'row'}, styles.infoContainer]}>

            <View style={[styles.infoContainer, {marginTop: 30,flex:1 , flexDirection:'column'}]}>
                  <Text style={styles.infoRecipe}>Intake Goal</Text>
                  <Text style={styles.category}>{this.state.calorie_intake}</Text>
                  <Text style={styles.kcal}>Cal</Text>
            </View>

            <View style={[styles.infoContainer, {marginTop: 30,flex:1 , flexDirection:'column'}]}>
                  <Text style={styles.infoRecipe}>Food</Text>
                  <Text style={styles.category}>- {this.state.food_intake}</Text>
                  <Text style={styles.kcal}>Cal</Text>

            </View>

            <View style={[styles.infoContainer, {marginTop: 30,flex:1 , flexDirection:'column'}]}>
                  <TouchableOpacity><Text style={styles.infoRecipe}>Exercise</Text></TouchableOpacity>
                  <Text style={styles.category}>+ {this.state.exercise}</Text>
                  <Text style={styles.kcal}>Cal</Text>
            </View>

            <DialogInput isDialogVisible={this.state.isDialogVisible}
                  title={"Exercise"}
                  message={"Enter Calories burnt during Exercise"}
                  hintInput ={"Cal"}
                  keyboardType={'numeric'}
                  submitInput={ (inputText) => {this.setState({ exercise: Number(inputText), isDialogVisible:false })} }
                  closeDialog={ () => {this.showDialog(false)}}>
        </DialogInput>

          </View>

          <View style={[styles.infoContainer, {marginTop: 30,alignItems:'center'}]}>
            <View style={[styles.infoContainer, {marginTop: 30,flex:1 , flexDirection:'column', backgroundColor:'rgba(74,72,90, 0.2)'}]}>
                  <Text style={[styles.infoRecipe,{marginTop:10}]}>Remaining Calories</Text>
                  <Text style={styles.category}>= {this.state.calorie_intake - this.state.food_intake + this.state.exercise}</Text>
                  <Text style={[styles.kcal, {marginBottom: 10}]}>Cal</Text>
            </View>
          </View>

          <View style={[styles.infoContainer, {marginTop: 30,alignItems:'center'}]}>
                <Text style={styles.category}>Weekly Calorie Report</Text>
          </View>

          {/* <View style={[styles.infoContainer, {marginTop: 30,alignItems:'center'}]}> */}
          <LineChart
           data={{
             labels: ['6 days','5 days', '4 days', '3 days', '2 days', 'Yesterday', 'Today' ],
             datasets: [
               {
                 data: this.state.line_values,
               },
             ],
           }}
           width={Dimensions.get('window').width - 16} // from react-native
           height={340}

           verticalLabelRotation = {60}
           chartConfig={{
             backgroundColor: '#000000',
             backgroundGradientFrom: '#FFFFFF',
             backgroundGradientTo: '#FFFFFF',
             // decimalPlaces: 2, // optional, defaults to 2dp
             color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
             style: {
               borderRadius: 16,
             },

           }}
           bezier
           style={{
             marginVertical: 8,
             borderRadius: 16,
           }}
         />
          {/* </View> */}



        </View>
      </ScrollView>

    );
  }
}
