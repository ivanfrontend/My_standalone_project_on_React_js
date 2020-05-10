import React from 'react';
// import { connect } from 'react-redux';
// import {addTask} from "../redux/tasks-reducer";
// import {reset} from 'redux-form';



export const containerComponent = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            return < Component { ...this.props } />
        }
    }

    // let ConnectedAuthRedirectComponent = connect(null, {addTask, reset})(RedirectComponent)

    return RedirectComponent
}