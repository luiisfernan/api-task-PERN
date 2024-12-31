const {
  getTarea,
  addTarea,
  deleteTarea,
  updTarea,
} = require("../models/tareas-model");

const TareaGet = (req, res) => {
  getTarea((err, tareas) => {
    if (err) {
      let locals = {
        title: `Error al visualizar los registros`,
        error: err,
      };
      res.status(520).json(err);
    } else {
      res.status(200).json(tareas.rows);
    }
  });
};

const TareaAdd = (req, res) => {
  var { name_tarea, descripcion_tarea } = req.body;

  var tarea = {
    name_tarea,
    descripcion_tarea,
  };

  addTarea(tarea, (err, tareas) => {
    if (err) {
      let locals = {
        title: `Error al visualizar los registros`,
        error: err,
      };
      res.status(520).json(err);
    } else {
      res.status(200).json("Registrado Correctamente");
    }
  });
};

const TareaUpd = (req, res) => {
  var { name_tarea, descripcion_tarea } = req.body;
  var { id_tarea } = req.params;

  var tarea = {
    id_tarea,
    name_tarea,
    descripcion_tarea,
  };

  updTarea(tarea, (err, tareas) => {
    if (err) {
      let locals = {
        title: `Error al visualizar los registros`,
        error: err,
      };
      res.status(520).json(err);
    } else {
      res.status(200).json("Actualizado Correctamente");
    }
  });
};

const TareaDelete = (req, res) => {
  var { id_tarea } = req.params;

  deleteTarea(id_tarea, (err) => {
    if (err) {
      let locals = {
        title: `Error al visualizar los registros`,
        error: err,
      };
      res.status(520).json(err);
    } else {
      res.status(200).json("Eliminado Correctamente");
    }
  });
};

module.exports = { TareaGet, TareaAdd, TareaUpd, TareaDelete };
