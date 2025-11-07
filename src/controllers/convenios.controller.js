// src/controllers/convenios.controller.js
import { ConvenioModel } from "../models/convenio.model.js";

/**
 * Controlador de Convenios
 * Maneja las peticiones HTTP y delega la lógica de base de datos al modelo.
 */

// ✅ Crear un nuevo convenio
export const crearConvenio = async (req, res) => {
  try {
    const data = req.body;

    // Validación mínima
    if (!data.id || !data.nombre || !data.empresa_institucion || !data.fecha_inicio) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevoConvenio = await ConvenioModel.create(data);

    res.status(201).json({
      message: "✅ Convenio creado con éxito",
      convenio: nuevoConvenio,
    });
  } catch (error) {
    console.error("❌ Error al crear convenio:", error);
    res.status(500).json({ error: "Error al crear convenio" });
  }
};

// ✅ Obtener todos los convenios
export const obtenerConvenios = async (req, res) => {
  try {
    const convenios = await ConvenioModel.findAll();
    res.json(convenios);
  } catch (error) {
    console.error("❌ Error al listar convenios:", error);
    res.status(500).json({ error: "Error al listar convenios" });
  }
};

// ✅ Obtener un convenio por ID
export const obtenerConvenioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const convenio = await ConvenioModel.findById(id);

    res.json(convenio);
  } catch (error) {
    console.error("❌ Error al obtener convenio:", error);
    res.status(404).json({ error: "Convenio no encontrado" });
  }
};

// ✅ Actualizar convenio
export const actualizarConvenio = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const convenioActualizado = await ConvenioModel.update(id, data);

    res.json({
      message: "✅ Convenio actualizado correctamente",
      convenio: convenioActualizado,
    });
  } catch (error) {
    console.error("❌ Error al actualizar convenio:", error);
    res.status(500).json({ error: "Error al actualizar convenio" });
  }
};

// ✅ Eliminar convenio
export const eliminarConvenio = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await ConvenioModel.delete(id);
    res.json(resultado);
  } catch (error) {
    console.error("❌ Error al eliminar convenio:", error);
    res.status(500).json({ error: "Error al eliminar convenio" });
  }
};
