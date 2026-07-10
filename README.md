# ⚡ VoltSchedule
**Gestión inteligente de horarios y servicios.**

VoltSchedule es una aplicación moderna (PWA) diseñada para la gestión de citas y horarios, construida con la última tecnología de 2026 para garantizar velocidad, seguridad y una experiencia de usuario fluida.

---

## 🚀 Stack Tecnológico

### Frontend Core
* **React 19** & **TypeScript**
* **Vite 8** (HMR ultra rápido)
* **Tailwind CSS 4.0** (Estilizado de última generación)

### Estado y Datos
* **TanStack Query v5**: Gestión de caché y sincronización de datos.
* **Zustand**: Gestión de estado global ligero.
* **Supabase**: Autenticación y base de datos en tiempo real.

### UX/UI
* **Framer Motion**: Animaciones fluidas.
* **Lucide React**: Iconografía consistente.
* **Sonner**: Notificaciones elegantes (Toasts).
* **i18next**: Soporte multi-idioma.

---

## 🛠️ Instalación y Desarrollo

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/kenerbotina/voltschedule.git](https://github.com/kenerbotina/voltschedule.git)
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` con tus credenciales de Supabase:
    ```env
    VITE_SUPABASE_URL=tu_url
    VITE_SUPABASE_ANON_KEY=tu_key
    ```

4.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```

---

## 📱 PWA (Progressive Web App)
Este proyecto está configurado como una PWA. Para generar los assets necesarios, utiliza:
```bash
npm run pwa-assets
# voltschedule
