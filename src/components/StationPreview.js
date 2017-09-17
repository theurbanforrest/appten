import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import {
  Button,
  Icon,
  Badge
} from 'react-native-elements';

/*-- THE COMPONENT --*/
const StationPreview = (props: StationPreviewProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {
      stationName,
      lines,
      visible,
      onClearPress,
      onLinePress

    } = props;

  //do functions

  //if lines was set, displayBadges is true
  //let displayBadges = false;
  //if(lines){
  //  let displayBadges = true;
  //}

  //if visible is false, return nothing
  if(visible){
    return(
        <View style={{
          position: 'absolute',
          top: '65%',
          right: '0%',
          width: '100%',
          padding: '3%',
          height: '100%',
          backgroundColor: 'black',
        }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <View style={{
              flex: 21,
            }}>
              <View>
                <Text style={{
                  color: 'white',
                  fontSize: 24,
                }}
                >
                  {stationName}
                </Text>
              </View>
              <View style={{
                flex: 1,
                flexDirection: 'row'
              }}>
                  {
                    lines.map( (line) => (
                          <Badge
                            value= {line[0]}
                            containerStyle={{
                              backgroundColor: line[1]
                            }}
                            textStyle={{
                              color: line[2]
                            }}
                            onPress={() => this.getLineStops(line.id) }
                          />
                      ))
                  }
              </View>
            </View>

            <View style={{
              flex: 3,
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}>
              <Icon 
                name='close'
                color='purple'
                type='font-awesome'
                onPress={onClearPress}
              />
            </View>

          </View>
      </View>
    )
  } else return false;
    
}

  //Enter the default values of the props
    StationPreview.defaultProps = {
      //enter the default values here

        stationName: 'Howzit braddah',
        visible: true,
        //onClearPress: not setting func by default
        //lines: not setting array by default
        //onLinePress: not setting func by default
    };

  //Define the props here
    StationPreview.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        stationName: PropTypes.string,
        visible: PropTypes.bool,
        onClearPress: PropTypes.func,
        lines: PropTypes.any,
        onLinePress: PropTypes.func

    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here

    });


export default StationPreview;