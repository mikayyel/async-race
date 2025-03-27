import axios from 'axios';

export const getCarsFromServer = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:3000/garage');
    return response.data; 
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCarFromServer = async(id) => {
	try {
		const response = await axios.delete(`http://127.0.0.1:3000/garage/${id}`)
		return response.data
	} catch(error) {
		console.log(error.message)
	}
}

export const addCarToServer = async(car) => {
	try {
		const response = await axios.post('http://127.0.0.1:3000/garage', car)
		return response.data
	} catch(error) {
		console.log(error.message)
	}
}

export const updateCarOnServer = async (car) => {
  try {
    const response = await axios.put(`http://127.0.0.1:3000/garage/${car.id}`, car);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};