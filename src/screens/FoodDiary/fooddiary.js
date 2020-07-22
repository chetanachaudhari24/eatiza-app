import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from "./style";
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import axios from 'axios';
import {NavigationEvents} from 'react-navigation';
// import { getCategoryName } from '../../data/MockDataAPI';


export default class FoodDiary extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Food Diary',
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
      foodItems : [],
    }
  }




  onPressRecipe = () => {
    this.props.navigation.navigate('ShowAttributes');
  };

  renderRecipes = ({ item }) => (
    <View style={[styles.infoContainer, {marginTop: 5,alignItems:'center'}]}>
      <View style={[styles.infoContainer, {marginTop: 10,flex:1 , flexDirection:'row', backgroundColor:'rgba(74,72,90, 0.2)'}]}>
            <View style = {[styles.infoContainer, {marginTop:5, marginBottom:5, flex:1, flexDirection:'column', justifyContent: 'flex-start'}]}>
              <Text style={styles.category}>Item Name:</Text>
              <Text style={[styles.infoRecipe,{marginLeft: 10}]}>{item.name}</Text>
            </View>

            <View style = {[styles.infoContainer,{flex:1, flexDirection:'column'}]}>
            <View style = {[styles.infoContainer, {flex:1, flexDirection:'row'}]}>
              <Image style={styles.infoPhoto} source={require('../../../assets/icons/fire.png')} />
              <Text style={styles.category}>{item.calories} Cal </Text>
            </View>
            <View style = {styles.infoContainer}>
              <Text style={styles.category}>{item.time}</Text>
            </View>
          </View>

      </View>
    </View>
  );

  updateContents = () =>{
    axios.get(`http://192.168.0.7:5000/fooddiary`)
  .then(response =>{
    // handle success
    console.log(response.data);

    list =[]
    for(i=0;i<response.data.records;i++){
      list.push(
        {
          name: response.data.names[i],
          calories: response.data.calories[i],
          time: response.data.time[i],
        }
      );
    }

    this.setState({
      foodItems: list,
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

  render() {


    var foodItems = [
      {
        name: 'pizza',
        path: 'blah blah',
        time: 'posted today',
      },

      {
        name: 'samosa',
        path: 'blah',
        time: 'posted today',
      },
      {
        name: 'pizza',
        path: '../../../assets/icons/test.jpg',
        time: 'posted yesterday',
      }
    ];

    return (
      <ScrollView>
        <NavigationEvents onDidFocus={this.updateContents} />
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={this.state.foodItems}

          renderItem={this.renderRecipes}

          renderItem={({item}) => this.renderRecipes({item})}
          keyExtractor={item => item.name}
        />
      </ScrollView>
    );
  }
}
