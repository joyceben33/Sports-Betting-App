import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {loadinitialGameStatusSocket} from '../actions/action'
import io from "socket.io-client"

//Material UI
import Container from '@material-ui/core/Container'
// Import Components
import PlayLog from "./playLog"
import GameSummary from "./gameSummary"
import BetTracker from "./betTracker"
import PlaceBet from "./placeBet"
// import { subscribeToTimer } from './api';

let socket
const mapStateToProps = (state = {}) => {
	// console.dir(state)
    return {...state};
};
class App extends Component {
    constructor(props) {
        super(props);
        const {dispatch} = this.props

        socket = io.connect("http://localhost:5000")
	   console.dir(socket)
	   dispatch(loadinitialGameStatusSocket(socket))

    }

    componentWillUnmount() {
        socket.disconnect()
        alert("Disconnecting Socket as component will unmount")
    }

    render() {
        const {dispatch} = this.props

        return (
            <Container maxWidth="lg">
                {/* <div className="App">
                    <p className="App-intro">
                        The time is: {this.state.timestamp}
                    </p>
                </div> */}
                <div>

                </div>
                <GameSummary />
                <PlayLog />
                <BetTracker />
                <PlaceBet />
            </Container>
        )
    }
}

export default App


