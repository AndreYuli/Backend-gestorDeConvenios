# 🎓 Backend - Sistema de Gestión de Convenios UNAC

Backend para la gestión de convenios universitarios desarrollado con Node.js, Express y PostgreSQL.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web minimalista
- **PostgreSQL** - Base de datos relacional
- **Prisma ORM** - Object-Relational Mapping moderno
- **JWT** - Autenticación basada en tokens
- **bcryptjs** - Hash de contraseñas
- **Zod** - Validación de esquemas
- **cookie-parser** - Manejo de cookies
- **CORS** - Control de acceso de origen cruzado
- **Morgan** - Logger de peticiones HTTP
- **dotenv** - Variables de entorno

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v16 o superior ([Descargar aquí](https://nodejs.org/))
- **PostgreSQL** v12 o superior ([Descargar aquí](https://www.postgresql.org/download/))
- **npm** o **yarn** (viene con Node.js)
- Un editor de código (recomendado: VS Code)

---

## 🚀 Instalación y Configuración

### **1. Clonar el repositorio**

```bash
git clone https://github.com/AndreYuli/Backend-gestorDeConvenios.git
cd Backend-gestorDeConvenios
```

### **2. Instalar dependencias**

```bash
npm install
```

### **3. Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto del servidor
PORT=3000

# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/nombre_base_datos"

# Secret para JWT tokens (usa una clave segura en producción)
TOKEN_SECRET="tu_clave_secreta_super_segura_aqui"

# URL del frontend para CORS
FRONTEND_URL="http://localhost:5173"

# Entorno de ejecución
NODE_ENV="development"
```

### **4. Generar Prisma Client**

```bash
npm run db:generate
```

---

## ▶️ Comandos Disponibles

### **Desarrollo**
```bash
# Iniciar servidor en modo desarrollo (con hot-reload)
npm run dev
```

---

## ▶️ Comandos Disponibles

### **Desarrollo**
```bash
# Iniciar servidor en modo desarrollo (con hot-reload)
npm run dev
```

### **Producción**
```bash
# Iniciar servidor en modo producción
npm start
```

### **Base de Datos (Prisma)**
```bash
# Generar Prisma Client
npm run db:generate

# Sincronizar esquema con la base de datos
npm run db:push

# Crear y ejecutar migraciones
npm run db:migrate

# Abrir Prisma Studio (interfaz visual de la BD)
npm run db:studio

# Ejecutar seeds (datos iniciales)
npm run db:seed

# Resetear base de datos
npm run db:reset
```

---

## 🌐 Endpoints de la API

### **Base URL**
```
http://localhost:3000/api
```

### **Autenticación** (`/api/auth`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | Iniciar sesión | No |
| GET | `/auth/verify` | Verificar token JWT | Sí (Cookie) |
| POST | `/auth/logout` | Cerrar sesión | Sí (Cookie) |
| POST | `/auth/register` | Registro (Deshabilitado) | No |

### **Health Check**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Estado del servidor |
| GET | `/health` | Health check |

---

## 🔐 Autenticación

El sistema usa **JWT (JSON Web Tokens)** almacenados en **cookies HTTP-only** para la autenticación.

### **Flujo de autenticación:**

1. Usuario envía credenciales a `/api/auth/login`
2. Backend valida credenciales
3. Se genera un JWT token válido por 24 horas
4. Token se envía como cookie HTTP-only
5. Frontend incluye automáticamente la cookie en peticiones subsiguientes
6. Backend valida el token en rutas protegidas

### **Usuarios de prueba:**

```javascript
// Administrador
{
  "email": "admin@unac.edu.co",
  "password": "admin123"
}

// Estudiante
{
  "email": "juan.perez@unac.edu.co",
  "password": "student123"
}
```

---

## 🗄️ Estructura del Proyecto

```
Backend-gestorDeConvenios/
├── prisma/
│   └── schema.prisma          # Esquema de la base de datos
├── src/
│   ├── controllers/           # Lógica de controladores
│   │   └── auth.controller.js
│   ├── middlewares/           # Middlewares personalizados
│   │   ├── auth.middleware.js
│   │   ├── adminAuth.middleware.js
│   │   └── validator.middleware.js
│   ├── models/                # Modelos de datos
│   │   └── usuario.model.js
│   ├── routes/                # Definición de rutas
│   │   └── auth.routes.js
│   ├── schemas/               # Esquemas de validación (Zod)
│   │   └── auth.schema.js
│   ├── libs/                  # Utilidades y helpers
│   │   └── jwt.js
│   ├── app.js                 # Configuración de Express
│   ├── config.js              # Variables de configuración
│   ├── db.js                  # Conexión a la base de datos
│   └── index.js               # Punto de entrada principal
├── .env                       # Variables de entorno (no versionar)
├── .gitignore                 # Archivos ignorados por git
├── package.json               # Dependencias y scripts
└── README.md                  # Este archivo
```

---

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con **bcryptjs** (salt rounds: 10)
- ✅ Tokens JWT con expiración de **24 horas**
- ✅ Cookies **HTTP-only** (no accesibles desde JavaScript)
- ✅ Cookies **secure** en producción (solo HTTPS)
- ✅ **CORS** configurado para permitir solo el frontend autorizado
- ✅ Validación de datos con **Zod**
- ✅ Variables sensibles en archivo **.env** (no versionado)
- ✅ Logging de peticiones con **Morgan**

---

## 🔧 Configuración de CORS

El backend está configurado para aceptar peticiones desde el frontend en:
```javascript
origin: process.env.FRONTEND_URL || "http://localhost:5173"
credentials: true
```

Si cambias la URL del frontend, actualiza la variable `FRONTEND_URL` en el archivo `.env`.

---

## 📊 Base de Datos

### **Modelos principales:**

- **Usuario** - Información de usuarios (estudiantes, admins)
- **Rol** - Roles del sistema (estudiante, administrador)
- **Convenio** - Información de convenios
- **Facultad** - Facultades de la universidad
- **ConvenioFacultad** - Relación entre convenios y facultades

### **Ver base de datos visualmente:**

```bash
npm run db:studio
```

Esto abrirá Prisma Studio en `http://localhost:5555`

---

## 🧪 Pruebas con Thunder Client / Postman

### **1. Login**
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@unac.edu.co",
  "password": "admin123"
}
```

### **2. Verificar Token**
```http
GET http://localhost:3000/api/auth/verify
# La cookie se envía automáticamente
```

### **3. Logout**
```http
POST http://localhost:3000/api/auth/logout
# Requiere estar autenticado (cookie)
```

---

## 🐛 Solución de Problemas

### **Error: "No se puede conectar a la base de datos"**
- Verifica que PostgreSQL esté corriendo
- Revisa la variable `DATABASE_URL` en el archivo `.env`
- Asegúrate de que la base de datos existe

### **Error: "Module not found"**
```bash
npm install
npm run db:generate
```

### **Error: "Port already in use"**
- Cambia el puerto en el archivo `.env`
- O mata el proceso usando el puerto 3000

### **Error de CORS**
- Verifica que `FRONTEND_URL` en `.env` coincida con tu frontend
- Asegúrate de tener `withCredentials: true` en axios del frontend

---


## 👥 Roles del Sistema

| Rol ID | Nombre | Descripción | Redirección |
|--------|--------|-------------|-------------|
| 1 | Estudiante | Usuario regular | `/menuprincipal` |
| 2 | Administrador | Acceso completo | `/menuPrincipalAdmin` |

---