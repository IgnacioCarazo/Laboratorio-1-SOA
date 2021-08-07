import React from "react";
import ConsultaDisponible from "./components/ConsultaDisponible";
import ConsultaOcupado from './components/ConsultaOcupado';
import LiberaEspacio from './components/LiberaEspacio';
import ReservaEspacio from './components/ReservaEspacio'





export default function App() {
  return (
    <>
      <ConsultaDisponible></ConsultaDisponible>
      <ConsultaOcupado></ConsultaOcupado>
      <LiberaEspacio></LiberaEspacio>
      <ReservaEspacio></ReservaEspacio>
    </>
  );
}
