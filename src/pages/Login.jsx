import React from 'react'
import LoginForm from '../components/pure/forms/LoginForm'
import '../styles.css/Login.styles.css'

const Login = ({usuario}) => {
  
  return (
    <div className='div-login'>
        <h2>Iniciar sesión</h2>
        <LoginForm usuario={usuario}/>
    </div>
  )
}

export default Login;