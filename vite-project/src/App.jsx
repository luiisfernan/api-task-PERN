import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

import { FaPlus } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { MdDeleteSweep } from "react-icons/md";

import Navbar from "./components/Navbar";

function App() {
  const [tareas, setTareas] = useState([]);
  const [addtarea, setAddTarea] = useState(false);

  const [eliminar, setEliminar] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [regEliminar, setRegEliminar] = useState(0);
  const [name, setName] = useState("");
  const [id_act, setIdAct] = useState(0);
  const [descripcion, setDescripcion] = useState("");

  const abrirVentana = () => setAddTarea(true);
  const cerrarVentana = () => setAddTarea(false);

  const abrirVentanaAct = (tareas) => {
    setName(tareas.name_tarea);
    setDescripcion(tareas.descripcion_tarea);
    setIdAct(tareas.id_tarea);
    setActualizar(true);
  };
  const cerrarVentanaAct = () => {
    setName("");
    setDescripcion("");
    setActualizar(false);
  };

  const abrirVentana1 = (id_tarea) => {
    setRegEliminar(id_tarea);
    setEliminar(true);
  };
  const cerrarVentana1 = () => setEliminar(false);

  const getTareas = async () => {
    try {
      const tareasjson = await axios.get("http://localhost:3000/tareas");
      setTareas(tareasjson.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTareas();
  }, []);

  const addTareas = async () => {
    try {
      var tareasAdded = { name_tarea: name, descripcion_tarea: descripcion };

      await axios.post("http://localhost:3000/tareas/add", tareasAdded);
      setName("");
      setDescripcion("");
      getTareas();
      cerrarVentana();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene la recarga del formulario
    addTareas(); // Llama a la función para agregar la tarea
  };

  const eliminarTarea = async (id_tarea) => {
    try {
      await axios.delete(`http://localhost:3000/tareas/delete/${id_tarea}`);
      getTareas();
      cerrarVentana1();
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarTarea = async (e) => {
    e.preventDefault();
    try {
      var updTarea = {
        name_tarea: name,
        descripcion_tarea: descripcion,
      };

      await axios.put(
        `http://localhost:3000/tareas/update/${id_act}`,
        updTarea
      );
      getTareas();
      cerrarVentanaAct();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <>
      <div id="nav">
        <Navbar />
      </div>
      <div id="content">
        <div className="overflow-x-auto">
          <div className="flex justify-end mb5">
            <button className="bg-slate-700 mb-5 " onClick={abrirVentana}>
              <FaPlus />
            </button>
          </div>
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-left">Tarea</th>
                <th className="py-3 px-6 text-left">Descripción</th>
                <th className="py-3 px-6 text-left">Acción</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {tareas.map((tareas) => (
                <tr key={tareas.id_tarea} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-6">{tareas.name_tarea}</td>
                  <td className="py-3 px-6">{tareas.descripcion_tarea}</td>
                  <td>
                    <button
                      onClick={() => abrirVentanaAct(tareas)}
                      className="py-3 px-6 bg-blue-700 text-white"
                    >
                      <IoCreate />
                    </button>
                    <button
                      onClick={() => abrirVentana1(tareas.id_tarea)}
                      className="ml-2 py-3 px-6 bg-red-700 text-white"
                    >
                      <MdDeleteSweep />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {addtarea && (
            <div className="fixed inset-0 bg-slate-700 bg-opacity-100 flex justify-center items-center z-50 text-slate-700">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Crear Tarea</h2>
                <div className="block">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white mb-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Descripción"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)} // Añadido onChange para descripción
                      className="bg-white mb-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none"
                    >
                      Guardar
                    </button>
                  </form>
                </div>

                {/* Botón para cerrar la ventana */}
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none mt-5"
                  onClick={cerrarVentana}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {eliminar && (
            <div className="fixed inset-0 bg-slate-700 bg-opacity-100 flex justify-center items-center z-50 text-slate-700">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">
                  Eliminar Registro
                </h2>

                {/* Botón para cerrar la ventana */}
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none mt-5"
                  onClick={() => {
                    eliminarTarea(regEliminar);
                  }}
                >
                  Eliminar
                </button>

                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-red-600 focus:outline-none mt-5"
                  onClick={cerrarVentana1}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {eliminar && (
            <div className="fixed inset-0 bg-slate-700 bg-opacity-100 flex justify-center items-center z-50 text-slate-700">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">
                  Eliminar Registro
                </h2>
                <p className="text-lg mt-2">
                  Está seguro de eliminar el registro?
                </p>

                {/* Botón para cerrar la ventana */}
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none mt-5"
                  onClick={() => {
                    eliminarTarea(regEliminar);
                  }}
                >
                  Eliminar
                </button>

                <button
                  className="ml-3 px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none mt-5"
                  onClick={cerrarVentana1}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {actualizar && (
            <div className="fixed inset-0 bg-slate-700 bg-opacity-100 flex justify-center items-center z-50 text-slate-700">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Actualizar Tarea</h2>
                <div className="block">
                  <form onSubmit={actualizarTarea}>
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white mb-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Descripción"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)} // Añadido onChange para descripción
                      className="bg-white mb-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none"
                    >
                      Actualizar
                    </button>
                  </form>
                </div>

                {/* Botón para cerrar la ventana */}
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none mt-5"
                  onClick={cerrarVentanaAct}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
