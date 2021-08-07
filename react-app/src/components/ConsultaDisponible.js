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
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        let data = response.data;

        this.setState({ espaciosDisponibles: data });
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
                  <div key={espacio.id}>{espacio.title}</div>
                ))
              : null}
          </div>
        </div>
      </>
    );
  }
}

export default ConsultaDisponible;
