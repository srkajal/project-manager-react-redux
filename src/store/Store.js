import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/RootReducer';
import thunk from 'redux-thunk';

const storeEnhancers = window.__REDUX_DEVTOOLS_MIDDLEWARE_COMPOSE__ || compose;

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));

export default store;