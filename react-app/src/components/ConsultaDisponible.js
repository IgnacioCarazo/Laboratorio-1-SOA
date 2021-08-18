import React, { Component } from "react";
import axios from "axios";

class ConsultaDisponible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      espaciosDisponibles: [],
    };
  }

  espaciosDisponibles() {
    axios
      .get("http://localhost:8080/spaces")
      .then((response) => {
        let data = response.data;
        let _espaciosDisponibles = []
        for (let espacio of data) {
          if (espacio.state === 'free'){
            _espaciosDisponibles.push(espacio);
          }
        }

        this.setState({ espaciosDisponibles: _espaciosDisponibles });
        console.log(this.state.espaciosDisponibles);
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { espaciosDisponibles } =
      this.state;
    return (
      <>
        <div>
          <h1>Consultar Espacios Disponibles</h1>
          <button onClick={() => this.espaciosDisponibles()}>Consultar</button>
          <div>
            {espaciosDisponibles.length
              ? espaciosDisponibles.map((espacio) => (
                  <div key={espacio.id}>El espacio {espacio.id} está disponible</div>
                ))
              : null}
          </div>
        </div>
      </>
    );
  }
}

export default ConsultaDisponible;
