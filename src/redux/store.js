import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

let store;

function configureStore() {
    store = createStore(rootReducer, applyMiddleware(thunk));
    return store;
}

function getStore() {
    return store;
}

export { configureStore, getStore };
