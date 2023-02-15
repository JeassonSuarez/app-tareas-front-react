import '../../../styles.css/NuevaTarea.styles.css'
import { useState } from 'react'
import {TareaCl}  from '../../../models/tarea.class.js'


const NuevaTarea = ({cerrarFormulario, abrir, agregarTarea}) => {

  const [dataForm, setDataForm] = useState({
    titulo:'',
    descripcion:'',
    fEntrega:'',
    fCreacion:(new Date().getFullYear().toString().concat("-", (new Date().getMonth()+1).toString().concat("-", new Date().getDate().toString()))),
    fFinalizacion:'',
    prioridad:'',
    categoria:''
  })

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name] : e.target.value
    })
  }

  const capturaData = (e) => {
    e.preventDefault();
    // console.log(dataForm.prioridad);
    if (dataForm.titulo==='' || dataForm.descripcion==='' || dataForm.fEntrega==='' || dataForm.prioridad==='' || dataForm.categoria==='') {
      alert('Debe llenar todos los campos')
    } else {
      const nuevaTarea = new TareaCl(dataForm.titulo, dataForm.descripcion, dataForm.fEntrega, dataForm.fCreacion, dataForm.fFinalizacion, dataForm.prioridad, 'A', dataForm.categoria);
      agregarTarea(nuevaTarea);
      cerrarFormulario(!abrir)
    }
  }

  return (
    <div className={`div-form-tarea ${abrir && "div-form-tarea-active"}`}>

        <form className='form form-add'>
            <h2>Nueva Tarea</h2>
            <label>Titulo de tarea:</label>
            <input type='text' placeholder='Tarea mate' name='titulo' value={dataForm.titulo} onChange={handleChange} required />

            <label>Descripcion:</label>
            <textarea placeholder='Tarea mate' name='descripcion' value={dataForm.descripcion} onChange={handleChange} required ></textarea>

            <label>Fecha de entrega:</label>
            <input type='date' name='fEntrega' value={dataForm.fEntrega} onChange={handleChange} required />
            
            <label>Categoría:</label>
            <input type='text' name='categoria' value={dataForm.categoria} onChange={handleChange} required />

            <label>Prioridad:</label>
            <select onChange={handleChange} required value={dataForm.prioridad} name='prioridad'>
              <option value="">Seleccione una prioridad</option>
              <option value="1">Baja</option>
              <option value="2">Media</option>
              <option value="3">Alta</option>
            </select>
            <button className='btn btn-crear' type='submit' onClick={capturaData}>Crear</button>
        </form>
        <button className='btn btn-cerrar' onClick={()=>cerrarFormulario(!abrir)}>Cancelar</button>
    </div>
  )
}

export default NuevaTarea