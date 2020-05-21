import React from 'react';
import {connect} from "react-redux";
import Auth from "./Auth";
import {register, registrationСompleted, login} from '../../redux/auth-reducer'

class AuthContainer extends React.Component {
    render() {

        return(
            <Auth {...this.props} />
        )
    }
}

let mapStateToprops = (state) => ({
    registerProgres: state.auth.registerProgres,
    registrationСompleted: state.auth.registrationСompleted,
    isAuth: state.auth.user.isAuth
})

export default connect(mapStateToprops, {register, login})(AuthContainer)