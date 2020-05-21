import {tasksAPI} from "../api/api";
import {taskProgress} from "./tasks-reducer";

const SET_TASK_ITEM = 'SET_TASK_ITEM'
const DELETE_TASK = 'DELETE_TASK'
const IS_FIND = 'IS_FIND'

let initialState = {
    taskItem: {},
    emptyTask: false
};

const taskItemReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_TASK_ITEM:
            return {
                ...state,
                taskItem: { ...action.taskItem}
            }
        case IS_FIND:
            return {
                ...state,
                emptyTask: action.isFind
            }
        case DELETE_TASK:
            return {
                ...state,
                taskItem: {}
            }
        default:
            return state;
    }

}



export const setTaskItems = (taskItem) => ({type: SET_TASK_ITEM, taskItem})
export const deleteTask = () => ({type: DELETE_TASK})
export const checkEmptyTask = (isFind) => ({type: IS_FIND, isFind})



export const getTask = (taskId) => (dispatch) => {
    tasksAPI.getItemTask(taskId).then( data => {
            dispatch(setTaskItems(data))
    } )
}

export const updateTask = (task, stateTask) => (dispatch) => {
    task.stateTask = stateTask
    dispatch(taskProgress(true, task._id))
    tasksAPI.updateTask(task._id,task.title, task.body, task.stateTask ).then( data => {
        dispatch(setTaskItems(task))
        dispatch(taskProgress(false, task._id))
    })
}


export const deleteTaskOne = (taskId) => (dispatch) => {
    dispatch(taskProgress(true, taskId))
    tasksAPI.deleteTask(taskId).then( data => {
        dispatch(deleteTask())
        dispatch(checkEmptyTask(true))
        dispatch(checkEmptyTask(false))
        dispatch(taskProgress(false, taskId))
    } )
}



export default taskItemReducer;