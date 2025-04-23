import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { CarsReducer, initialCarsState } from '../features/Cars/CarsSlice.tsx';
import { initialWinnersState, WinnersReducer } from '../features/Winners/WinnersSlice.tsx';

const store = createStore(combineReducers({
	cars: CarsReducer,
	winners: WinnersReducer,
}), {
	cars: initialCarsState,
	winners: initialWinnersState,
}, applyMiddleware(thunk))

export default store;