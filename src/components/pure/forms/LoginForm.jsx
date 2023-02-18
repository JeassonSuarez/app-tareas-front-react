import { useState } from 'react'
import { Navigate } from 'react-router-dom';

const LoginForm = ({usuario}) => {

  const [sesion, setSesion] = useState(null)

  const [data, setData] = useState({
    nusuario:'',
    pass:''
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  const iniciarSesion = (e) => {
    e.preventDefault();

    
    fetch("https://app-tareas-back-node-pg-production.up.railway.app/iniciarSesion", {
      type: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        console.log(respuesta);
          if(respuesta.auth) 
          {
            // console.log(respuesta);
            usuario(respuesta)
            setSesion(respuesta.auth)
          } 
          window.alert(respuesta.mensaje)
      });
  }

  return (
    <form className='form form-login'>
        <label>Nombre de usuario</label>
        <input type='text' placeholder='jesus17' required name='nusuario' onChange={handleChange} autoComplete="nusuario"/>
        <label>Contraseña</label>
        <input type='password' placeholder='******' required name='pass' onChange={handleChange} autoComplete='pass'/>
        <button className='btn btn-tarea btn-upd' type='submit' onClick={iniciarSesion}>Iniciar sesión</button>
        {
          sesion && <Navigate to='/tareas' />
        }
    </form>
)
}

export default LoginForm