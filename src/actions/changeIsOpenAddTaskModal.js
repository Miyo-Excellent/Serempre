//  Action Types
import {CHANGE_IS_OPEN_ADD_TASK_MODAL} from '../actionTypes';

export default function changeIsOpenAddTaskModal({dispatch, visible = false}) {
  dispatch({
    type: CHANGE_IS_OPEN_ADD_TASK_MODAL,
    payload: visible,
  });
}
