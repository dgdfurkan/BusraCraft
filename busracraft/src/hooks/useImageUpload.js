import { useState, useCallback } from 'react'
import { compressImage } from '../utils/imageCompressor'
import { uploadToCloudinary } from '../utils/cloudinary'
import { useAuth } from '../context/AuthContext'

export function useImageUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { user } = useAuth()

  const upload = useCallback(async (file, folder = 'busracraft') => {
    setUploading(true)
    setProgress(10)

    try {
      const compressed = await compressImage(file)
      setProgress(50)

      const cloudFolder = user?.uid ? `${folder}/${user.uid}` : folder
      const url = await uploadToCloudinary(compressed, cloudFolder)
      setProgress(100)

      return { url }
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }, [user?.uid])

  const uploadMultiple = useCallback(async (files, folder = 'busracraft') => {
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
