import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom'
// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
import './index.css';

//Component & Reducer
import App from './components/app';


//Matertial UI
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//Create store for state management
// const store = createStore(reducer, applyMiddleware(thunk));



ReactDOM.render(
      <App />,
  document.getElementById('root')
);


