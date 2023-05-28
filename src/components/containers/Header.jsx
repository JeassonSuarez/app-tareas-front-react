import '../../styles.css/Header.styles.css'

const Header = ({usuario}) => {
  return (
    <header className="header">
      Bienvenid@ {usuario ? usuario.id.nusuario : 'demo'} a tu aplicacion de gestión de tareas
    </header>
  )
}

export default Header