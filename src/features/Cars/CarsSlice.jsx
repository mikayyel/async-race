import { addCarToServer, deleteCarFromServer, getCarsFromServer, updateCarOnServer } from './CarsAPI';

// Action Types
const SET_CARS = 'SET_CARS';
const ADD_CAR = 'ADD_CAR';
const REMOVE_CAR = 'REMOVE_CAR';
const UPDATE_CAR = 'UPDATE_CAR';
const SET_SELECTED_CAR = 'SET_SELECTED_CAR';
const SET_CARS_LOADING = 'SET_CARS_LOADING';
const SET_CARS_ERROR = 'SET_CARS_ERROR';

// Initial State
export const initialCarsState = {
  cars: [],
  loading: false,
  error: null,
};

// Reducer Function
export const CarsReducer = (state = initialCarsState, action) => {
  switch (action.type) {
    case SET_CARS:
      return {
        ...state,
        cars: action.payload,
        loading: false,
      };
		case ADD_CAR: {
			return {
				...state,
				cars: [...state.cars, action.payload]
			}
		}
		case REMOVE_CAR:
			return {
				...state,
				cars: state.cars.filter((car) => car.id !== action.payload)
			}
		case UPDATE_CAR:  
			return {
				...state,
				cars: state.cars.map((car) =>
					car.id === action.payload.id ? { ...car, ...action.payload } : car
				),
			};
    case SET_SELECTED_CAR:
      return {
        ...state,
        selectedCar: action.payload,  // Store selected car
      };
    case SET_CARS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_CARS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Selectors
export const selectCars = (state) => state.cars.cars;
export const selectSelectedCar = (state) => state.cars.selectedCar;
export const selectLoading = (state) => state.cars.loading;
export const selectError = (state) => state.cars.error;

// Action Creators
export const setCars = (cars) => ({
  type: SET_CARS,
  payload: cars,
});

export const addCar = (car) => ({
	type: ADD_CAR,
	payload: car
})

export const removeCar = (id) => ({
  type: REMOVE_CAR,
  payload: id,
});

export const setCarsLoading = () => ({
  type: SET_CARS_LOADING,
});

export const setCarsError = (error) => ({
  type: SET_CARS_ERROR,
  payload: error,
});

export const updateCar = (car) => ({
  type: UPDATE_CAR,
  payload: car,
});

export const setSelectedCar = (car) => ({
  type: SET_SELECTED_CAR,
  payload: car,
});

// Thunk to fetch cars from the server
export const getCars = () => {
  return (dispatch) => {
    dispatch(setCarsLoading()); 
    getCarsFromServer()
      .then((data) => {
        dispatch(setCars(data));
      })
      .catch((error) => {
        dispatch(setCarsError(error.message)); 
      });
  };
};

// Thunk to delete a car from the server
export const deleteCarFromList = (id) => {
  return (dispatch) => {
    deleteCarFromServer(id) 
      .then(() => {
        dispatch(removeCar(id)); 
      })
      .catch((error) => {
        dispatch(setCarsError(error.message)); 
      });
  };
};

// Thunk to add a new car to the server
export const addCarToList = (car) => {
	return (dispatch) => {
		addCarToServer(car)
			.then((data) => {
				dispatch(addCar(data))
			})
			.catch((error) => {
        dispatch(setCarsError(error.message)); 
      });
	}
}

// Thunk to update the car to the server
export const updateCarInList = (car) => {
  return (dispatch) => {
    updateCarOnServer(car) 
      .then((data) => {
        dispatch(updateCar(data)); 
      })
      .catch((error) => {
        dispatch(setCarsError(error.message));
      });
  };
};