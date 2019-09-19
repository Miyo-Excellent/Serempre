//  Dependencies
import AsyncStorage from '@react-native-community/async-storage';

//  Action Types
import {ADD_TASKS} from '../actionTypes';

export default function addTasks({dispatch, tasks = {}}) {
  dispatch({
    type: ADD_TASKS,
    payload: tasks,
  });
}
