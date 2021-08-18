import React, { Component } from "react";
import axios from "axios";

class HttpRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      espacioID: "",
    };
  }

  changeHandlerLiberar = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandlerLiberar = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8080/spaces/" + this.state.espacioID)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { espacioID } =
      this.state.espacioID;
    return (
      <>
        <div>
          <h1>Liberar Espacios</h1>
          <div>
            <div>
              <form onSubmit={this.submitHandlerLiberar}>
                <h3>Ingrese el ID del espacio</h3>

                <input
                  type="text"
                  name="espacioID"
                  value={espacioID}
                  onChange={this.changeHandlerLiberar}
                />
                <button type="submit">Liberar</button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HttpRequests;
