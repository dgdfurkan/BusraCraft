import { useState, useCallback } from 'react'
import { recognizeRecipe } from '../utils/ocrService'
import { fileToBase64 } from '../utils/imageCompressor'

export function useOCR() {
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const processImage = useCallback(async (file) => {
    setProcessing(true)
    setError(null)
    setResult(null)

    try {
      const base64 = await fileToBase64(file)
      const parsed = await recognizeRecipe(base64)
      setResult(parsed)
      return parsed
    } catch (err) {
      setError(err.message || 'OCR işlemi başarısız oldu')
      return null
    } finally {
      setProcessing(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
    setProcessing(false)
  }, [])

  return { processImage, processing, result, error, reset }
}
