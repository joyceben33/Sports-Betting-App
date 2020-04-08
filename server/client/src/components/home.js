import React, { Component } from "react";


//Material UI
import Container from '@material-ui/core/Container'
// Import Components
import PlayLog from "./playLog"
import GameSummary from "./gameSummary"
import BetTracker from "./betTracker"
import PlaceBet from "./placeBet"
import { getGameStatus, getTeams, getNextPlay } from './api';
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';