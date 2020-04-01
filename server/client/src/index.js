import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import rootReducer from "./reducers/index";
import './index.css';
import Home from './components/home';


//Create store for state management
// const store = createStore(rootReducer, {}, applyMiddleware(thunk));

{/* <Provider store={store}>
  <Home />
</Provider> */}

ReactDOM.render(
<Home/>,
  document.getElementById('root')
);


