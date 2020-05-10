import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../../utils/validators/validators";


const  RegistrationForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div><Field
                component={Input}
                validate={[required]}
                placeholder="Ваше имя"
                name={'name'}
            /></div>
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
            <div> <button> Зарегистрироваться </button> </div>
        </form>
    )
}

const RegistrationRedaxForm = reduxForm({form: 'registrationForm'})(RegistrationForm)

const Registration = (props) => {

    const onSubmit = (formData) => {
        console.log(formData);
        const {name, email, password} = formData
        props.register(name, email, password)
    }

    return (
        <>
            <div>
                {props.registerProgres &&
                    <div> Подождите идёт регистрация </div>
                }
                {!props.registerProgres &&
                    <RegistrationRedaxForm  onSubmit={onSubmit} />
                }
                {props.registrationСompleted && <div> Вы успешно зарегистрированы </div> }
            </div>
        </>
    )
}

export default Registration