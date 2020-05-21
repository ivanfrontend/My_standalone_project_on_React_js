import React, { useState, useEffect } from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import Header from "./Header";
import {logaut} from "../../redux/auth-reducer";

const HeaderContainer = (props) => {

    // let [user, setUser] = useState(props.user)
    // useEffect( () => {
    //     setUser(props.user)
    // }, [props.user] )

    return (
        <Header {...props} />
    )
}

let mapStateToProps = (state) => ({
    user: state.auth.user,
})

export default compose(
    connect(mapStateToProps, {logaut})
)(HeaderContainer)