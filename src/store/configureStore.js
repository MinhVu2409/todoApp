import { createStore, combineReducers } from "redux";

import DataApp from '../reducers/DataApp';

const rootReducer = combineReducers({
    DataApp,
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;