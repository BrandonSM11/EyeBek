# 📷 Configuración de Cloudinary para Fotos Privadas

## 🔐 Setup de Cloudinary

### 1. Crear cuenta en Cloudinary
- Ve a https://cloudinary.com/
- Regístrate con tu email
- Confirma tu email

### 2. Obtener credenciales
- En tu dashboard, ve a **Settings** → **API Keys**
- Copia:
  - **Cloud Name**
  - **API Key**
  - **API Secret**

### 3. Crear Upload Preset
1. Ve a **Settings** → **Upload**
2. Scroll hasta **Upload presets**
3. Haz click en **Add upload preset** (o **Create unsigned**)
4. Configura:
   - **Name**: `eyebek-admin-photos`
   - **Unsigned**: ON (para permitir uploads sin autenticación backend)
   - **Folder**: `eyebek/private-photos`
   - **Use filename or display name**: ON
   - **Unique filename**: OFF
5. Haz click en **Save**

### 4. Configurar variables de entorno

Agregaen tu `.env.local`:

```env
# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=eyebek-admin-photos
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
```

> ⚠️ **Importante**: Los prefijos `NEXT_PUBLIC_` son públicos (visibles en el cliente). Los demás son privados (servidor).

### 5. Instalar dependencia (opcional)
```bash
npm install next-cloudinary
```

---

## 🔒 Asegurar Carpeta Privada

### Opción 1: Usar Delivery Type "Authenticated"
Para mayor privacidad, configura deliveries de imágenes como:

```typescript
// Ejemplo: generar URL privada en el servidor
const privateUrl = cloudinary.url('eyebek/private-photos/photo.jpg', {
  sign_url: true,
  secure: true,
  type: 'authenticated',
});
```

### Opción 2: Usar Watermark/Overlay
Agrega marca de agua automática a fotos sensibles.

---

## 📸 Cómo Funciona el Formulario

### 1. **Tomar Foto con Cámara**
- Click en botón "Tomar Foto"
- Se abre la cámara del dispositivo
- Click en "Capturar Foto"

### 2. **Subir Archivo**
- Click en "Subir Archivo"
- Selecciona imagen del dispositivo

### 3. **Envío a Cloudinary**
```typescript
// El formulario convierte la imagen a base64
// → Sube a Cloudinary en carpeta: eyebek/private-photos
// → Obtiene URL segura
// → Envía URL al backend
```

### 4. **Guardado en Base de Datos**
```typescript
// La URL se guarda en el documento del administrador
{
  name: "Juan Pérez",
  email: "juan@example.com",
  photo: "https://res.cloudinary.com/...", // URL de la foto
  // ... otros campos
}
```

---

## 🔗 Estructura de URLs de Cloudinary

```
https://res.cloudinary.com/{cloud-name}/image/upload/
  v{version}/
  eyebek/private-photos/
  {filename}.jpg
```

**Ejemplo:**
```
https://res.cloudinary.com/mycloud/image/upload/v1702654321/eyebek/private-photos/juan-perez.jpg
```

---

## ✅ Test de Configuración

### 1. Verificar env vars
```bash
# En tu terminal
echo $NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
```

### 2. Probar upload en formulario
1. Ve a `/dashboard_company`
2. Haz click en "Crear usuario"
3. Prueba subir una foto
4. Verifica en Dashboard de Cloudinary que se subió correctamente

### 3. Verificar en BD
```javascript
// En MongoDB
db.administrators.findOne({email: "test@example.com"})
// Deberías ver:
// { photo: "https://res.cloudinary.com/..." }
```

---

## 🛡️ Políticas de Seguridad

### No hacer público:
❌ API Key  
❌ API Secret  
✅ Cloud Name (necesario en cliente)  
✅ Upload Preset (para unsigned uploads)

### Validaciones en formulario:
- ✅ Max 5MB por imagen
- ✅ Solo JPEG, PNG, WebP
- ✅ Validación email único
- ✅ Validación documento único

### En Cloudinary:
- ✅ Folder privada: `eyebek/private-photos`
- ✅ Transformaciones automáticas (resize, optimize)
- ✅ URLs con token para downloads privados

---

## 🚀 Deployment en Producción

### Vercel
1. Ve a Project Settings → Environment Variables
2. Agrega todas las variables del `.env.local`
3. Redeploy el proyecto

### Variables necesarias en Vercel:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
CLOUDINARY_API_KEY (opcional)
CLOUDINARY_API_SECRET (opcional)
```

---

## 📝 Documentación Cloudinary
- https://cloudinary.com/documentation
- https://cloudinary.com/documentation/upload_widget
- https://cloudinary.com/documentation/signed_uploads

---

## 🐛 Troubleshooting

### "Error uploading to Cloudinary"
- Verifica Cloud Name es correcto
- Verifica Upload Preset existe
- Verifica `.env.local` está actualizado

### "Imagen no aparece en carpeta"
- Verifica nombre del folder en preset
- Revisa que upload haya sido exitoso en respuesta

### "CORS Error"
- Esto es normal en desarrollo
- Cloudinary maneja CORS automáticamente
- Prueba en producción

---

¡Configuración completa! 🎉
