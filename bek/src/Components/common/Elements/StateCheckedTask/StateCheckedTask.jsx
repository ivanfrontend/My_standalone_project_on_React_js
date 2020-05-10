import React from 'react'
import {containerComponent} from "../../../../hoc/containerComponent";
import s from './StateCheckedTask.module.css'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const StateCheckedTask = (props) => {
    return (
        <span className={s.checked}>
            {props.task.stateTask
                ? <button
                    disabled={props.deleteTaskInProgress.some( id => id === props.task._id )}
                    onClick={() => props.taskUpdate(props.task, false)}
                >  <CheckBoxIcon /> </button>
                : <button
                    disabled={props.deleteTaskInProgress.some( id => id === props.task._id )}
                    onClick={ () => props.taskUpdate(props.task, true) }
                > <CheckBoxOutlineBlankIcon />  </button>

            }
        </span>
    )
}

export default containerComponent(StateCheckedTask)