import React from 'react'
import {NavLink} from 'react-router-dom';

import { Field, reduxForm } from 'redux-form'
import {Input, Textarea} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import AddTask from "../Tasks/TaskForm";
import RemoveTask from "../common/Elements/RemoveTask/RemoveTask";
import StateCheckedTask from "../common/Elements/StateCheckedTask/StateCheckedTask";


const TaskForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div><Field
                onBlur={ () => { props.submit() } }
                component={props.formType}
                validate={[required]}
                name={props.form}
                autoFocus
            /></div>
        </form>
    )
}



const TaskFormTitleChange = reduxForm({form: 'title', formType: Input})(TaskForm)
const TaskFormDescChange = reduxForm({form: 'body', formType: Textarea})(TaskForm)

class Task  extends React.Component{

    state = {
        editModTitile: false,
        editModDesc: false

    }

    getInitialValues () {
        return {
            title: this.props.taskItem.title,
            body: this.props.taskItem.body
        };
    }

    updateState = (elemState, boolState) => {
        // debugger
        if(elemState === 'editModTitile'){
            this.setState({
                editModTitile: boolState
            })
        }
        if(elemState === 'editModDesc'){
            this.setState({
                editModDesc: boolState
            })
        }
    }

    taskChange = (taskData) => {
        let {title, body} = taskData
        this.props.taskItem.title = title
        this.props.taskItem.body = body
        this.props.taskUpdate(this.props.taskItem, this.props.taskItem.stateTask)
        this.setState({
            editModTitile: false,
            editModDesc: false
        })
    }



    render() {

        return (
            <>
                <div>
                    <RemoveTask {...this.props} taskId={this.props.taskItem._id} />
                    <StateCheckedTask {...this.props} task={this.props.taskItem} />
                </div>
                <ul>
                    {this.state.editModTitile
                            ? <TaskFormTitleChange initialValues={this.getInitialValues()} onSubmit={this.taskChange}/>
                            : <li onDoubleClick={() => this.updateState('editModTitile', true)}>
                                {this.props.taskItem.title
                                    ? this.props.taskItem.title
                                    : 'Описание пустое'
                                }</li>
                    }
                    {this.state.editModDesc
                            ? <TaskFormDescChange initialValues={this.getInitialValues()} onSubmit={this.taskChange}/>
                            : <li onDoubleClick={() => this.updateState('editModDesc', true)}>
                                {this.props.taskItem.body
                                    ? this.props.taskItem.body
                                    : 'Описание пустое'
                                }</li>
                    }
                </ul>
                <div> <NavLink to={'/tasks'}> Все задания </NavLink> </div>
                <div><AddTask /></div>
            </>
        )
    }


}

export default Task