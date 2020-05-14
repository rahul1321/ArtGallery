import React from 'react';
import actionTypes from './actionTypes';

const profileAction = {
    setProfile : (profile) =>{
        return {
            type: actionTypes.SET_PROFILE,
            payload: profile
        }
    }

};

export default profileAction;