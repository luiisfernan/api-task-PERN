const {Router} = require('express')
const router = Router()

const {TareaGet, TareaAdd, TareaUpd, TareaDelete} = require('../controllers/tarea-controller')
router.get('/tareas', TareaGet)
router.post('/tareas/add', TareaAdd)
router.put('/tareas/update/:id_tarea', TareaUpd)
router.delete('/tareas/delete/:id_tarea', TareaDelete)

module.exports = router;