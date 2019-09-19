//  Action Types
import {ADD_TASK} from '../actionTypes';

export default function addTask({dispatch, task = {}}) {
  dispatch({
    type: ADD_TASK,
    payload: task,
  });
}
