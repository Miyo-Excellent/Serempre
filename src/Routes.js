import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Tasks} from './Views';

const AppNavigator = createStackNavigator(
  {
    Tasks: {
      screen: Tasks,
      navigationOptions: {
        headerMode: 'screen',
        title: 'Tareas',
        headerTitleStyle: {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 28,
        },
        headerStyle: {
          backgroundColor: 'hsla(192, 100%, 31%, 1)'
        },
      },
    },
  },
  {
    initialRouteName: 'Tasks',
  },
);

export default createAppContainer(AppNavigator);
