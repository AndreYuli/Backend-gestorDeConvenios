// Middleware de Autenticación para sistema UNAC
// - authRequired: verificar JWT en cookies o headers
// - adminRequired: verificar que el usuario sea administrador
// - docenteOrAdminRequired: verificar rol docente o admin
// - validateEmailInstitucional: validar email @unac.edu.co
// - Manejo de errores de token expirado o inválido
