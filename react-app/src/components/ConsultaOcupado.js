import React, { Component } from "react";
import axios from "axios";

class HttpRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      espaciosOcupados: [],
    };
  }
  espaciosOcupados() {
    axios
      .get("http://localhost:8080/spaces")
      .then((response) => {
        
        let data = response.data;
        let _espaciosOcupados = []
        for (let espacio of data) {
          if (espacio.state === 'taken'){
            _espaciosOcupados.push(espacio);
          }
        }

        this.setState({ espaciosOcupados: _espaciosOcupados });
        console.log(this.state.espaciosOcupados);
       
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { espaciosOcupados } =
      this.state;
    return (
      <>
        <div>
          <h1>Consultar Espacios Ocupados</h1>
          <button onClick={() => this.espaciosOcupados()}>Consultar</button>
          <div>
            {espaciosOcupados.length
              ? espaciosOcupados.map((espacio) => (
                
                <div key={espacio.id}>El espacio {espacio.id} está ocupado</div>
                ))
              : null}
          </div>
        </div>
      </>
    );
  }
}

export default HttpRequests;
