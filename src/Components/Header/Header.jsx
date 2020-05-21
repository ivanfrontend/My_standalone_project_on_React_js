import React from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const Header = (props) => {
    return (
        <Container maxWidth="lg">
            <Grid item lg={12}>
                <ul>
                    <li>{props.user.name}</li>
                    <li><span onClick={() => props.logaut()}>Выйти</span></li>
                </ul>
            </Grid>
        </Container>
    )
}

export default Header