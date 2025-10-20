import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const validateProfile = z.object({
  nombre: z.string({
    required_error: 'El nombre es requerido'
  }).min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  
  apellido: z.string({
    required_error: 'El apellido es requerido'
  }).min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres'),
  
  email: z.string({
    required_error: 'El email es requerido'
  }).email('Email inválido')
    .refine((email) => email.endsWith('@unac.edu.co'), {
      message: 'Solo se permiten emails institucionales @unac.edu.co'
    }),
  
  codigo_estudiante: z.string()
    .optional()
    .refine((codigo) => {
      if (codigo) {
        return /^\d+$/.test(codigo) && codigo.length >= 6 && codigo.length <= 15;
      }
      return true;
    }, {
      message: 'El código estudiantil debe ser numérico y tener entre 6 y 15 dígitos'
    }),
  
  telefono: z.string()
    .optional()
    .refine((telefono) => {
      if (telefono) {
        return /^[0-9+\-\s()]+$/.test(telefono) && telefono.length >= 7;
      }
      return true;
    }, {
      message: 'Número de teléfono inválido'
    }),
  
  password: z.string({
    required_error: 'La contraseña es requerida'
  }).min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'La contraseña debe contener al menos una minúscula, una mayúscula y un número'
    }),
  
  rol_id: z.number({
    required_error: 'El rol es requerido'
  }).int().positive('El rol debe ser un número válido'),
  
  facultad_id: z.number()
    .int()
    .positive('La facultad debe ser un número válido')
    .optional()
});

export const validatePassword = z.object({
  currentPassword: z.string({
    required_error: 'La contraseña actual es requerida'
  }).min(1, 'La contraseña actual es requerida'),
  
  newPassword: z.string({
    required_error: 'La nueva contraseña es requerida'
  }).min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'La nueva contraseña debe contener al menos una minúscula, una mayúscula y un número'
    })
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: 'La nueva contraseña debe ser diferente a la actual',
  path: ['newPassword']
});

export const validateForgotPassword = z.object({
  email: z.string({
    required_error: 'El email es requerido'
  }).email('Email inválido')
    .refine((email) => email.endsWith('@unac.edu.co'), {
      message: 'Solo se permiten emails institucionales @unac.edu.co'
    })
});

export const validateResetPassword = z.object({
  token: z.string({
    required_error: 'El token de recuperación es requerido'
  }).min(1, 'Token inválido'),
  
  newPassword: z.string({
    required_error: 'La nueva contraseña es requerida'
  }).min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'La nueva contraseña debe contener al menos una minúscula, una mayúscula y un número'
    })
});
