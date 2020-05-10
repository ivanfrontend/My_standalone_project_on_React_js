import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Input, Textarea} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";


import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import s from './Task.module.css'
import {addTaskForm} from "../../hoc/addTaskForm";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const TaskForm = (props) => {

    const classes = useStyles();

    return (
        <form onSubmit={props.handleSubmit} >
            <div><Field
                // onBlur={ () => { props.submit() } }
                component={Input}
                validate={[required]}
                // placeholder="Название задания"
                name={'task'}
            /></div>
            <div><Field
                // placeholder="Описание"
                name={'body'}
                // validate={[required]}
                component={Textarea}/>
            </div>
            <div className={s.wBtn} > <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                 > <span className={s.btnText} >Добавить</span> <SendIcon />  </Button></div>
        </form>
    )
}

const TaskRedaxForm = reduxForm({form: 'createTask'})(TaskForm)

class AddTask extends React.Component {

    classes = () => {
        return useStyles();
    }

    addTask = (formData) => {
        console.log('formData',formData)
        this.props.addTask(formData.task, formData.body).then(data => {
            this.props.reset('createTask')
        })

    }
    render() {
        return (
            <div className={s.wrappForm}>
                <div>{'Добавить Задание'}</div>
                <div>
                    <TaskRedaxForm onSubmit={this.addTask} />
                </div>
            </div>
        )
    }


}



export default  addTaskForm(AddTask)