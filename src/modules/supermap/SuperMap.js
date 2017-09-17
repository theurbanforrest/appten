/*------ IMPORTS -----*/

  //packages
    import React, { PropTypes, Component } from 'react'
    import {
      View,
      ScrollView,
      Text,
      StyleSheet,
      TouchableHighlight

    } from 'react-native'
    import { 
      Card,
      List,
      ListItem,
      Icon,
      Badge,
      FormLabel,
      FormInput,
      Button
    } from 'react-native-elements'

  //components and styles 
    import { styles } from './styles'
    import { superMapData } from './data'
    import MapView from 'react-native-maps'
    import StationPreview from '../../components/StationPreview'

  //redux
    import { bindActionCreators } from 'redux'
    import { connect } from 'react-redux'
    //need this for Components instead of pure functions
      import * as Actions from './actions'

/*----- THE COMPONENT -----*/


class SuperMap extends Component {
  //constructor
  //need this for Components instead of pure functions
  constructor(props) {
    super(props);
  }

  //functions
  //add them here to call them as 'this.' in render
    getLat(myStr) {

      let myRegex = /^(\bPOINT\b)..([^\s]+)\s([^\s]+)./.exec(myStr);
      return Number(myRegex[3]);
    }

    getLong(myStr) {

      let myRegex = /^(\bPOINT\b)..([^\s]+)\s([^\s]+)./.exec(myStr);
      return Number(myRegex[2]);
    }

    clearStationPreview(){
      //send to redux
      this.props.actions.clearPreview();

      //close callout

    }

    getLineStops(targetLine){
      //superMapData[i][11] is the string of the lat/long that needs to be regex'd
      //superMapData[i][12] is the string of lines e.g. 'A-C-F' 

      let stopsToDisplay = [];

      //loop - if the line of strings contains the target
      //then add the lat/long string to the array
      //which will later be parsed

      for(i=0;i<superMapData.length;i++){

        //if targetLine matches the line
        if(superMapData[i][12].indexOf(targetLine) > -1){

          //if targetLine is E and superMapData contains 'express'
          let x = /Express/.exec(superMapData[i][12]);

          if(targetLine=='E' && x ){
            //do nothing
          }
          else{
            //add to the array
            stopsToDisplay.push(
              [
                superMapData[i][10],
                superMapData[i][11],
                superMapData[i][12]
              ]
            );
          }
        }
        //else i++
      }

      //return to redux, also clear any preview
      this.props.actions.selectLine(targetLine, stopsToDisplay);
      this.props.actions.clearPreview();

      //return the array
      //console.log(stopsToDisplay);
      return stopsToDisplay;
    }

    getColor(targetLine,data){
       for(i=0;i<data.length;i++){
        if(targetLine == data[i].id){
          return data[i].bg;
        }
        //else i++
       }
       //if no match
       return 'light-gray';
    }


  componentWillMount() {
    
    //set A line as the default
    this.getLineStops('A');
  }

