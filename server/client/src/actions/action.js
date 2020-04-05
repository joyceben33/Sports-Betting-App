
import axios from "axios"






/* Used only by actions for sockets */
export const initialItems = (res) => ({
	type: "INITIAL_ITEMS",
	items: res
})

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

