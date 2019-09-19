// Dependencies
import {combineReducers} from 'redux';

//  Reducers
import tasks from './tasks.reducer';
import theme from './theme.reducer';

export default combineReducers({
  tasks,
  theme,
});
