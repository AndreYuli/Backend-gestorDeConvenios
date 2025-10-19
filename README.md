# Backend - Gestor de Convenios

Backend para la gestión de convenios universitarios desarrollado con Node.js, Express y MongoDB.

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación basada en tokens
- **bcryptjs** - Hash de contraseñas
- **Zod** - Validación de esquemas
- **cookie-parser** - Manejo de cookies
- **CORS** - Control de acceso de origen cruzado
- **dotenv** - Variables de entorno

## 📝 Scripts Disponibles

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

## 🔒 Seguridad

- Las contraseñas se hashean con bcryptjs antes de almacenarse
- Autenticación mediante JWT almacenado en cookies HTTP-only
- Validación de datos con Zod
- CORS configurado para permitir solo el frontend autorizado

## comandos 
npm install - instala las dependencias del proyecto