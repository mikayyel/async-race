import axios from 'axios';

const BASE_URL= 'http://127.0.0.1:3000'

export const getWinnersFromServer = async() => {
	try{
		const response = await axios.get(`${BASE_URL}/winners`);
		return response.data;
	}catch(error) {
		console.log(error.message)
	}
}

export const addWinnerToServer = async(winnerData) => {
	try {
		const response = await axios.post(`${BASE_URL}/winners`, winnerData, {
			headers: {
				'Content-Type': 'application/json',
			}
		});

		return response.data

	} catch(error) {
		console.log(error.message)
	}
}

export const updateWinnerOnServer = async(winnerData) => {
	try{
		const response = await axios.put(`${BASE_URL}/winners/${winnerData.id}`, {
			wins: winnerData.wins,
			time: winnerData.time
		}, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		console.log('success in server')
		return response.data

	} catch(error) {
		console.log(error.message)
	}
}

export const deleteWinnerFromServer = async(winnerId) => {
	try {
		const response = await axios.delete(`${BASE_URL}/winners/${winnerId}`)
		return response.data
	} catch(error) {
		console.log(error.message)
	}
}