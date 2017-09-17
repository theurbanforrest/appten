import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import {
  Button
} from 'react-native-elements';

/*-- THE COMPONENT --*/
const StationPreview = (props: StationPreviewProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {
      title,
      visible,
      onClearPress

    } = props;

  //do functions

  //if visible is false, return nothing
  if(visible){
    return(
        <View style={{
          position: 'absolute',
          top: '70%',
          right: '0%',
          width: '100%',
          padding: '3%',
          height: '30%',
          backgroundColor: 'powderblue'
        }}>
          <Text>
            {title}
          </Text>
          <Button
          title='Close'
          onPress={onClearPress}
        />
      </View>
    )
  } else return false;
    
}

  //Enter the default values of the props
    StationPreview.defaultProps = {
      //enter the default values here

        title: 'Howzit braddah',
        visible: true,
        //onClearPress: not setting by default

    };

  //Define the props here
    StationPreview.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        title: PropTypes.string,
        visible: PropTypes.bool,
        onClearPress: PropTypes.func,

    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here

    });


export default StationPreview;