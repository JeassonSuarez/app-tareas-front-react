import React from "react";
import Header from "../components/containers/Header";
import Main from "../components/containers/Main";

const Sesion = ({usuario}) => {
  return (
    <div className="div-sesion">
      <Header usuario={usuario}/>
      <Main usuario={usuario}/>
    </div>
  );
};

export default Sesion;
