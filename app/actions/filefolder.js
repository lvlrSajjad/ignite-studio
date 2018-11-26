// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const SET_FOLDER = 'SET_FOLDER';
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';
export const SET_BOILERPLATE = 'SET_BOILERPLATE';

export function setFolderPath(folderPath) {
  return {
    type: SET_FOLDER,
    payload:folderPath
  };
}

export function setProjectName(projectName) {
  return {
    type: SET_PROJECT_NAME,
    payload: projectName
  };
}

export function setBoilerplate(boilerplate) {
  return {
    type: SET_BOILERPLATE,
    payload: boilerplate
  };
}
