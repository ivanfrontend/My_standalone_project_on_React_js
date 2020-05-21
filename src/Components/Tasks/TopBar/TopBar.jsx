import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const TopBar = (props) => {

    let [completed, setCompleted] = useState(false)
    let [notDone, setNotDone] = useState(false)

    useEffect( () => {
        setCompleted(false)
    }, [props.resetAllFilrefr] )
    useEffect( () => {
        setNotDone(false)
    }, [props.resetAllFilrefr] )



    const completedState = (dataState) => {
        setCompleted(dataState)
        // debugger
        props.getTasks(dataState, notDone)
    }
    const notDoneState = (dataState) => {
        setNotDone(dataState)
        props.getTasks(completed, dataState)
    }

    return(
        <Grid container >
            <Grid item lg={4}>
                { completed
                    ? <span onClick={ () => completedState(false) } >Выполненные <CheckBoxIcon /> </span>
                    : <span onClick={ () => completedState(true) } >Выполненные <CheckBoxOutlineBlankIcon /> </span>
                }
            </Grid>
            <Grid item lg={4}>
                { notDone
                    ? <span onClick={ () => notDoneState(false) } >Не выполнены <CheckBoxIcon /> </span>
                    : <span onClick={ () => notDoneState(true) } >Не выполнены <CheckBoxOutlineBlankIcon /> </span>
                }
            </Grid>
            <Grid item lg={4}>Поиск</Grid>
        </Grid>
    )
}

export default TopBar