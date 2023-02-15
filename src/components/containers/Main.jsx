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
    console.log('cambio');
  }, [usuario, reload]);

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
    }
    // setListaTareas([...listaTareas, nuevaTarea]);
  };

  return (
    <main className="main">
      {listaTareas.length > 0 ? (
        listaTareas.map((t, i) => {
          return <Tarea data={t} key={i} numtarea={i} reload={setReload}/>;
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
