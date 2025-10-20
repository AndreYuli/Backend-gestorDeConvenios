import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();

// Solo login y verificación - no registro
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", auth, logout);

// Registro deshabilitado (solo para mantener compatibilidad si se llama)
router.post("/register", register);

export default router;
