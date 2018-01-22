import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import PropTypes from 'prop-types';
import reducers from './ducks';
import sagas from './sagas';
import AppNavigator from './routeConfig';
import logger from './loggerConfig';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];

// middlewares.push(logger);

const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);

sagaMiddleware.run(sagas);

export const App = ({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav,
    })}
  />
);

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const root = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

export default root;
