import imageCompression from 'browser-image-compression'
import { IMAGE_CONFIG } from './constants'

export async function compressImage(file) {
  const options = {
    maxSizeMB: IMAGE_CONFIG.maxSizeMB,
    maxWidthOrHeight: IMAGE_CONFIG.maxWidth,
    useWebWorker: true,
    fileType: 'image/jpeg',
    initialQuality: IMAGE_CONFIG.quality,
  }
  return imageCompression(file, options)
}

export async function createThumbnail(file) {
  const options = {
    maxSizeMB: 0.05,
    maxWidthOrHeight: IMAGE_CONFIG.thumbnailWidth,
    useWebWorker: true,
    fileType: 'image/jpeg',
    initialQuality: IMAGE_CONFIG.thumbnailQuality,
  }
  return imageCompression(file, options)
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
