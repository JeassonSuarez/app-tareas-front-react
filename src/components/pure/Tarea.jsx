import { useState, useEffect } from "react";
import "../../styles.css/Tarea.styles.css";
import { MdDoneAll, MdDeleteForever } from "react-icons/md";
// import { MdUpdate } from "react-icons/md";

import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";

const Tarea = ({ data, numtarea, reload, usuario, aTarea}) => {
  const [prioridad, setPrioridad] = useState(null);
  const [stylesPrioridad, setStylesPrioridad] = useState(null);

  useEffect(() => {
    console.log(data);
    setPrioridad(parseInt(data.prioridad));
  }, [data]);

  useEffect(() => {
    prioridad === 1
      ? setStylesPrioridad({
          backgroundColor: "var(--verde-succes-claro)",
          color: "white",
          outline: "1px solid var(--verde-succes-claro)",
          transition: "all 0.3s ease-in-out",
        })
      : prioridad === 2
      ? setStylesPrioridad({
          backgroundColor: "var(--naranja-claro)",
          color: "white",
          outline: "1px solid var(--naranja-claro)",
          transition: "all 0.3s ease-in-out",
        })
      : setStylesPrioridad({
          backgroundColor: "var(--rojo-claro)",
          color: "white",
          outline: "1px solid var(--rojo-claro)",
          transition: "all 0.3s ease-in-out",
        });
  }, [prioridad]);

  const cambiarPrioridad = () => {
    if (prioridad === 1) {
      setPrioridad(2);
      setStylesPrioridad({
        backgroundColor: "var(--naranja-claro)",
        color: "white",
        outline: "1px solid var(--naranja-claro)",
        transition: "all 0.3s ease-in-out",
      });
      cambiarEPrioridad(2, data.idtarea)
    } else if (prioridad === 2) {
      setPrioridad(3);
      setStylesPrioridad({
        backgroundColor: "var(--rojo-claro)",
        color: "white",
        outline: "1px solid var(--rojo-claro)",
        transition: "all 0.3s ease-in-out",
      });
      cambiarEPrioridad(3, data.idtarea)
    } else {
      setPrioridad(1);
      setStylesPrioridad({
        backgroundColor: "var(--verde-succes-claro)",
        color: "white",
        outline: "1px solid var(--verde-succes-claro)",
        transition: "all 0.3s ease-in-out",
      });
      cambiarEPrioridad(1, data.idtarea)
    }
    aTarea('p', numtarea);
    // listaTareas[numtarea].prioridad === '1' ? listaTareas[numtarea].prioridad ='2' : listaTareas[numtarea].prioridad === '2' ? listaTareas[numtarea].prioridad = '3' : listaTareas[numtarea].prioridad = '1'
    // reload(true)
  };

  const hoverEffectEnter = () => {
    if (prioridad === 1) {
      setStylesPrioridad({
        backgroundColor: "var(--verde-succes-oscuro)",
        color: "white",
        outline: "1px solid var(--verde-succes-oscuro)",
        transition: "all 0.3s ease-in-out",
      });
    } else if (prioridad === 2) {
      setStylesPrioridad({
        backgroundColor: "var(--naranja-oscuro)",
        color: "white",
        outline: "1px solid var(--naranja-oscuro)",
        transition: "all 0.3s ease-in-out",
      });
    } else {
      setStylesPrioridad({
        backgroundColor: "var(--rojo-oscuro)",
        color: "white",
        outline: "1px solid var(--rojo-oscuro)",
        transition: "all 0.3s ease-in-out",
      });
    }
  };

  const hoverEffectLeave = () => {
    if (prioridad === 1) {
      setStylesPrioridad({
        backgroundColor: "var(--verde-succes-claro)",
        color: "white",
        outline: "1px solid var(--verde-succes-claro)",
        transition: "all 0.3s ease-in-out",
      });
    } else if (prioridad === 2) {
      setStylesPrioridad({
        backgroundColor: "var(--naranja-claro)",
        color: "white",
        outline: "1px solid var(--naranja-claro)",
        transition: "all 0.3s ease-in-out",
      });
    } else {
      setStylesPrioridad({
        backgroundColor: "var(--rojo-claro)",
        color: "white",
        outline: "1px solid var(--rojo-claro)",
        transition: "all 0.3s ease-in-out",
      });
    }
  };

  const cambiarEPrioridad = (p, idt) => {
    if (usuario) {
      fetch("https://app-tareas-back-node-pg-production.up.railway.app/cambiarPrioridad", {
        type: "no-cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p,idt
        }),
      })
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
            // console.log(respuesta);
            // alert(respuesta.mensaje)
            if (respuesta.cp) {
              reload(true)
            }
          });
    }
  }

  const finalizarTarea = () => {
    if (usuario) {
      fetch("https://app-tareas-back-node-pg-production.up.railway.app/finalizar", {
        type: "no-cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
            console.log(respuesta);
            alert(respuesta.mensaje)
            if (respuesta.fin) {
              reload(true)
            }
          });
    }else{
      aTarea("f", numtarea);
    }
  }

  const eliminarTarea = () => {
    if (usuario) {
      fetch("https://app-tareas-back-node-pg-production.up.railway.app/eliminar", {
        type: "no-cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
            console.log(respuesta);
            alert(respuesta.mensaje)
            if (respuesta.del) {
              reload(true)
            }
          });
    }else{
      aTarea('e', numtarea)
      // console.log("Eliminando tarea", listaTareas[numtarea]);
      // listaTareas.splice(numtarea, 1);
      // reload(true)
    }
  }

  return (
    <div className="div-tarea">
      <h2>
        {numtarea + 1}) {data.ntarea || data.titulo}
      </h2>
      <p>{data.categoria}</p>
      <p>{data.descripcion}</p>
      <p>
        Creacion: {usuario ? `${new Date(data.fcreacion).getFullYear()}-
        ${new Date(data.fcreacion).getMonth()+1}-
        ${new Date(data.fcreacion).getDate()}` :data.fCreacion} 
      </p>
      <p>
        Entregar: {`${usuario ? new Date(data.fentrega).getFullYear()+"-"+(new Date(data.fentrega).getMonth()+1)+"-"+new Date(data.fentrega).getDate() : data.fEntrega}`}

      </p>
      <p>
        Finalizada:{" "}
        {usuario && data.ffinalizacion === null
          ? "Por entregar"
          : usuario && data.ffinalizacion !== null ? `${new Date(data.ffinalizacion).getFullYear()}-${new Date(
              data.ffinalizacion
            ).getMonth()+1}-${new Date(data.ffinalizacion).getDate()}`
            : !usuario && data.fFinalizacion === "" ? "Por entregar" : data.fFinalizacion}
      </p>
      <p>
        Prioridad:{" "}
        {data.prioridad === "1"
          ? "Baja"
          : data.prioridad === "2"
          ? "Media"
          : "Alta"}
      </p>
      <p>Estado: {data.estado === "A" ? "Activa" : "Finalizada"}</p>

      {
        data.estado === 'A' && <button className="btn btn-tarea btn-fin" onClick={finalizarTarea}>
        <MdDoneAll />
        Finalizar
      </button>
      }
      
      {/* <button className="btn btn-tarea btn-upd">
        <MdUpdate />
        Actualizar
      </button> */}
      <button className="btn btn-tarea btn-del" onClick={eliminarTarea}>
        <MdDeleteForever />
        Eliminar
      </button>
      {
        data.estado === 'A' && <button
        className="btn btn-tarea btn-pri"
        onClick={cambiarPrioridad}
        onMouseEnter={hoverEffectEnter}
        onMouseLeave={hoverEffectLeave}
        style={stylesPrioridad}
      >
        {prioridad === 1 ? (
          <FcLowPriority />
          ) : prioridad === 2 ? (
          <FcMediumPriority />
        ) : (
          <FcHighPriority />
        )}
        Cambiar Prioridad
      </button>
      }
      
    </div>
  );
};

export default Tarea;
