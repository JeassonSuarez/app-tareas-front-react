import { useState, useEffect } from "react";
import "../../styles.css/Tarea.styles.css";
import { MdDoneAll, MdDeleteForever } from "react-icons/md";
// import { MdUpdate } from "react-icons/md";

import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";

const Tarea = ({ data, numtarea, reload }) => {
  const [prioridad, setPrioridad] = useState(null);
  const [stylesPrioridad, setStylesPrioridad] = useState(null);

  useEffect(() => {
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

  const finalizarTarea = () => {
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
  }

  const eliminarTarea = () => {
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
  }

  return (
    <div className="div-tarea">
      <h2>
        {numtarea + 1}) {data.ntarea}
      </h2>
      <p>{data.categoria}</p>
      <p>{data.descripcion}</p>
      <p>
        Creacion: {new Date(data.fcreacion).getFullYear()}-
        {new Date(data.fcreacion).getMonth()+1}-
        {new Date(data.fcreacion).getDate()}
      </p>
      <p>
        Entregar: {new Date(data.fentrega).getFullYear()}-
        {new Date(data.fentrega).getMonth()+1}-{new Date(data.fentrega).getDate()}
      </p>
      <p>
        Finalizada:{" "}
        {data.ffinalizacion === null
          ? "Por entregar"
          : `${new Date(data.ffinalizacion).getFullYear()}-${new Date(
              data.ffinalizacion
            ).getMonth()+1}-${new Date(data.ffinalizacion).getDate()}`}
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
