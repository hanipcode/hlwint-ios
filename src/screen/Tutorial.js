import React from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import Swiper from 'react-native-swiper';
import AssetManager from '../assets';
import TutorialSlide from '../components/TutorialSlide';

// const styles = StylesManager.tutorial;
const resetToHome = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: 'Home',
    }),
    NavigationActions.navigate({
      routeName: 'Home',
    }),
  ],
});

const Tutorial = ({ navigation }) => (
  <Swiper loop={false} showsButtons horizontal showsHorizontalScrollIndicator>
    <TutorialSlide
      slideImage={AssetManager.tutorialSlide1}
      slideText={AssetManager.tutorialSlide1Text}
    />
    <TutorialSlide
      slideImage={AssetManager.tutorialSlide2}
      slideText={AssetManager.tutorialSlide2Text}
    />
    <TutorialSlide
      slideImage={AssetManager.tutorialSlide3}
      slideText={AssetManager.tutorialSlide3Text}
    />
    <TutorialSlide
      slideImage={AssetManager.tutorialSlide4}
      slideText={AssetManager.tutorialSlide4Text}
      isLast
      onPress={() => navigation.dispatch(resetToHome)}
    />
  </Swiper>
);

Tutorial.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default Tutorial;
