import React from 'react';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

  //define the screens
  import HelloWorld from '../helloworld/HelloWorld'
  import StationFeed from '../stationfeed/StationFeed'
  import StationDetail from '../stationdetail/StationDetail'
  import SuperMap from '../supermap/SuperMap'

/*-- StationFeed Stack --*/
  export const StationFeedStack = StackNavigator({
    StationFeed: {
      screen: StationFeed,
      navigationOptions: {
        title: 'StationFeed'
      },
    },
    StationDetail: {
      screen: StationDetail,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.shortName}`
      }),
    },
  });

  /*-- Tabs --*/
  export const Tabs = DrawerNavigator({
  SuperMap: {
    screen: SuperMap,
    navigationOptions: {
      drawerLabel: 'Super Map',
      drawerIcon: ({ tintColor }) => <Icon name='street-view' type='font-awesome' size={25} color={tintColor} /> ,
    }
  },
  HelloWorld: {
    screen: HelloWorld,
    navigationOptions: {
      drawerLabel: 'Hello World',
      drawerIcon: ({ tintColor }) => <Icon name='smile-o' type='font-awesome' size={25} color={tintColor} />,

    },
  },
  StationsFeed: {
    screen: StationFeedStack,
    navigationOptions: {
      drawerLabel: 'All Stations',
      drawerIcon: ({ tintColor }) => <Icon name='subway' type='font-awesome' size={25} color={tintColor} /> ,
    }
  },
});



  /*-- RootNav --*/
  export const RootNav = StackNavigator(
  	{
  		Tabs: {
  			screen: Tabs,
  		},
  	}, 
  	{
  		mode: 'modal',
  		headerMode: 'none',
  	}
  );

  /*-- Connect --*/
  export default connect(
    state => ({
      //age: state.helloworld.age

    }),
    dispatch => ({
      /*addNewCounter: () => dispatch(actions.newCounter()),
      increment: id => dispatch(actions.increment(id)),
      decrement: id => dispatch(actions.decrement(id)),
      incrementWithDelay: id => dispatch(actions.incrementWithDelay(id))*/
    })
  )(RootNav)