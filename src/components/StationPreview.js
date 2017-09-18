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

import { lineList } from '../modules/supermap/data';

/*-- THE COMPONENT --*/
const StationPreview = (props: StationPreviewProps) => {

  //define constants to take in as props
  //e.g. const { all, the, things } = props
    const {
      stationName,
      lines,
      selectedLine,
      visible,
      onClearPress,
      onLinePress

    } = props;

  //do functions

    function getBackgroundColor(targetLine,data){
       for(i=0;i<data.length;i++){
        if(targetLine == data[i].id){
          return data[i].bg;
        }
        //else i++
       }
       //if no match
       return 'gainsboro';
    }

    function getTextColor(targetLine,data){
       for(i=0;i<data.length;i++){
        if(targetLine == data[i].id){
          return data[i].text;
        }
        //else i++
       }
       //if no match
       return 'white';
    }
  //if visible is false, return nothing
  if(visible){
    return(
        <View style={{
          position: 'absolute',
          top: '75%',
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
                          value= {line}
                          containerStyle={{
                            backgroundColor: getBackgroundColor(line,lineList) //keeping static, not connected to selectedLine
                          }}
                          textStyle={{
                            color: getTextColor(line,lineList) //keeping static, not connected to selectedLine
                          }}
                          onPress={onLinePress}
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
        //selectedLine: not setting string by default
    };

  //Define the props here
    StationPreview.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        stationName: PropTypes.string,
        visible: PropTypes.bool,
        onClearPress: PropTypes.func,
        lines: PropTypes.any,
        onLinePress: PropTypes.func,
        selectedLine: PropTypes.string

    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here

    });


export default StationPreview;