//  Dependencies
import AsyncStorage from '@react-native-community/async-storage';

// Action Types
import {
  ADD_TASK,
  ADD_TASKS,
  CHANGE_IS_OPEN_ADD_TASK_MODAL,
  CHANGE_IS_OPEN_EDIT_TASK_MODAL,
} from '../actionTypes';

const initialState = {
  data: [],
  modals: {
    addTask: false,
    editTask: false,
  },
  taskConfig: [
    {
      id: 0,
      name: 'title',
      label: 'Titulo',
      inputType: 'default',
      nameState: 'title',
      placeholder: 'titulo de la tarea',
      multiline: false,
    },
    {
      id: 1,
      name: 'description',
      label: 'Descripción',
      inputType: 'default',
      nameState: 'description',
      placeholder: 'descripción de la tarea',
      multiline: true,
    },
    {
      id: 2,
      name: 'estimatedTime',
      label: 'Tiempo estimado',
      inputType: 'numeric',
      nameState: 'estimatedTime',
      placeholder: 0,
      multiline: false,
    },
    {
      id: 3,
      name: 'timeWorked',
      label: 'Tiempo trabajado',
      inputType: 'numeric',
      nameState: 'timeWorked',
      placeholder: 0,
      multiline: false,
    },
  ],
  editTaskConfig: [
    {
      id: 0,
      name: 'timeWorked',
      label: 'Sumar tiempo trabajado',
      inputType: 'numeric',
      nameState: 'timeWorked',
      placeholder: '0',
      multiline: false,
    },
  ],
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK: {
      try {
        const data = state.data.concat(action.payload);
        AsyncStorage.setItem('@tasks', JSON.stringify(data))
          .then()
          .catch(error => console.log(error));

        return {...state, data};
      } catch (e) {
        // saving error
      }
    }

    case ADD_TASKS: {
      try {
        AsyncStorage.setItem('@tasks', JSON.stringify(action.payload))
          .then()
          .catch(error => console.log(error));

        return {...state, data: action.payload};
      } catch (e) {
        // saving error
      }
    }

    case CHANGE_IS_OPEN_ADD_TASK_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          addTask: action.payload,
        },
      };

    case CHANGE_IS_OPEN_EDIT_TASK_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          editTask: action.payload,
        },
      };

    default:
      return state;
  }
}
