import React, { useState, useEffect } from "react";
import "../utiles/estacionamientoC.css";

const EstacionamientoC = () => {
  const [espacios, setEspacios] = useState(
    Array.from({ length: 21 }, (_, index) => ({
      id: index + 1,
      ocupado: false,
    }))
  );

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === "http://localhost:3000/ParqueaderoCarros") { // Asegúrate de que el puerto coincida con `ParqueaderoCarros`
        const { selectedSpaces } = event.data;
  
        if (Array.isArray(selectedSpaces)) {
          const newEspacios = espacios.map((espacio) => ({
            ...espacio,
            ocupado: selectedSpaces.includes(espacio.id - 1),
          }));
          setEspacios(newEspacios);
        } else {
          console.error("Formato de datos incorrecto", selectedSpaces);
        }
      }
    };
  
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [espacios]);

  return (
    
    <div className="estacionamiento">
      <header className="pre-registro-header">
        <img
          src="https://th.bing.com/th/id/R.8d7e7d1a91a8e89e14f065612f643ec5?rik=%2fcQmSSSUiZIxbw&riu=http%3a%2f%2f1.bp.blogspot.com%2f_P3MTso1k_5Y%2fS9JSjWuLKXI%2fAAAAAAAAAAM%2fSKLkZbLMIQ8%2fs320%2fSENA.jpg&ehk=NYlhbQXvj2X4SI2C8fxW19avOj95isaJ%2bJF%2fy8bj5n8%3d&risl=&pid=ImgRaw&r=0"
          alt="Logo del SENA"
          className="pre-registro-logo"
        />
        <h1 className="pre-registro-title">Entry Solution</h1>
      </header>
      <h1>Estacionamiento De Carros</h1>
      <div className="grid">
        <div className="contenido5">
          <p>¡Ten previsto donde te estacionarás!</p>
          <p>Solo llega y acomoda tu vehículo.</p>
        </div>

        <label
          className="cuadro-tojo"
          style={{
            position: "absolute",
            top: "30%",
            left: "8%",
            color: "black",
            textAlign: "center",
          }}
        >
          <strong>Ocupado</strong>
          <button
            disabled
            style={{
              backgroundColor: "red",
              width: "50px",
              height: "50px",
              position: "absolute",
              top: "20%",
              right: "110%",
              alignContent: "center",
            }}
          />
        </label>
        <label
          className="cuadros"
          style={{
            position: "absolute",
            top: "40%",
            left: "8%",
            color: "black",
            textAlign: "center",
          }}
        >
          <strong>Libre</strong>
          <button
            disabled
            style={{
              backgroundColor: "green",
              width: "50px",
              height: "50px",
              position: "absolute",
              top: "50%",
              right: "110%",
              alignContent: "center",
            }}
          />
        </label>

        <div className="parking-lot">
          {espacios.map((espacio) => (
            <button
              key={espacio.id}
              className={espacio.ocupado ? "buttonFalse" : "buttonTrue"}
              disabled // Evita que se modifique en esta app
            >
              {espacio.id}
            </button>
          ))}
        </div>
        <a href="/">
          <button type="button" className="butonn">
            Volver
          </button>
        </a>
      </div>

      <a href="/Ambiente" className="carros-planta-link" title="Haz clic aquí ">
        <img
          src="https://img.freepik.com/fotos-premium/planta-maceta-dibujos-animados-hojas-verdes-sobre-fondo-blanco-ai-generativo_958124-8168.jpg"
          alt="Ilustración de una planta"
          className="pre-registro-planta"
        />
      </a>
    </div>
  );
};

export default EstacionamientoC;