  //render()
  render() {

    const lineList = [
      {
        id:'A',bg:'blue',text:'white'
      },
      {
        id:'C',bg:'blue',text:'white'
      },
      {
        id:'E',bg:'blue',text:'white'
      },
      {
        id:'B',bg:'darkorange',text:'white'
      },
      {
        id:'D',bg:'darkorange',text:'white'
      },
      {
        id:'F',bg:'darkorange',text:'white'
      },
      {
        id:'M',bg:'darkorange',text:'white'
      },
      {
        id:'J',bg:'brown',text:'white'
      },
      {
        id:'Z',bg:'brown',text:'white'
      },
      {
        id:'G',bg:'yellowgreen',text:'white'
      },
      {
        id:'L',bg:'gray',text:'white'
      },
      {
        id:'N',bg:'goldenrod',text:'black'
      },
      {
        id:'Q',bg:'goldenrod',text:'black'
      },
      {
        id:'R',bg:'goldenrod',text:'black'
      },
      {
        id:'W',bg:'goldenrod',text:'black'
      },
      {
        id:'1',bg:'red',text:'white'
      },
      {
        id:'2',bg:'red',text:'white'
      },
      {
        id:'3',bg:'red',text:'white'
      },
      {
        id:'4',bg:'green',text:'white'
      },
      {
        id:'5',bg:'green',text:'white'
      },
      {
        id:'6',bg:'green',text:'white'
      },
      {
        id:'7',bg:'purple',text:'white'
      },
    ]

    //const from the navigator
      //const { id, shortName, longName, area, lines, colors } = this.props.navigation.state.params;

    //functions
      //add them here to call in render only

    //the view
    return (
      <View style={styles.container}>
        <MapView
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            position: 'absolute'
          }}
          initialRegion={{
            latitude: 40.7590,      //specific point (N/E is positive, S/W is negative)
            longitude: -73.9845,    //this is Times Square i.e.
            latitudeDelta: 0.3,     //wideness of view (smaller is more precise)
            longitudeDelta: 0.3,
          }}
        >
        {
          this.props.selectedStops.map( (theStop) => (
            <MapView.Marker
              coordinate={{
                latitude: this.getLat(theStop[1]),
                longitude: this.getLong(theStop[1])
              }}
              pinColor={ this.getColor(this.props.selectedLine,lineList) }
            >
              <MapView.Callout
                tooltip={false}
                onPress={()=>this.props.actions.getPreview(theStop[0])}
              >
                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                  <Text style={{
                    flex: 1,
                    color: 'black'}}
                  >
                    {theStop[0]} >
                  </Text>
                  <Text style={{
                    flex: 1,
                    color: 'gray'
                  }}>
                    {theStop[2]}
                  </Text>
                </View>
              </MapView.Callout>
              
            </MapView.Marker>
          ))
        }
        </MapView>
        <View style={{
          //flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around'
        }}>
          <StationPreview
            visible={this.props.previewedStation ? true : false}
            title={'This is the title'}
            onClearPress={()=>this.clearStationPreview()}
          />
          <View style={{
            //flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: '10%',
            marginLeft: '3%',
            marginRight: '3%',
            //backgroundColor: 'powderblue',
          }}>
            {
              lineList.map( (line) => (
                  <Badge
                    value= {line.id}
                    containerStyle={{
                      backgroundColor: this.props.selectedLine == line.id ? line.bg : 'gainsboro'
                    }}
                    textStyle={{
                      color: this.props.selectedLine == line.id ? line.text : 'white'
                    }}
                    onPress={() => this.getLineStops(line.id) }
                  />
                )
              )
            }
          </View>
        </View>
      </View>
    )
  }//end render
}
//end component


/*----- REDUX CONNECT -----*/

  export default connect(
    //this is mapStateToProps verbosely
      //Which part of the Redux global state does our component want to receive as props?
      (state) => {
        return {
          previewedStation: state.supermap.previewedStation,
          selectedLine: state.supermap.selectedLine,
          selectedStops: state.supermap.selectedStops
        }
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(SuperMap);

/*----- APPENDIX -----*/

/*
  // regex to get lat and long is " ^(\bPOINT\b)..([^\s]+)\s([^\s]+). "  
  // yes include that final period
  // use $2 and $3

  // let gps = superMapData[0].[11]
  // let myRegex = /^(\bPOINT\b)..([^\s]+)\s([^\s]+)./.exec(gps)
  // var long = myRegex[2]
  // var lat = myRegex[3]


*/

  /*
    This works 
          {
            superMapData.map( (stationData) => (
                  <MapView.Marker
                  coordinate={{
                    latitude: this.getLat(stationData[11]),
                    longitude: this.getLong(stationData[11])
                  }}
                >
                  <MapView.Callout
                    tooltip={false}
                  >
                    <Text style={{color: 'gray'}}>
                      {stationData[10]}
                    </Text>
                    <Text style={{color: 'blue'}}>
                      {stationData[12]}
                    </Text>
                  </MapView.Callout>
                </MapView.Marker>
            ))
          }
    */
