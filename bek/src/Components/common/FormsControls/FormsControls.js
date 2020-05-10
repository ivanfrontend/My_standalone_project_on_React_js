import React from 'react';
import s from './FormsControls.module.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const FormControl = ({input, meta, child, element, ...props}) => {

    const classes = useStyles();

    const hasError = meta.touched && meta.error
    return (
        <div className={s.form_control + ' ' + (hasError ? s.error : '')}>
           <div className={classes.root} noValidate autoComplete="off" >{props.children}</div>
            { /* hasError && <span>{meta.error}</span> */ }
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, element, ...restProps} = props
    return <FormControl {...props} >
        <TextField id="standard-multiline-flexible" label="Описание задания" multiline rowsMax={100}  {...input} {...restProps}  />
    </FormControl>
}


export const Input = (props) => {
    const {input, meta, child, element, ...restProps} = props
    const hasError = meta.touched && meta.error
    return hasError
        ?  <FormControl {...props} ><TextField error id="standard-error-helper-text" label="Ошибка"   helperText={meta.error} {...input} {...restProps} /></FormControl>
        :  <FormControl {...props} ><TextField id="standard-basic" label="Название задания" {...input} {...restProps} /></FormControl>

}



// export const Textarea = ({input, meta, ...props}) => {
//     const hasError = meta.touched && meta.error
//     return (
//         <div className={s.form_control + ' ' + (hasError ? s.error : '')}>
//            <div><textarea {...input} {...props} /></div>
//             { hasError && <span>{meta.error}</span> } 
//         </div>
//     )
// }
// export const Input = ({input, meta, ...props}) => {
//     const hasError = meta.touched && meta.error
//     return (
//         <div className={s.form_control + ' ' + (hasError ? s.error : '')}>
//            <div><input {...input} {...props} /></div>
//             { hasError && <span>{meta.error}</span> } 
//         </div>
//     )
// }

