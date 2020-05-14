import { combineReducers } from 'redux'
import categoryReducer from './categoryReducer';
import profileReducer from './profileReducer';

export default combineReducers({

    categoryReducer : categoryReducer,
    profileReducer: profileReducer,
    
})