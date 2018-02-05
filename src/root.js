import React from 'react';
import codepush from 'react-native-code-push';
import { addNavigationHelpers } from 'react-navigation';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import createSagaMiddleware from 'redux-saga';
import PropTypes from 'prop-types';
import reducers from './ducks';
import sagas from './sagas';
import AppNavigator from './routeConfig';
import logger from './loggerConfig';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

middlewares.push(logger);

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  blacklist: ['nav', 'loginReducer'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = compose(applyMiddleware(...middlewares))(createStore)(persistedReducer);
const persistor = persistStore(store);

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
    <PersistGate loading={null} persistor={persistor}>
      <AppWithNavigationState />
    </PersistGate>
  </Provider>
);

export default codepush({
  installMode: codepush.InstallMode.ON_NEXT_RESUME,
  checkFrequency: codepush.CheckFrequency.ON_APP_RESUME,
})(root);
