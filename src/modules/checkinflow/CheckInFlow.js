/*------ IMPORTS -----*/

  //packages
    import React, { PropTypes, Component } from 'react'
    import {
      View,
      Text,
    } from 'react-native'
    import { 
      Button
    } from 'react-native-elements'

  //components and styles 
    import { styles } from './styles'

  //redux
    import { bindActionCreators } from 'redux'
    import { connect } from 'react-redux'
    //need this for Components instead of pure functions
      import * as Actions from './actions'

/*----- THE COMPONENT -----*/


class CheckInFlow extends Component {
  //constructor
  //need this for Components instead of pure functions
  constructor(props) {
    super(props);
  }

  //functions
  //add them here to call them as 'this.' in render
    

  //render()
  render() {

    return (

      <View style={{
          position: 'absolute',
          top: '12%',
          right: '0%',
          width: '100%',
          padding: '3%',
          height: '63%',
          backgroundColor: '#00000080',
        }}>

          <Text>Hello World</Text>

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
          isComplete: state.checkinflow.isComplete,
          stationId: state.checkinflow.stationId,
        } 
      },
    //this is mapDispatchToProps verbosely
      //Which action creators does it want to receive by props?
      (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
      }),
  )(CheckInFlow);

/*----- APPENDIX -----*/

