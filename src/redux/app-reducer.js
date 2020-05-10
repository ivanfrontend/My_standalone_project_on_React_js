import { getUserData } from "./auth-reducer";

const INITIALAIZED_SUCSSES = 'INITIALAIZED_SUCSSES';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch(action.type){
        case INITIALAIZED_SUCSSES:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }

}

export const initializedSucsses = () => ({type: INITIALAIZED_SUCSSES})

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getUserData())
    Promise.all([promise]).then( () => {
        dispatch(initializedSucsses())
    } )

}


export default appReducer;