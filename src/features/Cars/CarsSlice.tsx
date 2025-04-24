import {
  addCarToServer,
  deleteCarFromServer,
  getCarsFromServer,
  updateCarOnServer,
} from './CarsAPI.js';
import { getRandomCarName, getRandomColor } from './RandomCarsHelper.js';

// Action Types
const SET_CARS = 'SET_CARS';
const SET_TOTAL_CARS = 'SET_TOTAL_CARS';
const SET_PAGE = 'SET_PAGE';
const ADD_CAR = 'ADD_CAR';
const REMOVE_CAR = 'REMOVE_CAR';
const UPDATE_CAR = 'UPDATE_CAR';
const SET_SELECTED_CAR = 'SET_SELECTED_CAR';
const SET_CARS_LOADING = 'SET_CARS_LOADING';
const SET_CARS_ERROR = 'SET_CARS_ERROR';

// Initial State
export const initialCarsState = {
  cars: [],
  totalCars: 0,
  page: 1,
  limit: 7,
  loading: false,
  error: null,
};

// Reducer Function
export const CarsReducer = (state = initialCarsState, action) => {
  switch (action.type) {
    case SET_CARS:
      return {
        ...state,
        cars: action.payload.cars,
        totalCars: action.payload.totalCars,
        loading: false,
      };
    case SET_TOTAL_CARS:
      return {
        ...state,
        totalCars: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case ADD_CAR: {
      return {
        ...state,
        cars: [...state.cars, action.payload],
        totalCars: state.cars.length + 1,
      };
    }
    case REMOVE_CAR:
      return {
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload),
      };
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
        selectedCar: action.payload,
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
export const selectPage = (state) => state.cars.page;
export const selectTotalCars = (state) => state.cars.totalCars;
export const selectLimit = (state) => state.cars.limit;
export const selectTotalPages = (state) => Math.ceil(state.cars.totalCars / state.cars.limit);
export const selectLoading = (state) => state.cars.loading;
export const selectError = (state) => state.cars.error;

// Action Creators
export const setCars = (cars) => ({
  type: SET_CARS,
  payload: cars,
});

export const setTotalCars = (total) => ({
  type: SET_TOTAL_CARS,
  payload: total,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const addCar = (car) => ({
  type: ADD_CAR,
  payload: car,
});

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

// Thunk for fetching cars from the server
export const getCars = (page = 1, limit = 7) => {
  return (dispatch) => {
    dispatch(setCarsLoading());
    getCarsFromServer(page, limit)
      .then((data) => {
        dispatch(setCars({ cars: data.cars, totalCars: data.totalCars }));
      })
      .catch((error) => {
        dispatch(setCarsError(error.message));
      });
  };
};

// Thunk for deleting the car from the server
export const deleteCarFromList = (id) => {
  return (dispatch, getState) => {
    const { page, limit } = getState().cars;
    deleteCarFromServer(id)
      .then(() => {
        dispatch(removeCar(id));
        const newPage = page > 1 && getState().cars.cars.length === 0 ? page - 1 : page;
        dispatch(setPage(newPage));
        dispatch(getCars(newPage, limit));
      })
      .catch((error) => {
        dispatch(setCarsError(error.message));
      });
  };
};

// Thunk for adding a new car to the server
export const addCarToList = (car) => {
  return (dispatch) => {
    addCarToServer(car)
      .then((data) => {
        dispatch(addCar(data));
      })
      .catch((error) => {
        dispatch(setCarsError(error.message));
      });
  };
};

// Thunk for updating the car in the server
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

//
export const createRandomCars = () => {
  return async (dispatch, getState) => {
    const cars = [];
    for (let i = 0; i < 100; i++) {
      const name = getRandomCarName();
      const color = getRandomColor();
      cars.push({ name, color });
    }

    try {
      const currentPage = getState().cars.page;

      for (let car of cars) {
        const addedCar = await addCarToServer(car);
        dispatch(addCar(addedCar));
      }

      dispatch(getCars(currentPage));
    } catch (error) {
      console.error('Error adding random cars:', error.message);
      dispatch(setCarsError(error.message));
    }
  };
};
