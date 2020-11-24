import React from 'react';
import ReactDOM from 'react-dom';


// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
import './index.css';

//Component & Reducer
import App from './components/app';


//Matertial UI
// import Container from '@material-ui/core/Container'
// import { Typography } from "@material-ui/core";
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
//Create store for state management
// const store = createStore(reducer, applyMiddleware(thunk));



ReactDOM.render(

    <App />,
  document.getElementById('root')
);


