import { Router } from "express";
import {
  crearConvenio,
  obtenerConvenios,
  obtenerConvenioPorId,
  actualizarConvenio,
  eliminarConvenio
} from "../controllers/convenios.controller.js";

const router = Router();

// Crear convenio
router.post("/", crearConvenio);

// Listar todos los convenios
router.get("/", obtenerConvenios);

// Obtener convenio por ID
router.get("/:id", obtenerConvenioPorId);

// Actualizar convenio
router.put("/:id", actualizarConvenio);

// Eliminar convenio
router.delete("/:id", eliminarConvenio);

export default router;
