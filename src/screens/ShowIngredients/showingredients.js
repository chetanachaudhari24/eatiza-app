import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from "./style";


export default class ShowIngredients extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      headerTitleStyle: {
        fontSize: 16
      }
    };
  };

  constructor(props) {
    super(props);
  }



  renderIngredient = ({ item }) => (
    <TouchableHighlight underlayColor='rgb(73,182,77)'>
      <View style={styles.container}>
        <Image style={styles.photo} source={item.link} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    const { navigation } = this.props;
     // const ingredientsList = navigation.getParam('ingredients');
    const ingredientsList = [
      {
        name: 'tomato',
        link: require("../../../assets/ingredients/tomato.jpg"),
      },
      {
        name: 'tomato',
        link: require("../../../assets/ingredients/tomato.jpg"),
      },
      {
        name: 'tomato',
        link: require("../../../assets/ingredients/tomato.jpg"),
      },
      {
        name: 'tomato',
        link: require("../../../assets/ingredients/tomato.jpg"),
      }

    ];

    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={ingredientsList}
          renderItem={({item}) => this.renderIngredient({item})}
          keyExtractor={item => item.name}
        />

      </View>
    );
  }
}
