import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import rootReducer from "./reducers/index";
import './index.css';
import App from './components/app';


//Create store for state management
// const store = createStore(rootReducer, {}, applyMiddleware(thunk));

{/* <Provider store={store}>
  <Home />
</Provider> */}

ReactDOM.render(
<App/>,
  document.getElementById('root')
);


