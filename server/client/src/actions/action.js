import axios from 'axios'






/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */

export const loadinitialGameStatusSocket = (socket) => {
	return (dispatch) => {
		// dispatch(clearAllItems())
		socket.on('initialGameStatus',(res)=>{
		   console.dir(res)
		   dispatch(initialItems(res))
	   })
	}	
}

