import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {Button} from '@material-ui/core'
import socketIOClient from "socket.io-client";

function PlayLog() {
   
    return (
        <Button variant="contained" color="primary">
          Hello World
        </Button>
    );
   
}

export default PlayLog