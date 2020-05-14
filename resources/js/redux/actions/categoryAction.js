import actionTypes from "./actionTypes"

const categoryAction = {

    setCategories : (categories) => {
        return{
            type: actionTypes.SET_CATEGORIES,
            payload: categories
        }
    }
}

export default categoryAction;