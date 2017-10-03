// @flow

import { 
  GET_PREVIEW, 
  CLEAR_PREVIEW, 
  SELECT_LINE, 
  SET_MY_LOCATION, 
  CLEAR_MY_LOCATION,
  START_CHECK_IN,
  END_CHECK_IN} from './constants'

export type Action = {
  type: string,
  payload?: {
    //define all possible payloads and their types
      station_id: string,
      station_lines: string,
      selected_line: string
  }
}

export type ActionAsync = (dispatch: Function, getState: Function) => void

//each action should have the following signature.
//  {
//     type: <type of action>,        type is required
//     payload: <the actual payload>  payload is optional. if you don't
//                                    have anything to send to reducer,
//                                    you don't need the payload. for example
//                                    newCounter action
//  }

export const getPreview = (station_id: string, station_lines: string): Action => {
  return {
    type: GET_PREVIEW,
    payload: {
      station_id,
      station_lines
    }
  }
}

export const clearPreview = (): Action => {
  return {
    type: CLEAR_PREVIEW
  }
}



export const selectLine = (selected_line: string, selected_stops: any): Action => {
  return {
    type: SELECT_LINE,
    payload: {
      selected_line,
      selected_stops
    }
  }
}

export const setMyLocation = (myLat: string, myLong: string): Action => {
  return {
    type: SET_MY_LOCATION,
    payload: {
      myLat,
      myLong
    }
  }
}

export const clearMyLocation = (): Action => {
  return {
    type: CLEAR_MY_LOCATION
  }
}

export const startCheckIn = (): Action => {
  return {
    type: START_CHECK_IN
  }
}

export const endCheckIn = (): Action => {
  return {
    type: END_CHECK_IN
  }
}

