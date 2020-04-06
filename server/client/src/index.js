import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import './index.css';

//Component & Reducer
import App from './components/app';
import reducer from "./reducers/reducer";

//Matertial UI
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//Create store for state management
const store = createStore(reducer, applyMiddleware(thunk));



ReactDOM.render(
  <Provider store={store}>
    {/* <MuiThemeProvider> */}
      <App />
    {/* </MuiThemeProvider> */}
  </Provider>,
  document.getElementById('root')
);


