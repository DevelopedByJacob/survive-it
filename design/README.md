# Originales de diseño

Imágenes fuente en alta resolución. **No las usa la app**: viven fuera de `public/` para que no se copien a la build.

- `avatars/avatar-N.png`: avatares originales (1254×1254).
- `avatars/avatar-N-60.jpg`: versión senior de cada avatar, generada con Gemini a partir del original.

La app usa versiones optimizadas en `public/avatars/` (`avatar-N.webp` y `avatar-N-60.webp`, 256×256 px en WebP). Si cambias un original, vuelve a exportarlo a ese tamaño y formato.
