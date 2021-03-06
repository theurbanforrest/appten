import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import {
  Button,
  Icon,
  Badge
} from 'react-native-elements'

import CommentCard from './CommentCard'
import { lineList } from '../modules/supermap/data'

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
      onLinePress,
      onFeedPress,
      onCheckInPress

    } = props;

  //do functions

    function onBadgeLineClick(line){
      //selectedLine = line;
      onLinePress(line);

      return true;
    } 

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

          padding: '3%',
          paddingTop: '10%',
          backgroundColor: 'black',   //need to figure out how to render this properly
        
          }}>
          
          <View>
            <View style={{
            //flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
            <View style={{
              flex: 21,
              flexDirection: 'column',
              alignItems: 'flex-start',
              //backgroundColor: 'pink'
            }}>
              <View>
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                }}
                >
                  {stationName}
                </Text>
              </View>
            </View>
            <View style={{
              flex: 3,
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              //backgroundColor: 'violet'
            }}>
              <Icon 
                name='close'
                color='white'
                type='font-awesome'
                onPress={onClearPress}
              />
            </View>
          </View>
          <View style={{
            marginTop: '3%',
            //backgroundColor: 'pink',
            flexDirection: 'row'
          }}>
            <View style={{
              flex: 13,
              //backgroundColor: 'powderblue'
            }}>
              <View style={{
                //flex: 1,
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
                          onPress={()=> onBadgeLineClick(line)}//console.log('this should be some action from redux')}
                        />
                      ))
                  }
              </View>
              <View style={{
                marginTop: '6%'
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 14,
                }}>
                  Last 30 mins:
                </Text>
              </View>
              <View style={{
                marginTop: '3%'
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 14,
                }}>
                  12 Too Crowded
                </Text>
                <Text style={{
                  color: 'white',
                  fontSize: 14,
                }}>
                  5 Long Wait
                </Text>
              </View>
            </View>
            <View style={{
              flex: 11,
              flexDirection: 'row',
              alignItems: 'space-between',
              justifyContent: 'flex-end',
              //backgroundColor: 'violet'
            }}>
              <Icon
                reverse={true}
                name='meh-o'
                type='font-awesome'
                color='purple'
                onPress={onLinePress}
              />
              <Icon
                reverse={true}
                name='clock-o'
                type='font-awesome'
                color='purple'
                onPress={onLinePress}
              />
              <Icon
                reverse={true}
                name='comment-o'
                type='font-awesome'
                color='purple'
                onPress={onFeedPress}
              />
            </View>
          </View>
            <View style={{
              backgroundColor: 'black'
            }}>
              <CommentCard
                title={'fochin82'}
                imageSrc={'https://randomuser.me/api/portraits/men/18.jpg'}
                comment={'omg this is like the second day that this gawdam train has been >15 mins late.  wahhh'}
                isLiked={true}
                likeCount={18}
                onLikePress={()=> console.log('liked the stationpreview comment')}
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
        //onFeedPress: not setting func by default
    };

  //Define the props here
    StationPreview.propTypes = {
      //define the types here  e.g. string, object, func, any, bool, number
      //oneOfType([array of types])

        stationName: PropTypes.string,
        visible: PropTypes.bool,
        onClearPress: PropTypes.func,
        onLinePress: PropTypes.func,
        lines: PropTypes.any,
        selectedLine: PropTypes.string,
        onFeedPress: PropTypes.func,
        onCheckInPress: PropTypes.func,

    };

  //Define styles
    const styles = StyleSheet.create({
      //enter styles here

    });


export default StationPreview;

/** APPENDIX



**/