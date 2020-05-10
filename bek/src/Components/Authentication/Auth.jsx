import React, { useState, useEffect } from 'react';
import {withRouter, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import s from './Auth.module.css'
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import {compose} from "redux";


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


const Auth = (props) => {


     const classes =  useStyles()

    let [elitMod, setEditMod ] = useState(false)

    let updateTabs = (bool) => {
        setEditMod(bool)
    }

    return (
        <>
            {props.isAuth && <Redirect to='/tasks' />}
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid item lg={12}>
                            <Paper className={s.auth} >
                                <ul>
                                    <li> <button disabled={ !elitMod && true }  onClick={ () => updateTabs( false ) } > Регистрация </button> </li>
                                    <li> <button disabled={ elitMod && true } onClick={ () => updateTabs( true ) } > Авторизация </button> </li>
                                </ul>
                                {  !elitMod &&
                                    <Registration
                                        registerProgres={props.registerProgres}
                                        registrationСompleted={props.registrationСompleted}
                                        register={props.register} />
                                }
                                {  elitMod &&
                                    // props.isAuth ? <Redirect to='/tasks' /> :
                                   <Login login={props.login} />
                                }

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    )
}

export default  compose(
    withRouter
)(Auth)