import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';

export default class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="UPLOAD PHOTO"
            source={require('../../../assets/icons/Upload.png')}
            onPress={() => {
              navigation.navigate('UploadImage');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="CALORIES TRACKER"
            source={require('../../../assets/icons/Calories.png')}
            onPress={() => {
              navigation.navigate('CalorieCounter');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="FOOD DIARY"
            source={require('../../../assets/icons/Diary.png')}
            onPress={() => {
              navigation.navigate('FoodDiary');
              navigation.closeDrawer();
            }}
          />

          <MenuButton
            title="LOGOUT"
            source={require('../../../assets/icons/Logout.png')}
            onPress={() => {
              navigation.navigate('Signup');
              navigation.closeDrawer();
            }}
          />
        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
