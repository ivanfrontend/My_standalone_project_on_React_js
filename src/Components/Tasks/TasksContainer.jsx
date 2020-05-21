import React from 'react';
import Tasks from "./Tasks";
import {compose} from "redux";
import {connect} from "react-redux";
import { getTasks, addTask, deleteTaskOne, updateTask} from "../../redux/tasks-reducer";
import {reset} from 'redux-form';
import AddTask from "./TaskForm";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import s from './Task.module.css'
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import TopBar from "./TopBar/TopBar";


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
            <>
            {/*{this.props.isFetching &&  <Preloader/>}*/}
            <div className={this.classes.root}>
                <Container maxWidth="lg">
                <Grid container spacing={2}>

                    <Grid item lg={4}>
                        <Paper className={s.paper}>
                            <AddTask />
                        </Paper>
                    </Grid>
                    <Grid item lg={8}>
                        <TopBar resetAllFilrefr={this.props.resetAllFilrefr} getTasks={this.props.getTasks} />
                        <Paper className={this.classes.paper}>
                            <Tasks
                                taskInProgress={this.props.taskInProgress}
                                tasks={this.props.tasks}
                                taskUpdate={this.props.taskUpdate}
                                updateTask={this.props.updateTask}
                                deleteTaskOne={this.props.deleteTaskOne}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                </Container>
            </div>
                </>
        )
    }
}


let mapStateToProps = (state) => ({
    tasks: state.tasksPage.tasks,
    taskInProgress: state.tasksPage.taskInProgress,
    user: state.auth.user,
    isFetching: state.tasksPage.isFetching,
    resetAllFilrefr: state.tasksPage.resetAllFilrefr
})


export default compose(
    connect(mapStateToProps, {getTasks, addTask, deleteTaskOne, updateTask, reset}),
    withAuthRedirect
)(TasksContainer)
