import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export class UsuarioModel {
  // Buscar usuario por email
  static async findByEmail(email) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { email },
        include: {
          roles: true
        }
      });
      return usuario;
    } catch (error) {
      throw new Error(`Error al buscar usuario por email: ${error.message}`);
    }
  }

  // Buscar usuario por código estudiantil
  static async findByCodigoEstudiante(codigoEstudiante) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { codigo_estudiante: codigoEstudiante },
        include: {
          roles: true
        }
      });
      return usuario;
    } catch (error) {
      throw new Error(`Error al buscar usuario por código: ${error.message}`);
    }
  }

  // Buscar usuario por ID
  static async findById(id) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id },
        include: {
          roles: true
        }
      });
      return usuario;
    } catch (error) {
      throw new Error(`Error al buscar usuario por ID: ${error.message}`);
    }
  }

  // Crear nuevo usuario
  static async create(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const usuario = await prisma.usuario.create({
        data: {
          ...userData,
          password: hashedPassword
        },
        include: {
          roles: true
        }
      });
      return usuario;
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  // Validar contraseña
  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Validar email institucional
  static isInstitutionalEmail(email) {
    return email.endsWith('@unac.edu.co');
  }

  // Actualizar último login
  static async updateLastLogin(userId) {
    try {
      await prisma.usuario.update({
        where: { id: userId },
        data: { ultimo_login: new Date() }
      });
    } catch (error) {
      console.error('Error al actualizar último login:', error);
    }
  }

  // Verificar si es administrador basado en rol_id
  static isAdmin(usuario) {
    return usuario.rol_id === 2;
  }

  // Verificar si es estudiante (cualquier rol que no sea admin)
  static isStudent(usuario) {
    return usuario.rol_id !== 2;
  }

  // Verificar si es docente
  static isTeacher(usuario) {
    return usuario.rol_id === 3;
  }
}

export default UsuarioModel;
