// @flow

/*
LocationStatusButton: a clickable button that is either on or off
*/

import React, { PropTypes } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { Button, Icon } from 'react-native-elements'


/*-- THE COMPONENT --*/
const LocationStatusButton = (props: LocationStatusButtonProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    
    const {
      isSelected,
      onIconPress
    } = props;

  //do functions
    let whichColor;

    if(isSelected==true){
      whichColor = 'purple'
    } else {
      whichColor = 'blue'
    }
  
    return(
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Icon
            reverse={true}
            //raised={isSelected}
            name='street-view'
            color='purple'
            type='font-awesome'
            onPress={onIconPress}
          />
      </View>

    )
}

  //Enter the default values of the props
    LocationStatusButton.defaultProps = {
      //enter the default values here

        isSelected: false,
        //onIconPress: not setting func by default
    };

  //Define the props here
    LocationStatusButton.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])


        isSelected: PropTypes.bool,
        onIconPress: PropTypes.func

    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here
    });

export default LocationStatusButton;