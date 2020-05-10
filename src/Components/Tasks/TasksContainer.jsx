import React from 'react';
import Tasks from "./Tasks";
import {compose} from "redux";
import {connect} from "react-redux";
import { getTasks, addTask, deleteTask, taskUpdate} from "../../redux/tasks-reducer";
import {reset} from 'redux-form';
import AddTask from "./TaskForm";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import s from './Task.module.css'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
}));

class TasksContainer extends React.Component {

    componentDidMount() {
        this.props.getTasks()
    }

    classes = () => {
        return useStyles()
    }


    render() {
        return (
            <div className={this.classes.root}>
                <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item lg={12}>
                        <Paper className={s.paper}>
                            <ul>
                                <li>{ this.props.user.name && this.props.user.name }</li>
                                <li>{ this.props.user.email && this.props.user.email }</li>
                                <li></li>
                            </ul>
                        </Paper>
                    </Grid>
                    <Grid item lg={4}>
                        <Paper className={s.paper}>
                            <AddTask />
                        </Paper>
                    </Grid>
                    <Grid item lg={8}>
                        <Paper className={this.classes.paper}>
                            <Tasks
                                deleteTaskInProgress={this.props.deleteTaskInProgress}
                                tasks={this.props.tasks}
                                taskUpdate={this.props.taskUpdate}
                                deleteTask={this.props.deleteTask}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                </Container>
            </div>
        )
    }
}


let mapStateToProps = (state) => ({
    tasks: state.tasksPage.tasks,
    deleteTaskInProgress: state.tasksPage.deleteTaskInProgress,
    user: state.auth.user
})


export default compose(
    connect(mapStateToProps, {getTasks, addTask, deleteTask, taskUpdate, reset}),
)(TasksContainer)
