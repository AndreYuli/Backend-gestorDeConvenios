// src/models/convenio.model.js
import prisma from "../utils/db.js";

/**
 * 📘 ConvenioModel
 * Capa intermedia entre el controlador y Prisma.
 * Encapsula todas las operaciones CRUD sobre la tabla "convenios".
 */

export const ConvenioModel = {
  // ✅ Crear un nuevo convenio
  async create(data) {
    const {
      id,
      nombre,
      descripcion,
      empresa_institucion,
      fecha_inicio,
      fecha_fin,
      estado,
      tipo_convenio,
      beneficios,
      requisitos,
      contacto_nombre,
      contacto_email,
      contacto_telefono,
      imagen_url,
      documento_url,
      usuario_creador_id,
      facultades_ids, // array opcional con IDs de facultades
    } = data;

    // 🔍 Validaciones mínimas
    if (!id || !nombre || !empresa_institucion || !fecha_inicio) {
      throw new Error("Faltan campos obligatorios para crear el convenio");
    }

    // 🧱 Crear el convenio con relaciones
    const nuevoConvenio = await prisma.convenio.create({
      data: {
        id,
        nombre,
        descripcion,
        empresa_institucion,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: fecha_fin ? new Date(fecha_fin) : null,
        estado: estado || "Activo",
        tipo_convenio: tipo_convenio || "Institucional",
        beneficios,
        requisitos,
        contacto_nombre,
        contacto_email,
        contacto_telefono,
        imagen_url,
        documento_url,
        usuario_creador_id,
        convenio_facultades: facultades_ids
          ? {
              create: facultades_ids.map((facultad_id) => ({
                facultad_id,
              })),
            }
          : undefined,
      },
      include: {
        convenio_facultades: { include: { facultades: true } },
      },
    });

    return nuevoConvenio;
  },

  // ✅ Obtener todos los convenios
  async findAll() {
    return await prisma.convenio.findMany({
      include: {
        usuarios: { select: { id: true, nombres: true, apellidos: true, email: true } },
        convenio_facultades: { include: { facultades: true } },
      },
      orderBy: { created_at: "desc" },
    });
  },

  // ✅ Obtener un convenio por ID
  async findById(id) {
    const convenio = await prisma.convenio.findUnique({
      where: { id },
      include: {
        usuarios: true,
        convenio_facultades: { include: { facultades: true } },
      },
    });

    if (!convenio) throw new Error("Convenio no encontrado");
    return convenio;
  },

  // ✅ Actualizar un convenio
  async update(id, data) {
    return await prisma.convenio.update({
      where: { id },
      data,
      include: {
        convenio_facultades: { include: { facultades: true } },
      },
    });
  },

  // ✅ Eliminar un convenio
  async delete(id) {
    await prisma.convenio.delete({
      where: { id },
    });
    return { message: "🗑️ Convenio eliminado correctamente" };
  },
};
