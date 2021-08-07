import React, { Component } from "react";
import axios from "axios";

class HttpRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placa: "",
    };
  }

  changeHandlerReservar = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandlerReservar = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/posts", this.state.placa)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { placa} =
      this.state.placa;
    return (
      <>
        <div>
          <h1>Reservar Espacio</h1>
          <div>
            <form onSubmit={this.submitHandlerReservar}>
              <h3>Ingrese el ID del espacio</h3>

              <input
                type="text"
                name="placa"
                value={placa}
                onChange={this.changeHandlerReservar}
              />
              <button type="submit">Reservar</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default HttpRequests;
