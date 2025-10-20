import UsuarioModel from "../models/usuario.model.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

// Registro deshabilitado - Solo login con usuarios existentes en la base de datos
export const register = async (req, res) => {
  return res.status(403).json({
    message: ["Registro no disponible. Use sus credenciales institucionales existentes."],
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email institucional
    let userFound = await UsuarioModel.findByEmail(email);

    // Si no se encuentra por email, intentar buscar por código estudiantil
    if (!userFound && /^\d+$/.test(email)) {
      userFound = await UsuarioModel.findByCodigoEstudiante(email);
    }

    if (!userFound) {
      return res.status(400).json({
        message: ["Credenciales incorrectas. Verifique email/código y contraseña."],
      });
    }

    // Verificar si el usuario está activo
    if (!userFound.activo) {
      return res.status(403).json({
        message: ["Cuenta desactivada. Contacte al administrador."],
      });
    }

    // Validar contraseña
    const isMatch = await UsuarioModel.validatePassword(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["Credenciales incorrectas. Verifique email/código y contraseña."],
      });
    }

    // Determinar tipo de usuario basado en rol_id
    const isAdmin = userFound.rol_id === 2; // rol_id 2 = administrador
    const userType = isAdmin ? 'administrador' : 'estudiante';
    
    // Determinar URL de redirección basada en el rol
    const redirectUrl = isAdmin ? '/menuPrincipalAdmin' : '/menuprincipal';

    // Crear token de acceso
    const token = await createAccessToken({
      id: userFound.id,
      email: userFound.email,
      rol_id: userFound.rol_id,
      isAdmin: isAdmin
    });

    // Configuración de cookies según el entorno
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    };

    res.cookie("token", token, cookieOptions);

    // Respuesta exitosa con información del usuario y redirección
    res.json({
      success: true,
      message: `Bienvenido ${isAdmin ? 'Administrador' : 'Estudiante'} ${userFound.nombres}`,
      user: {
        id: userFound.id,
        username: userFound.nombres || 'Usuario',
        fullName: `${userFound.nombres || ''} ${userFound.apellidos || ''}`.trim(),
        email: userFound.email,
        codigoEstudiante: userFound.codigo_estudiante,
        rol: userType,
        isAdmin: isAdmin,
        lastLogin: new Date().toISOString()
      },
      redirect: {
        url: redirectUrl,
        message: isAdmin ? 'Redirigiendo a panel de administración...' : 'Redirigiendo a menú principal...'
      }
    });

    // Actualizar último login (opcional)
    await UsuarioModel.updateLastLogin(userFound.id);

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ 
      message: ["Error interno del servidor. Intente nuevamente."],
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  
  if (!token) {
    return res.status(401).json({ 
      isAuthenticated: false,
      message: "No hay token de autenticación" 
    });
  }

  jwt.verify(token, TOKEN_SECRET, async (error, decoded) => {
    if (error) {
      return res.status(401).json({ 
        isAuthenticated: false,
        message: "Token inválido" 
      });
    }

    try {
      const userFound = await UsuarioModel.findById(decoded.id);
      
      if (!userFound || !userFound.activo) {
        return res.status(401).json({ 
          isAuthenticated: false,
          message: "Usuario no encontrado o inactivo" 
        });
      }

      // Determinar tipo de usuario basado en rol_id
      const isAdmin = userFound.rol_id === 2;
      const userType = isAdmin ? 'administrador' : 'estudiante';
      const redirectUrl = isAdmin ? '/menuPrincipalAdmin' : '/menuprincipal';

      return res.json({
        isAuthenticated: true,
        user: {
          id: userFound.id,
          username: userFound.nombres || 'Usuario',
          fullName: `${userFound.nombres || ''} ${userFound.apellidos || ''}`.trim(),
          email: userFound.email,
          codigoEstudiante: userFound.codigo_estudiante,
          rol: userType,
          isAdmin: isAdmin
        },
        redirect: {
          url: redirectUrl,
          shouldRedirect: true
        }
      });
    } catch (error) {
      console.error('Error en verificación de token:', error);
      return res.status(401).json({ 
        isAuthenticated: false,
        message: "Error al verificar token" 
      });
    }
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
