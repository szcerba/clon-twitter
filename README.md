
# Clon de Twitter

Este es un proyecto de [Next.js](https://nextjs.org/) creado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), utilizando [Supabase](https://supabase.io/) para la base de datos y autenticación, y aplicando los estilos de Tailwind CSS.

## Empezando

Primero, clona el repositorio a tu máquina local:

```bash
git clone https://github.com/szcerba/clon-twitter.git
cd clon-twitter
```

### Configuración del entorno

1. Crea un archivo `.env.local` en la raíz del proyecto.
2. Añade las siguientes variables de entorno con tus propias credenciales de Supabase:

```plaintext
NEXT_PUBLIC_SUPABASE_URL="https://lilmerfujkklvjpxpgms.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpbG1lcmZ1amtrbHZqcHhwZ21zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMjA0OTgsImV4cCI6MjAzMTc5NjQ5OH0.oqFANLOpmVdoCf0jlB4lPke50qHXHovo9wLrIDA133E"
```

### Instalación de dependencias

Instala las dependencias necesarias:

```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

### Levantar el servidor de desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

Puedes empezar a editar la página modificando `app/page.tsx`. La página se actualiza automáticamente a medida que editas el archivo.

### Uso de fuentes

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para optimizar y cargar automáticamente Inter, una fuente personalizada de Google.

## Aprende Más

Para aprender más sobre Next.js, consulta los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre las características y API de Next.js.
- [Aprende Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.

Puedes revisar el [repositorio de Next.js en GitHub](https://github.com/vercel/next.js/) - tus comentarios y contribuciones son bienvenidos.
