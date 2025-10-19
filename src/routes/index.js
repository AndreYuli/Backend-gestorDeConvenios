// Enrutador principal del sistema UNAC
// - Configura prefijo /api/v1 para todas las rutas
// - Importa y monta todas las rutas del sistema:
//   * /auth - autenticación
//   * /convenios - gestión de convenios
//   * /facultades - consulta de facultades
//   * /dashboard - estadísticas
//   * /usuarios - gestión de usuarios
// - Middleware de manejo de rutas no encontradas

// import { Router } from 'express';
// import authRoutes from './auth.routes.js';
// import conveniosRoutes from './convenios.routes.js';
// import facultadesRoutes from './facultades.routes.js';
// import dashboardRoutes from './dashboard.routes.js';
// import usuariosRoutes from './usuarios.routes.js';

// const router = Router();

// // Montar rutas
// router.use('/auth', authRoutes);
// router.use('/convenios', conveniosRoutes);
// router.use('/facultades', facultadesRoutes);
// router.use('/dashboard', dashboardRoutes);
// router.use('/usuarios', usuariosRoutes);

// // Ruta por defecto para rutas no encontradas
// router.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Endpoint no encontrado',
//     path: req.originalUrl
//   });
// });

// export default router;