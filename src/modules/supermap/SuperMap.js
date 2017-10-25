/*------ IMPORTS -----*/

  //packages
    import React, { PropTypes, Component } from 'react'
    import {
      View,
      ScrollView,
      Text,
      StyleSheet,
      TouchableHighlight,
      StatusBar,
      Image,
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
    import { superMapData, lineList } from './data'
    import MapView from 'react-native-maps'
    import StationPreview from  '../../components/StationPreview' //'../stationpreview/StationPreview'
    import LocationStatusButton from '../../components/LocationStatusButton'
    import AppHeader from '../../components/AppHeader'
    import CheckInFlow from '../checkinflow/CheckInFlow'

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

      //return to redux, trying without auto clearing preview
      this.props.actions.selectLine(targetLine, stopsToDisplay);
      //this.props.actions.clearPreview();

      //return the array
      //console.log(stopsToDisplay);
      return stopsToDisplay;
    }

    getStationLines(linesString){

      let badgesToDisplay = [];
      let myArr = linesString.split('-');

      for(i=0;i<myArr.length;i++){

        badgesToDisplay.push(
          [
            myArr[i]
          ]
        );
      }

      return badgesToDisplay;
    }

    getBackgroundColor(targetLine,data){
       for(i=0;i<data.length;i++){
        if(targetLine == data[i].id){
          return data[i].bg;
        }
        //else i++
       }
       //if no match
       return 'gainsboro';
    }

    getTextColor(targetLine,data){
       for(i=0;i<data.length;i++){
        if(targetLine == data[i].id){
          return data[i].text;
        }
        //else i++
       }
       //if no match
       return 'white';
    }

    onChildChanged(targetLine){
      this.props.actions.selectLine(targetLine);
    }

    clickMyLocationButton(){
      navigator.geolocation.getCurrentPosition(
        (position) => {

          this.props.actions.setMyLocation(position.coords.latitude,position.coords.longitude);

        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );

      return true;
    }

    componentWillMount() {
      //set A line as the default
      this.getLineStops('A');
    }

    hasObject(obj,val){

    //if record already exists, set true
    if(Object.values(obj).indexOf(val) > -1) {

        return true;
      }
      //else false
      else return false;
    }

    toggleCheckInStatus() {

      if(this.props.checkInIsComplete){

        this.props.actions.startCheckIn();
      }

      else this.props.actions.endCheckIn();
    }

  //render()
  render() {

    //const from the navigator
      //const { id, shortName, longName, area, lines, colors } = this.props.navigation.state.params;

    //functions
      //add them here to call in render only

    //the view
    return (
      <View style={styles.container}>
        <StatusBar
          //backgroundColor="black"
          barStyle="light-content"
        />
        <MapView
          style={styles.mapview}
          initialRegion={{
            latitude: 40.7590,      //specific point (N/E is positive, S/W is negative)
            longitude: -73.9845,    //this is Times Square i.e.
            latitudeDelta: 0.05,     //wideness of view (smaller is more precise)
            longitudeDelta: 0.05,
          }}
        >
          {
            this.props.selectedStops.map( (theStop) => (
              <MapView.Marker
                coordinate={{
                  latitude: this.getLat(theStop[1]),
                  longitude: this.getLong(theStop[1])
                }}
                //image='http://riseandpineco.com/appten/meh.png'
                pinColor={ this.getBackgroundColor(this.props.selectedLine,lineList) }
                onPress={ this.props.previewedStation ? ()=>this.props.actions.getPreview(theStop[0],this.getStationLines(theStop[2])) : null } //this.getStationLines(theStop[0])) : null }
              >
                <MapView.Callout
                  tooltip={false}
                  onPress={()=>this.props.actions.getPreview(theStop[0],this.getStationLines(theStop[2]))} //this.getStationLines(theStop[0]))}
                >
                  <View>
                    <Text style={{
                      color: 'black'}}
                    >
                      {theStop[0]} >
                    </Text>
                    <Text style={{
                      color: 'gray'
                    }}>
                      {theStop[2]}
                    </Text>
                    <Text style={{
                      color: 'gray'
                    }}>
                      Click for details
                    </Text>
                  </View>
                </MapView.Callout>
                
              </MapView.Marker>
            ))
          }
          <MapView.Marker
            coordinate={{
              latitude: this.props.myLocation.lat,
              longitude: this.props.myLocation.long
            }}
            pinColor='black'
          />
        </MapView>
        
        <View style = {styles.stationpreview}>
          
          <StationPreview
            visible={this.props.previewedStation ? true : false}
            stationName={ this.props.previewedStation }
            onClearPress={()=>this.clearStationPreview()}
            lines={ this.props.previewedStationLines }//['BB','green','white'] }//this.props.previewedStationLines }
            selectedLine = { this.props.selectedLine }
            onLinePress = {()=> this.props.navigation.navigate('SettingsStack')}
            onFeedPress = {()=> this.props.navigation.navigate('LineFeed',{
                area: 'Queens',
                colors: 'blue,orange,purple',
                id: 4,
                lines: 'E,F,7',
                longName: 'Long Name',
                shortName: 'The Feed'
              })}
            onCheckInPress = {() => this.toggleCheckInStatus()}
            onDismiss = {() => this.props.navigation.navigate('SuperMap')}
          >
          </StationPreview>
        </View>
        <View style={styles.lineandmenucontainer}>
          <View style={styles.lineselector}>
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
          <View style={styles.appheader}>
          <AppHeader
            onMenuPress={()=>this.props.navigation.navigate('DrawerOpen')}
            isLocationSet={ (this.props.myLocation.lat) ? true : false }
          />
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
          previewedStationLines: state.supermap.previewedStationLines,
          selectedLine: state.supermap.selectedLine,
          selectedStops: state.supermap.selectedStops,
          myLocation: state.supermap.myLocation,
          checkInIsComplete: state.supermap.checkInIsComplete,
          //tagline: state.stationfeed.targetLine   //this works, able to get ANYTHING from redux state
        } 
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(SuperMap);

/*----- APPENDIX -----*/