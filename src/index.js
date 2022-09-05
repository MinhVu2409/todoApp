import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


//---thu vien Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

// Redux import tu index
import appReducers from "./reducers/index";

// npm install --save redux-devtools-extension -----
import { composeWithDevTools } from "redux-devtools-extension";

// Redux-Saga
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas/";


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  appReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
  
);

// Run Saga
sagaMiddleware.run(mySaga)

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  
  document.getElementsByTagName("BODY")[0]
);

reportWebVitals();
