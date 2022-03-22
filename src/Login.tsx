import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { authTC, AuthStateType } from './store/auth-reducer'
import { rootReducerType } from './store/state'
import { Redirect } from 'react-router-dom'


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    }
type PropsType = {
    isLogged: boolean
}

export const Login = React.memo(function(props: PropsType) {
    console.log('login rendered')

    const formik = useFormik({
        initialValues: {
        email: "imax449@yandex.ru",
        password: 'suomi87',
        rememberMe: true
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
            errors.email = 'Required';
            } 
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } 
            if (values.password.length < 3) {
                errors.password = 'Password length cannot be less then 3 symbols';
            }
            return errors;
            },
        onSubmit: values => {
        dispatch(authTC(values));
        formik.resetForm()
        },
        })


const dispatch = useDispatch()


if(props.isLogged){
    return <Redirect to={'/'} />
}


return (
<Grid container justifyContent={'center'}>
<Grid item justifyContent={'center'}>
<form onSubmit={formik.handleSubmit} >
<FormControl>
<FormLabel>
<p>To log in get registered
<a href={'https://social-network.samuraijs.com/'}
target={'_blank'}> here
</a>
</p>
<p>or use common test account credentials:</p>
<p>Email: free@samuraijs.com</p>
<p>Password: free</p>
</FormLabel>
<FormGroup>

<TextField label="Email" margin="normal" {...formik.getFieldProps('email')}/>
{formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
<TextField type="password" label="Password"
margin="normal" {...formik.getFieldProps('password')}
/>
{formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
<FormControlLabel label={'Remember me'} control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')}/>} />

<Button type={'submit'} variant={'contained'} color={'primary'}>
Login
</Button>
</FormGroup>
</FormControl>
</form>
</Grid>
</Grid>
)
})