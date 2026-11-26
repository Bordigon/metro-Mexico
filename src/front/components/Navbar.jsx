import { useState } from "react";
import { Linea1 } from "../LineasM/Linea1";
import { Linea2 } from "../LineasM/Linea2";
import { Linea3 } from "../LineasM/Linea3";


// juntamos las 3 lineas en una sola lista y quitamos las estaciones que salen repetidas por transbordo
const todas = [...Linea1, ...Linea2, ...Linea3];
const paradas = [];
const nombresVistos = [];

for (let i = 0; i < todas.length; i++) {
  if (!nombresVistos.includes(todas[i].nombre)) {
    nombresVistos.push(todas[i].nombre);
    paradas.push(todas[i]);
  }
}



const Navbar = ({ alCalcularRuta }) => {

  // lo que el usuario elige en pantalla 
  const [salida, setSalida] = useState("");
  const [llegada, setLlegada] = useState("");

  // las 4 casillas de condiciones, que empiezan desmarcadas(en false)
  const [movilidad, setMovilidad] = useState(false);
  const [horaPunta, setHoraPunta] = useState(false);
  const [lluvia, setLluvia] = useState(false);
  const [sinTransbordo, setSinTransbordo] = useState(false);

  // aqui guardamos el resultado del viaje y los avisos de error
  const [resultado, setResultado] = useState(null);
  const [aviso, setAviso] = useState("");



  // lo que pasa cuando pulsas el boton de Buscar ruta
  const buscarRuta = async () => {
    // comprobamos que no falte ninguna estacion 
    if (salida === "" || llegada === "") {
      setAviso("Elige una estación de salida y otra de llegada.");
      return;
    }
    //ni sean la misma
    if (salida === llegada) {
      setAviso("La estación de salida y la de llegada no pueden ser la misma.");
      return;
    }

    setAviso(""); 

    // mandamos los datos al servidor de python para que calcule la ruta (lo que es el backend)
    try {
      const url = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:3001";
      const respuesta = await fetch(url + "/api/ruta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origen: salida,
          destino: llegada,
          filtros: {
            movilidad_reducida: movilidad,
            hora_punta: horaPunta,
            lluvia: lluvia,
            evitar_transbordos: sinTransbordo
          }
        })
      });

      const datos = await respuesta.json();
      setResultado(datos); // guardamos la respuesta 

      // iluminamos las estaciones de esa ruta
      if (alCalcularRuta) alCalcularRuta(datos.ruta);

    } catch (error) {
      setAviso("No se ha podido conectar con el servidor."); //en caso de que haya problemas con conectarse al backend
    }
  };



  // borramos todo y ponemos en false todos los filtros para así poder empezar una busqueda desde 0
  const limpiar = () => {
    setSalida("");
    setLlegada("");

    setMovilidad(false);
    setHoraPunta(false);
    setLluvia(false);
    setSinTransbordo(false);

    setResultado(null);
    setAviso("");
    if (alCalcularRuta) alCalcularRuta([]);
   };



  // lo que se dibuja en pantalla
  return (
    <div>
      {/* boton que abre el panel lateral */}
      <button
        className="btn-solid theme-primary"
        type="button"
        data-bs-toggle="drawer"
        data-bs-target="#drawerScrolling"
        aria-controls="drawerScrolling"
      >
        Calcular ruta
      </button>

      {/* panel lateral que sale por la izquierda */}
      <dialog
        className="drawer drawer-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        id="drawerScrolling"
        aria-labelledby="drawerScrollingLabel"
      >

        {/* cabecera del panel con el titulo y la X para cerrar el panel */}
        <div className="drawer-header">
          <h5 className="drawer-title" id="drawerScrollingLabel">Opciones de viaje</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="drawer"
            aria-label="Close"
          ></button>
        </div>


        {/* cuerpo del panel */}
        <div className="drawer-body">

          {/* desplegable de salida */}
          <div className="mb-2">
            <label className="form-label fw-bold">Desde (Salida)</label>
            <select
              className="form-select"
              value={salida}
              onChange={(e) => setSalida(e.target.value)}
            >
              <option value="">Elige estación de salida...</option>
              {paradas.map((p) => (
                <option key={p.nombre} value={p.nombre}>{p.data.label}</option>
              ))}
            </select>
          </div>


          {/* desplegable de llegada */}
          <div className="mb-3">
            <label className="form-label fw-bold">Hasta (Llegada)</label>
            <select
              className="form-select"
              value={llegada}
              onChange={(e) => setLlegada(e.target.value)}
            >
              <option value="">Elige estación de llegada...</option>
              {paradas.map((p) => (
                <option key={p.nombre}value={p.nombre}>{p.data.label}</option>
              ))}
            </select>
          </div>


          {/* cajita con las 4 condiciones del trayecto */}
          <div className="p-2 mb-3 bg-light border rounded">

            <strong className="d-block mb-1">Condiciones del trayecto:</strong>

            <label className="d-block">
              <input type="checkbox" checked={movilidad} onChange={(e) => setMovilidad(e.target.checked)} /> Movilidad reducida
             </label>

            <label className="d-block">
              <input type="checkbox" checked={horaPunta} onChange={(e) => setHoraPunta(e.target.checked)} /> Hora punta
            </label>

            <label className="d-block">
              <input type="checkbox" checked={lluvia} onChange={(e) => setLluvia(e.target.checked)} /> Lluvia
            </label>


            <label className="d-block">
              <input type="checkbox" checked={sinTransbordo} onChange={(e) => setSinTransbordo(e.target.checked)} /> Evitar transbordos
            </label>
          </div>


          {/* cartel rojo si falta elegir algo o falla la conexion */}
          
          {aviso !== "" && (
               <div className="alert alert-danger py-1 px-2 mb-2">{aviso}</div>
           )}


          {/* botones de buscar y limpiar */}
          <div className="d-flex gap-2">
          <button type="button" className="btn-solid theme-primary flex-grow-1" onClick={buscarRuta}>
              Buscar ruta
            </button>

          <button type="button" className="btn btn-outline-secondary" onClick={limpiar}>
            Limpiar
          </button>
          </div>


          {/* resumen del viaje, te dice el tiempo estimado, el número de las paradas y el número de trasbordos */}
          {resultado !== null && (
            <div className="mt-3 pt-3 border-top">
              
              <p className="mb-1"><strong>Tiempo estimado:</strong> {resultado.tiempo_estimado} min</p>
              <p className="mb-1"><strong>Número de paradas:</strong> {resultado.ruta.length}</p>
              <p className="mb-2"><strong>Transbordos:</strong> {resultado.transbordos ? resultado.transbordos.length : 0}</p>

              <strong>Paradas que hay que coger:</strong>
               <ol className="ps-3 mt-1" style={{ maxHeight: "170px", overflowY: "auto" }}>
                {resultado.ruta.map((parada, i) => {

                  // quitamos los guiones del nombre y lo ponemos en mayusculas
                  let nombreBonito = parada.replace(/-/g, " ").toUpperCase();
                  if (resultado.transbordos && resultado.transbordos.includes(parada)) {
                    nombreBonito = nombreBonito + " (Transbordo)";
                  }

                  return <li key={i}>{nombreBonito}</li>;
                 })}
                </ol>
              </div>
            )}

         </div>
        </dialog>
  </div>
  );
};

export default Navbar;