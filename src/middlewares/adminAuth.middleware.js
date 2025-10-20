import UsuarioModel from "../models/usuario.model.js";

export const adminAuth = async (req, res, next) => {
  try {
    // Verificar que el usuario esté autenticado
    if (!req.user || !req.user.id) {
      return res.status(401).json({ 
        message: "Usuario no autenticado" 
      });
    }

    // Buscar el usuario completo en la base de datos
    const user = await UsuarioModel.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ 
        message: "Usuario no encontrado" 
      });
    }

    // Verificar que sea administrador
    if (!UsuarioModel.isAdmin(user)) {
      return res.status(403).json({ 
        message: "Acceso denegado. Se requieren permisos de administrador" 
      });
    }

    // Agregar la información del usuario a la request
    req.adminUser = user;
    next();
  } catch (error) {
    return res.status(500).json({ 
      message: "Error al verificar permisos de administrador",
      error: error.message 
    });
  }
};