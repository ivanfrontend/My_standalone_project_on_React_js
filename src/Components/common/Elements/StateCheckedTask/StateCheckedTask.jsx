import React from 'react'
import s from './StateCheckedTask.module.css'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const StateCheckedTask = (props) => {
    return (
        <span className={s.checked}>
            {props.task.stateTask
                ? <button
                    disabled={props.taskInProgress.some( id => id === props.task._id )}
                    onClick={() => props.updateTask(props.task, false)}
                >  <CheckBoxIcon /> </button>
                : <button
                    disabled={props.taskInProgress.some( id => id === props.task._id )}
                    onClick={ () => props.updateTask(props.task, true) }
                > <CheckBoxOutlineBlankIcon />  </button>

            }
        </span>
    )
}

export default StateCheckedTask