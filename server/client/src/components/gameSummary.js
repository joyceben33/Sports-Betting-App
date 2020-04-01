import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Box from '@material-ui/core/Box'
import socketIOClient from "socket.io-client";
import Typography from '@material-ui/core/Typography';

function GameSummary() {

    return (
        <Box display="flex" justifyContent="space-between">
            <Box>
                <Typography variant="h3" gotterbottom>
                    MIL
                </Typography>
                <Typography variant="h5" gotterbottom>
                    Bucks
                </Typography>
                <Typography variant="body1" gotterbottom>
                    (53-10)
                </Typography>
            </Box>
            <Box>
                <Typography variant="h1" gotterbottom>
                    103 - 133
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3" gotterbottom>
                    LAL
                </Typography>
                <Typography variant="h5" gotterbottom>
                    Lakers
                </Typography>
                <Typography variant="body1" gotterbottom>
                    (48-13)
                </Typography>
            </Box>
        </Box>
    );

}

export default GameSummary