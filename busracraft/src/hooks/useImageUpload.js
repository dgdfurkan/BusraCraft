import { useState, useCallback } from 'react'
import { compressImage, createThumbnail } from '../utils/imageCompressor'
import { uploadImage } from '../utils/firebaseHelpers'

export function useImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const upload = useCallback(async (file, folder = 'recipes') => {
    setUploading(true)
    setProgress(10)

    try {
      const compressed = await compressImage(file)
      setProgress(40)

      const thumbnail = await createThumbnail(file)
      setProgress(60)

      const timestamp = Date.now()
      const mainUrl = await uploadImage(
        compressed,
        `${folder}/${timestamp}_main.jpg`
      )
      setProgress(80)

      const thumbUrl = await uploadImage(
        thumbnail,
        `${folder}/${timestamp}_thumb.jpg`
      )
      setProgress(100)

      return { url: mainUrl, thumbnail: thumbUrl }
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }, [])

  const uploadMultiple = useCallback(async (files, folder = 'recipes') => {
    setUploading(true)
    const results = []
    for (let i = 0; i < files.length; i++) {
      setProgress(Math.round(((i + 1) / files.length) * 100))
      const result = await upload(files[i], folder)
      results.push(result)
    }
    setUploading(false)
    setProgress(0)
    return results
  }, [upload])

  return { upload, uploadMultiple, uploading, progress }
}
