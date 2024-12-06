import React, { useState } from "react";
import Modal from "react-modal";
import "../utiles/p-registro.css";
import axios from "axios";

Modal.setAppElement("#root");

function Registro() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showModal, setShowModal] = useState(false);

  const buscarUsuario = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/PreRegistro/registro/buscar?documento=${numeroDocumento}`
      );
      const data = response.data;

      if (data.usuarioEncontrado) {
        setNombres(data.nombres);
        setApellidos(data.apellidos);
        setMensaje("Usuario encontrado");
        setShowForm(false);
      } else {
        setNombres("");
        setApellidos("");
        setMensaje("Usuario no encontrado");
        setShowForm(true);
      }
    } catch (error) {
      setMensaje("Error al buscar usuario");
      setShowForm(true);
      console.error(error);
    }
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setMensaje("");
  };

  const validateLetters = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    e.target.value = value;
  };

  const validateNumeric = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setNumeroDocumento(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { NumeroDocumento: numeroDocumento };

    try {
      const response = await axios.post(
        "http://localhost:8000/PreRegistro/registro",
        formData
      );

      if (response.status === 200) {
        setShowSuccess(true);
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (err) {
      console.error("Error al guardar el registro:", err);
    }
  };
  return (
    <div className="contenido2">
      <header className="pre-registro-header">
        <img
          src="https://th.bing.com/th/id/R.8d7e7d1a91a8e89e14f065612f643ec5?rik=%2fcQmSSSUiZIxbw&riu=http%3a%2f%2f1.bp.blogspot.com%2f_P3MTso1k_5Y%2fS9JSjWuLKXI%2fAAAAAAAAAAM%2fSKLkZbLMIQ8%2fs320%2fSENA.jpg&ehk=NYlhbQXvj2X4SI2C8fxW19avOj95isaJ%2bJF%2fy8bj5n8%3d&risl=&pid=ImgRaw&r=0"
          alt="Logo del SENA"
          className="pre-registro-logo"
        />
        <h1 className="pre-registro-title">Entry Solution</h1>
      </header>

      <h1>Pre-Registro</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="NumeroDocumento">Número de Documento:</label>
          <input
            id="NumeroDocumento"
            name="NumeroDocumento"
            type="text"
            value={numeroDocumento}
            onChange={validateNumeric}
            maxLength="10"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <button type="button" onClick={() => setShowModal(true)}>
              Buscar Usuario
            </button>
          </div>
          {mensaje && <p className="mensaje">{mensaje}</p>}
        </div>
      </form>

      <Modal
        isOpen={showModal}
        onRequestClose={handleModalClose}
        contentLabel="Buscar Usuario"
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="Nombres">Nombres:</label>
            <input
              type="text"
              id="Nombres"
              maxLength="30"
              name="Nombres"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              onInput={validateLetters}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Apellidos">Apellidos:</label>
            <input
              type="text"
              id="Apellidos"
              name="Apellidos"
              maxLength="30"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              onInput={validateLetters}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="TipoDocumento">Tipo de Documento:</label>
            <select id="TipoDocumento" name="TipoDocumento" required>
              <option value="C.C">C.C</option>
              <option value="T.I">T.I</option>
              <option value="P.P.T">P.P.T</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="TipoSangre">Tipo de Sangre:</label>
            <select id="TipoSangre" name="TipoSangre" required>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ProgramaFormacion">Programa de Formación:</label>
            <input
              type="text"
              id="ProgramaFormacion"
              name="ProgramaFormacion"
              maxLength="50"
              onInput={validateLetters}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="FichaFormacion">N° Ficha:</label>
            <input
              id="FichaFormacion"
              name="FichaFormacion"
              type="text"
              maxLength="7"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="Email">Email:</label>
            <input
              type="email"
              id="Email"
              name="Email"
              maxLength="50"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="TipoElemento">Elementos a ingresar:</label>
            <input
              type="text"
              id="TipoElemento"
              name="TipoElemento"
              maxLength="25"
              onInput={validateLetters}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Estado">Estado:</label>
            <select id="Estado" name="Estado">
              <option value="n/a">Seleccione...</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="SerialElemento">Serial del Elemento:</label>
            <input
              type="text"
              id="SerialElemento"
              maxLength="6"
              name="SerialElemento"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="CantidadElemento">Cantidad:</label>
            <input
              id="CantidadElemento"
              name="CantidadElemento"
              type="text"
              maxLength="7"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Color">Color:</label>
            <input
              type="text"
              name="Color"
              maxLength="10"
              onInput={validateLetters}
              required
            />
          </div>
          <div className="form-buttons">
            <a href="/">
              <button type="button" className="button">
                Volver
              </button>
            </a>
            <button type="submit" className="button">
              Registrarme
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Registro;
