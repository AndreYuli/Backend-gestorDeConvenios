// Modelo de Convenio para el sistema de gestión UNAC
// - Esquema mongoose para convenios institucionales
// - Campos: id, nombre, descripcion, empresa_institucion, fecha_inicio, fecha_fin, estado
// - Campos adicionales: tipo_convenio, beneficios, requisitos, contacto, imagen_url
// - Estados válidos: Activo, Inactivo, Pausado, Vencido
// - Relación con facultades (many-to-many) y usuario creador
// - Validaciones de fechas y estados
