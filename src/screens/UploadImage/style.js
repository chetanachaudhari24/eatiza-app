const React = require("react-native");

// const { StyleSheet } = React;
import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

export default {
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  carouselContainer: {
    minHeight: 250
  },
  carousel: {},

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    margin: 15
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },

  nutrientsContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',

  },

  attributesContainer: {
    flex: 1,
    height: 30,
    width: 80,
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 100,
    borderColor: '#2cd18a',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#2cd18a'
  },
  attributesText: {
    fontSize: 14,
    color: '#2cd18a'
  },
  maybeRenderUploading: {
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
    },
  maybeRenderContainer: {
        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
          height: 4,
          width: 4,
    },
    shadowRadius: 5,
        width: 250,
      },

    maybeRenderImageContainer: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
      },
      maybeRenderImage: {
        height: 250,
        width: 250,
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
      maybeRenderImageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
      },

      ButtonContainer: {
        // flex: 1,
        height: 50,
        width: 270,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100,
        borderColor: '#2cd18a',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
        // backgroundColor: '#2cd18a'
      },
      Buttontext: {
        fontSize: 14,
        color: '#2cd18a'
      }
};
