import actionTypes from "../actions/actionTypes";

const initialState = {
    profile : {}
}


const profileReducer = (state = initialState,action) => {
    
    switch(action.type){

        case actionTypes.SET_PROFILE:{
            return {
                ...state,
                profile : action.payload
            }
        } 
        
        default : return state
    }
};

export default profileReducer;