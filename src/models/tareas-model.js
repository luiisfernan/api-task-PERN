const pool = require("../database");

const getTarea = async (cb) => {
  try {
    await pool.query(`SELECT * FROM tbl_tareas`, cb);
  } catch (error) {
    console.log(error);
  }
};

const addTarea = async (tarea, cb) => {
  try {
    await pool.query(
      `INSERT INTO public.tbl_tareas(
	name_tarea, descripcion_tarea)
	VALUES ($1, $2);`,
      [tarea.name_tarea, tarea.descripcion_tarea],
      cb
    );
  } catch (error) {
    console.log(error);
  }
};

const updTarea = async (tarea, cb) => {
  try {
    await pool.query(
      `UPDATE public.tbl_tareas
	SET name_tarea=$2, descripcion_tarea=$3
	WHERE id_tarea = $1;`,
      [tarea.id_tarea, tarea.name_tarea, tarea.descripcion_tarea],
      cb
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteTarea = async (id_tarea, cb) => {
  try {
    await pool.query(
      `delete from tbl_tareas where id_tarea = $1`,
      [id_tarea],
      cb
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getTarea, addTarea, deleteTarea, updTarea};
