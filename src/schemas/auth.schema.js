import { z } from "zod";

// Solo validación para login - register deshabilitado
export const loginSchema = z.object({
  email: z.string({
    required_error: "Email o código estudiantil es requerido",
  }).min(1, "Email o código estudiantil no puede estar vacío"),
  password: z.string({
    required_error: "Contraseña es requerida",
  }).min(1, "Contraseña no puede estar vacía"),
});

// Schema para register (deshabilitado pero mantenido para compatibilidad)
export const registerSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});
