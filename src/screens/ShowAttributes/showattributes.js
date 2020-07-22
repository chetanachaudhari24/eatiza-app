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
  TouchableHighlight
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import axios from 'axios';
// import Pie from 'react-native-pie';
import {
  ProgressChart
} from "react-native-chart-kit";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class ShowAttributes extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      food_item : "",
      calories: "",
      attributes: [],
      nutrients: [],
      ingredients: [],
      progress_data: [],
      nut_value: [0,0,0,0],
      isLoaded: 0,
    };

  }


  refreshpage = () =>{
    this.setState({
      food_item: "",
      calories: "",
      attributes: [],
      nutrients: [],
      ingredients: [],
      nut_value : [60,60,60,60],
    })
  }

  updateContents = () => {


    axios.get(`http://192.168.0.7:5000/showattributes`)
  .then(response =>{
    // handle success
    console.log(response.data);
    this.setState(
    {
      food_item : response.data.Name,
      calories: response.data.calories,
      attributes: response.data.Attributes,
      nutrients: response.data.Nutrients,
      ingredients: response.data.Ingredients,
      nut_value: response.data.nut_value,
      isLoaded: 1,
    });
    console.log(this.state.nutrients);
    console.log(this.state.nutrients[0]);
    console.log(this.state.nut_value[0]);
    // console.log(this.state.nutrients[0].value);
  })
  .catch(function (error) {
    // handle error
    console.log(error);

  })
  .finally(function () {
    // always executed
  });

  }


  render() {
    // const { activeSlide } = this.state;
    const { navigation } = this.props;

    const image = navigation.getParam('image');

     // var data1 = this.state.progress_data[0];

     const data1 = {
       'data' :[60],
     }

    const chartConfig = {
      backgroundGradientFrom: "#FFFFFF",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#FFFFFF",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 3, // optional, default 3
      barPercentage: 0.5
};


    return (
      <ScrollView style={styles.container}>
        <NavigationEvents onDidFocus={this.updateContents} />
        {/* {this.state.food_item == ""? {this.updateContents()}: null} */}

        {/* {this.updateContents} */}

        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <View style={styles.imageContainer}>
              {/* <Image style={styles.image} source={require('../../../assets/icons/test.jpg')} /> */}
              <Image style={styles.image} source={{ uri: image }}/>
            </View>

          </View>
        </View>

        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{this.state.food_item}</Text>
          <View style={styles.infoContainer}>
                <Text style={styles.category}>Calories</Text>
          </View>

          <View style={styles.infoContainer}>
            <Image style={styles.infoPhoto} source={require('../../../assets/icons/fire.png')} />
            <Text style={styles.infoRecipe}>{this.state.calories} Cal </Text>
          </View>

          <View style={[styles.infoContainer, {marginTop: 30,}]}>
                <Text style={styles.category}>Nutrients</Text>
          </View>

          <View style={{flex: 1,flexDirection: 'row'}}>


              <View>
              {/* <ProgressChart
                data = {data1}
                width={80}
                height={80}
                strokeWidth={8}
                radius={25}
                chartConfig={chartConfig}
                hideLegend={true}
              /> */}
                <View style={styles.nutrientsContainer}>
                <Text style={styles.nutrientsContainer}>{this.state.nutrients[0]}</Text>
                <Text style={styles.infoRecipe}>{this.state.nut_value[0]} %</Text>
              </View>
            </View>


              <View>
              {/* <ProgressChart
                data={{
                  data: [this.state.nut_value[1]]
                }}
                width={80}
                height={80}
                strokeWidth={8}
                radius={25}
                chartConfig={chartConfig}
                hideLegend={true}
              /> */}
                <View style={styles.nutrientsContainer}>
                <Text style={styles.nutrientsContainer}>{this.state.nutrients[1]}</Text>
                <Text style={styles.infoRecipe}>{this.state.nut_value[1]} %</Text>
              </View>
            </View>

            <View>
            {/* <ProgressChart
              data={{
                data: [this.state.nut_value[2]]
              }}
              width={80}
              height={80}
              strokeWidth={8}
              radius={25}
              chartConfig={chartConfig}
              hideLegend={true}
            /> */}
              <View style={styles.nutrientsContainer}>
              <Text style={styles.nutrientsContainer}>{this.state.nutrients[2]}</Text>
              <Text style={styles.infoRecipe}>{this.state.nut_value[2]} %</Text>
            </View>
          </View>

          <View>
          {/* <ProgressChart
            data={{
              data: [this.state.nut_value[3]]
            }}
            width={80}
            height={80}
            strokeWidth={8}
            radius={25}
            chartConfig={chartConfig}
            hideLegend={true}
          /> */}
            <View style={styles.nutrientsContainer}>
            <Text style={styles.nutrientsContainer}>{this.state.nutrients[3]}</Text>
            <Text style={styles.infoRecipe}>{this.state.nut_value[3]} %</Text>
          </View>
        </View>

              </View>

      <View style={[styles.infoContainer,{marginTop:30}]}>
                      <Text style={styles.category}>Attributes</Text>
      </View>

      <View style={[{flex: 1,flexDirection: 'row'}, styles.infoContainer]}>
        <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
          <View style={styles.attributesContainer}>
            <Text style={styles.attributesText}>{this.state.attributes[0]}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
          <View style={styles.attributesContainer}>
            <Text style={styles.attributesText}>{this.state.attributes[1]}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
          <View style={styles.attributesContainer}>
            <Text style={styles.attributesText}>{this.state.attributes[2]}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
          <View style={styles.attributesContainer}>
            <Text style={styles.attributesText}>{this.state.attributes[3]}</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={[{flex: 1,flexDirection: 'row'}, styles.infoContainer]}>
        <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
          <View style={styles.attributesContainer}>
            <Text style={styles.attributesText}>{this.state.attributes[4]}</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
          <View style={styles.attributesContainer}>
            <Text style={styles.attributesText}>{this.state.attributes[5]}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
          <View style={styles.attributesContainer}>
            <Text style={styles.attributesText}>{this.state.attributes[6]}</Text>
          </View>
        </TouchableHighlight>

      </View>

      <View style={[styles.infoContainer,{marginTop:30}]}>
                      <Text style={styles.category}>Ingredients</Text>
      </View>


            <View style={[{flex: 1,flexDirection: 'row'}, styles.infoContainer]}>
              <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
                <View style={styles.ingredientsContainer}>
                  <Text style={styles.ingredientsText}>{this.state.ingredients[0]}</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
                <View style={styles.ingredientsContainer}>
                  <Text style={styles.ingredientsText}>{this.state.ingredients[1]}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
                <View style={styles.ingredientsContainer}>
                  <Text style={styles.ingredientsText}>{this.state.ingredients[2]}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
                <View style={styles.ingredientsContainer}>
                  <Text style={styles.ingredientsText}>{this.state.ingredients[3]}</Text>
                </View>
              </TouchableHighlight>
            </View>


            <View style={[{flex: 1,flexDirection: 'row'}, styles.infoContainer]}>
              <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
                <View style={styles.ingredientsContainer}>
                  <Text style={styles.ingredientsText}>{this.state.ingredients[4]}</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
                <View style={styles.ingredientsContainer}>
                  <Text style={styles.ingredientsText}>{this.state.ingredients[5]}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
                <View style={styles.ingredientsContainer}>
                  <Text style={styles.ingredientsText}>{this.state.ingredients[6]}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='rgb(73,182,77)' onPress={this.props.onPress}>
                <View style={styles.ingredientsContainer}>
                  <Text style={styles.ingredientsText}>{this.state.ingredients[7]}</Text>
                </View>
              </TouchableHighlight>
            </View>


        </View>
      </ScrollView>
    );
  }
}
