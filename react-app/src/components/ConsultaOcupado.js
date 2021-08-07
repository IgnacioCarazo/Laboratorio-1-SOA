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
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        let data = response.data;

        this.setState({ espaciosOcupados: data });
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
                  <div key={espacio.id}>{espacio.title}</div>
                ))
              : null}
          </div>
        </div>
      </>
    );
  }
}

export default HttpRequests;
