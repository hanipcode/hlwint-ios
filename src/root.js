import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import PropTypes from 'prop-types';
import reducers from './ducks';
import sagas from './sagas';
import AppNavigator from './routeConfig';

// export const AppNavigator = StackNavigator(routeConfig);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];

const logger = createLogger({
  stateTransformer: (state) => {
    const newState = {};
    /* eslint-disable */
    for (const i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }
    /* eslint-enable */
    return newState;
  },
});

middlewares.push(logger);

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
