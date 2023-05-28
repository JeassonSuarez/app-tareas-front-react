import { useState, useEffect } from "react";
import Tarea from "../pure/Tarea.jsx";
import "../../styles.css/Main.styles.css";
import { MdAddTask } from "react-icons/md";
import NuevaTarea from "../pure/forms/NuevaTarea.form.jsx";

const Main = ({ usuario }) => {
  const [listaTareas, setListaTareas] = useState([]);
  const [modal, setModal] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (usuario) {
      fetch(`https://app-tareas-back-node-pg-production.up.railway.app/listartareas/${usuario.id.idusuario}`, {
        type: "no-cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
          if (respuesta) {
            console.log(respuesta.respuesta);
            setListaTareas(respuesta.respuesta)
            setReload(false)
          }
          
        });
    }
    console.log('cambio', listaTareas);
  });

  const abrirFormulario = () => {
    // console.log('hola');
    setModal(true);
  };

  const cerrarFormulario = (cerrar) => {
    setModal(cerrar);
  };

  const agregarTarea = (nuevaTarea) => {
    if (usuario) {
      fetch(`https://app-tareas-back-node-pg-production.up.railway.app/creartarea`, {
        type: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idusuario: usuario.id.idusuario,
          nuevaTarea,
        }),
      })
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
          console.log(respuesta);
          window.alert(respuesta.mensaje);
          if (respuesta.creacion) {
            setReload(true);
          }
        });
    }else{
      console.log(nuevaTarea);
      setListaTareas([...listaTareas, nuevaTarea])
    }
    // setListaTareas([...listaTareas, nuevaTarea]);
  };


  const aTarea = (accion, ntarea)=>{
    if (accion==='p') {
      listaTareas[ntarea].prioridad === '1' ? listaTareas[ntarea].prioridad ='2' : listaTareas[ntarea].prioridad === '2' ? listaTareas[ntarea].prioridad = '3' : listaTareas[ntarea].prioridad = '1'    
    }else if (accion ==='e') {
      listaTareas.splice(ntarea, 1);
    }else{
      let fechaHoy = new Date();
      
      let anio = fechaHoy.getFullYear();
      let mes = String(fechaHoy.getMonth() + 1).padStart(2, "0");
      let dia = String(fechaHoy.getDate()).padStart(2, "0");
      
      listaTareas[ntarea].fFinalizacion = `${anio}-${mes}-${dia}`;
    }
    setListaTareas([...listaTareas]);  
  }


  return (
    <main className="main">
      {listaTareas.length > 0 ? (
        listaTareas.map((t, i) => {
          return <Tarea data={t} key={i} numtarea={i} reload={setReload} usuario = {usuario} aTarea={aTarea} />;
        })
      ) : (
        <h2>No hay tareas aun...</h2>
      )}
      <NuevaTarea
        cerrarFormulario={cerrarFormulario}
        abrir={modal}
        agregarTarea={agregarTarea}
      />

      <button className="btn-add-tarea" onClick={abrirFormulario}>
        <MdAddTask />
      </button>
      {
      }
    </main>
  );
};

export default Main;
