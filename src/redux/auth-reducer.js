import {authAPI, registrAPI} from "../api/api";
const REGISTER_PROGRES = 'REGISTER_PROGRES'
const REGISTRATION_COMPLETED = 'REGISTRATION_COMPLETED'
const SET_USER_DATA = 'SET_USER_DATA'
let initialState = {
    registerProgres: false,
    registrationСompleted: false,
    user: {
        id: null,
        email: null,
        name: null,
        isAuth: false
    }
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTER_PROGRES:
            return {
                ...state,
                registerProgres: action.isFetching
            }
        case REGISTRATION_COMPLETED:
            return {
                ...state,
                registrationСompleted: action.isFetching
            }
        case SET_USER_DATA:
            return {
                ...state,
                user:  action.payload
            }

        default:
            return state;
    }

}

export const registerProgres = (isFetching) => ( {type: REGISTER_PROGRES , isFetching } );
export const registrationСompleted = (isFetching) => ( {type: REGISTRATION_COMPLETED , isFetching } );
export const setUserData = (id, email, name, isAuth) => ( {type: SET_USER_DATA, payload: {id, email, name, isAuth}} );

export const register = (name, email, password) => (dispatch) => {
    dispatch(registerProgres(true))
    registrAPI.registr(name, email, password).then( data => {
        dispatch(registerProgres(false))
        dispatch(registrationСompleted(true))
    })
}

export const getUserData = () => (dispatch) => {
    return authAPI.me().then( data => {
        if(data.resultCode === 0){
            let {_id, email, name} = data.body
            dispatch(setUserData(_id, email, name, true))
        }

    })
}

export const login = (email, password) => (dispatch) => {
    dispatch(registerProgres(true))
    authAPI.auth(email, password).then( data => {
        if(data.resultCode === 0){
            dispatch(getUserData())
        }

    } )
}

export const logaut = () => (dispatch) => {
    authAPI.logaut().then( data => {
        if(data.resultCode === 0){
            dispatch(setUserData(null, null, null, false))
            dispatch(registerProgres(false))
            dispatch(registrationСompleted(false))
        }
    } )
}

export default authReducer;