import React from 'react';
import './App.css';
import { Route, withRouter} from 'react-router-dom';
import { Redirect} from "react-router-dom";
import { compose } from 'redux';
import {connect} from "react-redux";
import { initializeApp } from './redux/app-reducer';
import TasksContainer from "./Components/Tasks/TasksContainer";
import TaskItemsContainer from "./Components/Task/TaskItemsContainer";
import AuthContainer from "./Components/Authentication/AuthContainer";
import Preloader from "./Components/common/preloader/preloader";

class App extends React.Component {
  componentDidMount() {
        this.props.initializeApp()
    }
  render(){
      if(!this.props.initialized) {
          return <Preloader />
      }
    return (
      <div>
        <Route path='/auth' render={ () => <AuthContainer /> } />
        <Route path='/' render={() => this.props.location.pathname === '/' &&  <Redirect to='/tasks' />  } />
        <Route path='/tasks' render={() => <TasksContainer />} />
        <Route path='/task/:taskId?' render={() => <TaskItemsContainer />} />
      </div>
  );
  }

}

const mapStateToprops = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default compose(
    withRouter, // 2
    connect(mapStateToprops, {initializeApp }), // 3
)(App)
