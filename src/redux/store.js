import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import TaskseReducer from './tasks-reducer';
import authReducer from './auth-reducer';
import appReducer from  './app-reducer';
import taskItemReducer from "./taskItem-reducer";

let reducers = combineReducers({
    tasksPage: TaskseReducer,
    taskPage: taskItemReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});


let store = createStore(reducers, applyMiddleware(thunkMiddleware));


window.store = store;

export default store;