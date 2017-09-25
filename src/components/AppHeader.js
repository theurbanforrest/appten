import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import {
  Avatar,
  Icon,
} from 'react-native-elements'
import LocationStatusButton from './LocationStatusButton'

/*-- THE COMPONENT --*/
const AppHeader = (props: AppHeaderProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {

      onMenuPress,
      isLocationSet

    } = props;

  //do functions

    return(
        <View style={{
          //position: 'absolute',
          //top: '0%',
          //right: '0%',
          width: '100%',
          paddingTop: '5%',
          paddingBottom: '2%',
          paddingLeft: '3%',
          height: '10%',
          backgroundColor: 'black', 
          flexDirection: 'row',
          //justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            flex: 3,
            //flexDirection: 'row',
          }}>
            <Icon
              name='magnet'
              type='font-awesome'
              onPress={onMenuPress}
              color='white'
            />
          </View>
          <View style={{
            flex: 21
          }}>
            <Text
              style={{
                color: 'white',
                //fontFamily: 'serif',
                fontSize: 18
              }}
            >
              Grumble.io
            </Text>

            

          </View>
        </View>
    );
}

  //Enter the default values of the props
    AppHeader.defaultProps = {
      //enter the default values here

        //onMenuPress: not setting func by default
        //isLocationSet: not setting bool by default
    };

  //Define the props here
    AppHeader.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        onMenuPress: PropTypes.func,
        isLocationSet: PropTypes.bool,

    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here

    });


export default AppHeader;