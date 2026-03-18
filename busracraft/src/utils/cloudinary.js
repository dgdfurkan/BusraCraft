const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export function isCloudinaryConfigured() {
  return !!CLOUD_NAME && !!UPLOAD_PRESET
}

export async function uploadToCloudinary(file, folder = 'busracraft') {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary yapılandırılmamış. .env dosyasına VITE_CLOUDINARY_CLOUD_NAME ve VITE_CLOUDINARY_UPLOAD_PRESET ekleyin.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)
  if (folder) formData.append('folder', folder)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Cloudinary yükleme hatası: ${res.status}`)
  }

  const data = await res.json()
  return data.secure_url
}
