import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import { withRouter, Redirect } from 'react-router-dom';
import {getTask, updateTask, deleteTaskOne} from "../../redux/taskItem-reducer";
import Task from "./Task";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class TaskItemsContainer extends React.Component {

    componentDidMount() {
        let taskId = this.props.match.params.taskId
        this.props.getTask(taskId)
    }

    render() {
        return (
            <>
                {this.props.emptyTask &&  <Redirect to='/tasks' /> }
                <Task {...this.props}  />
            </>
        )
    }
}


let mapStateToProps = (state) => ({
    taskItem: state.taskPage.taskItem,
    taskInProgress: state.tasksPage.taskInProgress,
    emptyTask: state.taskPage.emptyTask
})


export default compose(
    connect(mapStateToProps, {getTask, updateTask, deleteTaskOne}), // 3
    withRouter, // 2
    withAuthRedirect
)(TaskItemsContainer)
