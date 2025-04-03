import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { CarsReducer, initialCarsState } from '../features/Cars/CarsSlice';
import { initialWinnersState, WinnersReducer } from '../features/Winners/WinnersSlice';

const store = createStore(combineReducers({
	cars: CarsReducer,
	winners: WinnersReducer,
}), {
	cars: initialCarsState,
	winners: initialWinnersState,
}, applyMiddleware(thunk))

export default store;