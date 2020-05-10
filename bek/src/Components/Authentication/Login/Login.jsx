import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../../utils/validators/validators";


const  LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div><Field
                component={Input}
                validate={[required]}
                placeholder="E-mail"
                name={'email'}
            /></div>
            <div><Field
                component={Input}
                validate={[required]}
                placeholder="Пароль"
                name={'password'}
                type={'password'}
            /></div>
            <div> <button> Вход </button> </div>
        </form>
    )
}

const LoginRedaxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData);
        const {email, password} = formData
        props.login(email, password)
    }

    return (
        <>
            <div>
                <LoginRedaxForm  onSubmit={onSubmit} />
            </div>
        </>
    )
}

export default Login