import { createStore } from 'redux';
import combineReducers from '../reducers/combineReducers';



const store = createStore(combineReducers);

export default store;