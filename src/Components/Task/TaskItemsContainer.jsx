import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import { withRouter, Redirect } from 'react-router-dom';
import {getTask, taskUpdate, deleteTask} from "../../redux/tasks-reducer";
import Task from "./Task";

class TaskItemsContainer extends React.Component {

    componentDidMount() {

        let taskId = this.props.match.params.taskId
        this.props.getTask(taskId)

    }


    render() {
        return (
            <>
                {this.props.deleteTaskOk &&  <Redirect to='/tasks' /> }
                <Task {...this.props}  />
            </>
        )
    }
}


let mapStateToProps = (state) => ({
    taskItem: state.tasksPage.taskItem,
    deleteTaskInProgress: state.tasksPage.deleteTaskInProgress,
    deleteTaskOk: state.tasksPage.deleteTaskOk
})


export default compose(
    connect(mapStateToProps, {getTask, taskUpdate, deleteTask}), // 3
    withRouter, // 2
)(TaskItemsContainer)
