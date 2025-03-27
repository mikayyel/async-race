import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { CarsReducer, initialCarsState } from '../features/Cars/CarsSlice';

const store = createStore(combineReducers({
	cars: CarsReducer,
}), {
	cars: initialCarsState,
}, applyMiddleware(thunk))

export default store;