import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
//Material UI
import Container from '@material-ui/core/Container'
// Import Components
import App from './app'
import { getGameStatus, getTeams, getNextPlay } from './api';
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
class Home extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                                <Link to="/app" >App</Link>
                            </li>
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path='/app' component={App} />
                    </Switch>
                </div>
            </BrowserRouter>

        )
    }
}

export default Home 