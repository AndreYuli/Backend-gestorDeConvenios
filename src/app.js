// Configuración Principal de Express para sistema UNAC
// - Configuración de middlewares globales:
//   * CORS para frontend React
//   * Morgan para logging de requests
//   * Express.json() para parsing JSON
//   * Cookie-parser para JWT en cookies
//   * Helmet para seguridad
// - Montaje de rutas con prefijo /api/v1
// - Middleware de manejo global de errores
// - Configuración de archivos estáticos para uploads

// import express from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
// import cookieParser from 'cookie-parser';
// import helmet from 'helmet';
// import { FRONTEND_URL } from './config/env.js';

// import authRoutes from './routes/auth.routes.js';
// import conveniosRoutes from './routes/convenios.routes.js';
// import facultadesRoutes from './routes/facultades.routes.js';
// import dashboardRoutes from './routes/dashboard.routes.js';
// import usuariosRoutes from './routes/usuarios.routes.js';
// import errorMiddleware from './middlewares/error.middleware.js';

// const app = express();

// // Middlewares de seguridad
// app.use(helmet());
// app.use(cors({
//   origin: FRONTEND_URL,
//   credentials: true
// }));
// app.use(morgan('dev'));
// app.use(express.json({ limit: '10mb' }));
// app.use(cookieParser());

// // Servir archivos estáticos
// app.use('/uploads', express.static('uploads'));

// // Routes con prefijo
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/convenios', conveniosRoutes);
// app.use('/api/v1/facultades', facultadesRoutes);
// app.use('/api/v1/dashboard', dashboardRoutes);
// app.use('/api/v1/usuarios', usuariosRoutes);

// // Ruta de salud
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     message: 'Backend UNAC - Gestión de Convenios',
//     timestamp: new Date().toISOString()
//   });
// });

// // Middleware de manejo de errores (debe ir al final)
// app.use(errorMiddleware);

// export default app;
