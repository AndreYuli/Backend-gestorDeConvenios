import prisma from "../utils/db.js";

// ✅ Crear un nuevo convenio
export const crearConvenio = async (req, res) => {
  try {
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
      facultades_ids // Array con los IDs de facultades asociadas (opcional)
    } = req.body;

    // 🔍 Validaciones mínimas
    if (!id || !nombre || !empresa_institucion || !fecha_inicio || !fecha_fin) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // 🧱 Crear el convenio principal
    const nuevoConvenio = await prisma.convenios.create({
      data: {
        id,
        nombre,
        descripcion,
        empresa_institucion,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
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
        convenio_facultades: true,
      },
    });

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
    const convenios = await prisma.convenios.findMany({
      include: {
        usuarios: { select: { id: true, nombres: true, apellidos: true, email: true } },
        convenio_facultades: { include: { facultades: true } },
      },
      orderBy: { created_at: "desc" },
    });
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
    const convenio = await prisma.convenios.findUnique({
      where: { id },
      include: {
        usuarios: true,
        convenio_facultades: { include: { facultades: true } },
      },
    });

    if (!convenio) {
      return res.status(404).json({ error: "Convenio no encontrado" });
    }

    res.json(convenio);
  } catch (error) {
    console.error("❌ Error al obtener convenio:", error);
    res.status(500).json({ error: "Error al obtener convenio" });
  }
};

// ✅ Actualizar convenio
export const actualizarConvenio = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const convenioActualizado = await prisma.convenios.update({
      where: { id },
      data,
      include: {
        convenio_facultades: true,
      },
    });

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

    await prisma.convenios.delete({
      where: { id },
    });

    res.json({ message: "🗑️ Convenio eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar convenio:", error);
    res.status(500).json({ error: "Error al eliminar convenio" });
  }
};
