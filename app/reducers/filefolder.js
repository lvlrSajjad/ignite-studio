// @flow
import { SET_BOILERPLATE, SET_FOLDER, SET_PROJECT_NAME } from '../actions/filefolder';
import type { Action } from './types';

const defaultState = {
  projectName:'',
  folderPath:'',
  boilerplate:''
};

export default function filefolder(state=defaultState, action: Action) {
  switch (action.type) {
    case SET_FOLDER:
      return {...state,folderPath:action.payload[0]};
    case SET_PROJECT_NAME:
      return {...state,projectName:action.payload};
    case SET_BOILERPLATE:
      return {...state,boilerplate:action.payload};
    default:
      return state;
  }
}
