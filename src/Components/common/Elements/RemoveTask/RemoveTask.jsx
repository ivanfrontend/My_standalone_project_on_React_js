import React from 'react'
import s from './RemoveTask.module.css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const RemoveTask = (props) => {
    return (
        <span className={s.w_btn} >
            <button
                className={s.btn}
                title={'Удалить'}
                disabled={props.taskInProgress.some(id => id === props.taskId)}
                onClick={ () => props.deleteTaskOne(props.taskId) }>
                <DeleteForeverIcon />
            </button>
        </span>
    )
}

export default RemoveTask