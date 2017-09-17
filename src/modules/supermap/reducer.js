// @flow

import { handleActions } from 'redux-actions'
import { GET_PREVIEW, SELECT_LINE, CLEAR_PREVIEW } from './constants'



type superMapState = {
  previewedStation: string,
  previewedStationLines: string,
  selectedLine: string,
  selectedStops: any
}

const initialState:
  superMapState = {
    previewedStation: '',
    previewedStationLines: '',
    selectedLine: '',
    selectedStops:
      [
        [
          'Astor Pl',
          'POINT (-73.99106999861966 40.73005400028978)',
          '4-6-6 Express'
        ]
      ]
  }

//you can do better here, I was just showing that you need to make a new copy
//of state. It is ok to deep copy of state. It will prevent unseen bugs in the future
//for better performance you can use immutableJS

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions(
  {
    [GET_PREVIEW]: (state: superMapState, action) => {
      //get info from action and state
        const { payload: {station_id,station_lines} } = action;
        const { previewedStation, previewedStationLines } = state;

      //set station_id into previewedStation and return state
        return {
          ...state,
          previewedStation: station_id,
          previewedStationLines: station_lines,
        }
    },
    //add other reducers here
    [CLEAR_PREVIEW]: (state: superMapState, action) => {
      //get info from action and state
        //const {} = action;
        const { previewedStation, previewedStationLines } = state;

      //set station_id into previewedStation and return state
        return {
          ...state,
          previewedStation: null,
          previewedStationLines: null,
        }
    },
    [SELECT_LINE]: (state: superMapState, action) => {
      //get info from action and state
        const { payload: {selected_line,selected_stops} } = action;
        const { selectedLine } = state;

      //set station_id into previewedStation and return state
        return {
          ...state,
          selectedLine: selected_line,
          selectedStops: selected_stops
        }
    },
  },
initialState
);