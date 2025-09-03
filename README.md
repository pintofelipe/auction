# 🌐 Proyecto Fullstack con Next.js, Tailwind CSS y Node.js (Express) para una subasta

Este es un proyecto **Fullstack** que combina un frontend moderno construido con **Next.js + Tailwind CSS** y un backend en **Node.js con Express**.  
La arquitectura está diseñada para mantener una separación clara entre frontend y backend, asegurando escalabilidad, mantenibilidad y facilidad de despliegue.

---

## 🚀 Tecnologías utilizadas

### Frontend
- [Next.js](https://nextjs.org/) → Framework de React para renderizado híbrido (SSR/SSG).  
- [Tailwind CSS](https://tailwindcss.com/) → Framework de utilidades para estilos rápidos y consistentes.  
- [Vite + Tailwind Plugin](https://tailwindcss.com/docs/installation/using-vite) → Optimización en el build y desarrollo.  

### Backend
- [Node.js](https://nodejs.org/) → Entorno de ejecución para JavaScript.  
- [Express](https://expressjs.com/) → Framework minimalista para crear servidores y APIs.  
- [CORS](https://www.npmjs.com/package/cors) → Middleware para habilitar comunicación entre frontend y backend.  
- [Nodemon](https://nodemon.io/) → Herramienta que reinicia el servidor automáticamente en desarrollo.  

---

## 📦 Instalación y configuración

## Comando utilizados#

- npx create-next-app@latest

- npm install tailwindcss @tailwindcss/vite

## Para Backend

- npm init -y --> Inicializar Node.js
- Intalar dependencias
- npm install express cors
- npm install -D nodemon
express → framework para crear el servidor.
cors → permite conectar frontend y backend.
nodemon → reinicia el servidor automáticamente cuando cambias código.


npm install react-router-dom@6


npm install mongoose dotenv bcryptjs

- mongoose: Es la librería estándar para modelar y interactuar con MongoDB en Node.js.

- dotenv: Para manejar variables de entorno (como la URL de tu base de datos) de forma segura.

- bcryptjs: Esencial para encriptar (hashear) las contraseñas antes de guardarlas. Nunca guardes contraseñas en texto plano.