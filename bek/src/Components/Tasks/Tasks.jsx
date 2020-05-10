import React from 'react'
import {NavLink} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import {Input, Textarea} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

import EditIcon from '@material-ui/icons/Edit';
import s from './Task.module.css'
import RemoveTask from "../common/Elements/RemoveTask/RemoveTask";
import StateCheckedTask from "../common/Elements/StateCheckedTask/StateCheckedTask";

const TaskForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div><Field
                onBlur={ () => { props.submit() } }
                component={Input}
                validate={[required]}
                name={'title'}
                autoFocus
            /></div>
        </form>
    )
}

const TaskRedaxForm = reduxForm({form: 'changeTask'})(TaskForm)


class Tasks extends React.Component {

    state = {
        task: {}
    }

    stateChangeTask = (taskId) => {
        this.setState({
            task: taskId
        })
    }


    getInitialValues () {
        return {
            title: this.state.task.title
        };
    }

    taskChange = (formData) => {

        this.state.task.title = formData.title
        console.log(formData)
        console.log(this.state.task)
        this.props.taskUpdate(this.state.task ,this.state.task.stateTask)
        this.setState({
            task: {}
        })
    }



    render() {

        return (
            <ul className={s.w_tasks}>
                {
                    this.props.tasks.map( t => {
                        return(

                            <li key={t._id}>
                                <span> {this.state.task._id === t._id
                                    ? <span> <TaskRedaxForm onSubmit={this.taskChange}
                                        initialValues={this.getInitialValues()}/> </span>
                                    : <NavLink title={'Подробнее'} to={"/task/" + t._id}> {t.title} </NavLink>
                                }
                                    <span title={'Редактировать'} className='edit_icons' onClick={ () => this.stateChangeTask(t) } > <EditIcon /></span>
                                </span>

                                <span className={'delete_icons'} >
                                    {/*<button title={'Удалить'}*/}
                                    {/*disabled={this.props.deleteTaskInProgress.some( id => id === t._id )}*/}
                                    {/*onClick={() => {this.props.deleteTask(t._id)}} >*/}
                                    {/*<DeleteForeverIcon /></button>*/}
                                    <RemoveTask {...this.props} taskId={t._id} />
                                </span>

                                {/*<span className={'check_state'}>*/}
                                {/*    {t.stateTask*/}
                                {/*    ? <button*/}
                                {/*        disabled={this.props.deleteTaskInProgress.some( id => id === t._id )}*/}
                                {/*        onClick={() => this.props.taskUpdate(t, false)}*/}
                                {/*    >  <CheckBoxIcon /> </button>*/}
                                {/*    : <button*/}
                                {/*        disabled={this.props.deleteTaskInProgress.some( id => id === t._id )}*/}
                                {/*        onClick={ () => this.props.taskUpdate(t, true) }*/}
                                {/*    > <CheckBoxOutlineBlankIcon />  </button>*/}

                                {/*}*/}
                                {/*</span>*/}
                                <StateCheckedTask {...this.props} task={t} />

                            </li>

                        )
                    } )

                }
            </ul>
        )

    }


}

export default Tasks