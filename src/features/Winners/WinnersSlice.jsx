import { addWinnerToServer, deleteWinnerFromServer, getWinnersFromServer, updateWinnerOnServer } from './WinnersAPI';

// Action Types
const SET_WINNERS = 'SET_WINNERS';
const ADD_WINNER = 'ADD_WINNER';
const UPDATE_WINNER = 'UPDATE_WINNER';

// Initial State
export const initialWinnersState = {
	winners: [] 
};

// Reducer Function
export const WinnersReducer = (state = initialWinnersState, action) => {
	switch(action.type) {
		case SET_WINNERS: 
			return {
				...state,
				winners: action.payload
			}
		case ADD_WINNER:
			return {
        ...state,
        winners: [...state.winners.winners, action.payload] 
    	};
		case UPDATE_WINNER:
			return {
					...state,
					winners: state.winners.map((winner) => winner.id === action.payload.id ? {...winner, ...action.payload} : winner)
			};
		default: 
			return state;
	}

}

// Selectors
export const selectWinners = (state) => state.winners.winners || [];

// Action Creators 
export const setWinners = (winners) => ({
	type: SET_WINNERS,
	payload: winners,
})

export const addWinner = (winnerData) => ({
	type: ADD_WINNER,
	payload: winnerData,
})

export const updateWinner = (winnerData) => ({
	type: UPDATE_WINNER,
	payload: winnerData,
})

// Thunk for fetching winners from server
export const getWinners = () => {
	return (dispatch) => {
		getWinnersFromServer()
			.then((data) => {
				dispatch(setWinners(data))
			})
			.catch((error) => {
				console.log(error.message)
			})
	}
}

// Thunk for adding the winner to server
export const addWinnerToList = (winnerData) => {
	return (dispatch) => {
		addWinnerToServer(winnerData)
			.then((data) => {
				dispatch(addWinner(data))
			})
			.catch((error) => {
				console.log(error.message)
			})
	}
}

// Thunk for updating the winner in server 
export const updateWinnerInList = (winnerData) => {
	return (dispatch) => {
		updateWinnerOnServer(winnerData)
			.then((data) => {
				dispatch(updateWinner(data))
			})
			.catch((error) => {
				console.log(error.message)
			})
	}
}

// Thunk for deleting the winner from server
export const deleteWinner = (winnerId) => {
	return (dispatch) => {
		deleteWinnerFromServer(winnerId)
			.then((data) => {
				dispatch(getWinners())
				console.log(data)
			})
	}
}