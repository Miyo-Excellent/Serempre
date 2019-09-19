/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//  Dependencies
import React, {Component} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

// Store
import store from './store';

//  Routes
import Routes from './Routes';

//  Components
import {Layout} from './components';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={store.getState.theme}>
          <Layout>
            <Routes/>
          </Layout>
        </PaperProvider>
      </StoreProvider>
    );
  }
}

const styles = StyleSheet.create({});
