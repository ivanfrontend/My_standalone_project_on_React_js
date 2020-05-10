import React from 'react'
import {containerComponent} from "../../../../hoc/containerComponent";
import s from './RemoveTask.module.css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const RemoveTask = (props) => {
    return (
        <span className={s.w_btn} >
            <button
                className={s.btn}
                title={'Удалить'}
                disabled={props.deleteTaskInProgress.some(id => id === props.taskId)}
                onClick={ () => props.deleteTask(props.taskId) }>
                <DeleteForeverIcon />
            </button>
        </span>
    )
}

export default containerComponent(RemoveTask)