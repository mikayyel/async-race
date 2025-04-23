import axios from 'axios';

const BASE_URL= 'http://127.0.0.1:3000'

export const getCarsFromServer = async (page = 1, limit = 7) => {
  try {
    const response = await axios.get(`${BASE_URL}/garage`, {
      params: { _page: page, _limit: limit }
    });
    return {
      cars: response.data,
      totalCars: parseInt(response.headers['x-total-count'], 10)
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCarFromServer = async(id) => {
	try {
		const response = await axios.delete(`${BASE_URL}/garage/${id}`)
		return response.data
	} catch(error) {
		console.log(error.message)
	}
}

export const addCarToServer = async(car) => {
	try {
		const response = await axios.post(`${BASE_URL}/garage`, car)
		return response.data
	} catch(error) {
		console.log(error.message)
	}
}

export const updateCarOnServer = async(car) => {
  try {
    const response = await axios.put(`${BASE_URL}/garage/${car.id}`, car);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const driveCar = async(car) => {
	try {
		const response = await axios.patch(`${BASE_URL}/engine`, null, {
			params: {
				id: car.id, 
				status: "drive"
			}
		});
		return response.data;
	} catch(error) {
		console.log(error.message)
	}
}

export const startCarEngine = async(car) => {
	try {
		const response = await axios.patch(`${BASE_URL}/engine`, null, {
			params: {
				id: car.id, 
				status: "started"
			}
		});
		return response.data;
	} catch(error) {
		console.log(error.message)
	}
}

export const stopCarEngine = async(car) => {
	try {
		const response = await axios.patch(`${BASE_URL}/engine`, null, {
			params: {
				id: car.id, 
				status: "stopped"
			}
		});
		return response.data;
	} catch(error) {
		console.log(error.message)
	}
}