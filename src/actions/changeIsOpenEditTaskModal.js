//  Action Types
import {CHANGE_IS_OPEN_EDIT_TASK_MODAL} from '../actionTypes';

export default function changeIsOpenEditTaskModal({dispatch, visible = false}) {
  dispatch({
    type: CHANGE_IS_OPEN_EDIT_TASK_MODAL,
    payload: visible,
  });
}
