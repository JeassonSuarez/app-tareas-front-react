import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sesion from './pages/Sesion';
import Login from '../src/pages/Login'
import { useState } from 'react';

function App() {

  const [usuario, setUsuario] = useState(null)

  const sesion = (u) => {
    setUsuario(u)
  }
  
  return (
    <div className="app"> 
    <BrowserRouter basename="/app-tareas-front-react">
      <Routes>
        {/* <Route path='/' element={<Login usuario={sesion}/>}/> */}
        <Route path='/' element={<Sesion usuario={usuario}/>}/>
      </Routes>
    </BrowserRouter>    
    </div>
  )
}

export default App
