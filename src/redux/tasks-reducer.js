import {tasksAPI} from "../api/api";
const SET_TASKS = 'SET_TASKS'
const SET_TASK_ITEM = 'SET_TASK_ITEM'
const DELETE_TASK = 'DELETE_TASK'
const DELETE_TASK_OK = 'DELETE_TASK_OK'

let initialState = {
    tasks:  [],
    taskItem: {},
    deleteTaskInProgress: [],
    deleteTaskOk: false
};

const tasksReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_TASKS:
            return{
                ...state,
                tasks: action.tasks
            }

        case SET_TASK_ITEM:
            return {
                ...state,
                taskItem: action.taskItem
            }
        case DELETE_TASK:
            return {
                ...state,
                deleteTaskInProgress: action.isFetching
                ? [...state.deleteTaskInProgress, action.taskId]
                : state.deleteTaskInProgress.filter( t => t != action.taskId )
            }
        case DELETE_TASK_OK:
            return {
                ...state,
                deleteTaskOk: action.isFetching
            }

        default:
            return state;
    }

}



export const setTasks = (tasks) => ( {type: SET_TASKS, tasks } );
export const setTaskItems = (taskItem) => ({type: SET_TASK_ITEM, taskItem})
export const deleteTaskProgress = (isFetching, taskId) => ({type: DELETE_TASK, isFetching, taskId})
export const deleteTaskOk = (isFetching) => ({type: DELETE_TASK_OK, isFetching})

export const getTasks = () => {
    return (dispatch) => {
        tasksAPI.getTasks().then( data => {
            dispatch(setTasks(data))
        })
    }
}
export const addTask = (task, body) => (dispatch) => {
    return  tasksAPI.addTask(task, body).then( data => {
        dispatch(getTasks(data))
        return data
    })
}

export const getTask = (taskId) => (dispatch) => {
    tasksAPI.getItemTask(taskId).then( data => {
        dispatch(setTaskItems(data))
    } )
}
export const deleteTask = (taskId) => (dispatch) => {
    dispatch(deleteTaskProgress(true, taskId))
    return tasksAPI.deleteTask(taskId).then( data => {
        dispatch(deleteTaskProgress(false, taskId))
        dispatch(deleteTaskOk(true))
        dispatch(deleteTaskOk(false))
        dispatch(getTasks())
        dispatch(getTask(taskId))
    } )
}

export const taskUpdate = (task, stateTask) => (dispatch) => {
    dispatch(deleteTaskProgress(true, task._id))
    task.stateTask = stateTask
    tasksAPI.updateTask(task._id,task.title, task.body, task.stateTask ).then( data => {
        dispatch(deleteTaskProgress(false, task._id))
        dispatch(getTasks())

    } )
}


export default tasksReducer;