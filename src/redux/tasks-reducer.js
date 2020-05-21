import {tasksAPI} from "../api/api";

const SET_TASKS = 'SET_TASKS'
const PROGRESS_TASK = 'PROGRESS_TASK'
const CHANGE_TASK = 'CHANGE_TASK'
const DELETE_TASK = 'DELETE_TASK'
const RESET_ALL_FILTERS = 'RESET_ALL_FILTERS'

let initialState = {
    tasks:  [],
    taskInProgress: [],
    resetAllFilrefr: false
};

const tasksReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_TASKS:
            return{
                ...state,
                tasks: [...action.tasks]
            }
        case CHANGE_TASK:
            return {
                ...state,
                tasks: state.tasks.map( t => {
                    if( t._id === action.task._id ){
                        return {...t, t: action.task}
                    }
                    return t
                })
            }
        case PROGRESS_TASK:
            return {
                ...state,
                taskInProgress: action.isFetching
                ? [...state.taskInProgress, action.taskId]
                : state.taskInProgress.filter( t => t != action.taskId )
            }
        case DELETE_TASK:
            return{
                ...state,
                tasks: state.tasks.filter( t => t._id != action.taskId)
            }
        case RESET_ALL_FILTERS:
            return {
                ...state,
                resetAllFilrefr: !state.resetAllFilrefr
            }

        default:
            return state;
    }

}



export const setTasks = (tasks) => ( {type: SET_TASKS, tasks } );
export const taskProgress = (isFetching, taskId) => ({type: PROGRESS_TASK, isFetching, taskId})
export const changeTask = (task) => ({type: CHANGE_TASK, task});
export const deleteTask = (taskId) => ({type: DELETE_TASK, taskId});
export const resetFilter = () => ({type: RESET_ALL_FILTERS});


export const getTasks = (completedTask = false, notDoneTask = false) => {
    return (dispatch) => {
        tasksAPI.getTasks(completedTask, notDoneTask).then( data => {
            dispatch(setTasks(data))
        })
    }
}
export const addTask = (task, body) => (dispatch) => {
    return  tasksAPI.addTask(task, body).then( data => {
        dispatch(getTasks())
        dispatch(resetFilter())
    })
}


export const deleteTaskOne = (taskId) => (dispatch) => {
    dispatch(taskProgress(true, taskId))
    tasksAPI.deleteTask(taskId).then( data => {
        dispatch(taskProgress(false, taskId))
        dispatch(deleteTask(taskId))
    } )
}

export const updateTask = (task, stateTask) => (dispatch) => {
    task.stateTask = stateTask
    dispatch(taskProgress(true, task._id))
    tasksAPI.updateTask(task._id,task.title, task.body, task.stateTask ).then( data => {
        dispatch(changeTask(task))
        dispatch(taskProgress(false, task._id))
    })
}




export default tasksReducer;