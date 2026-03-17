import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon'

export default function ImageUploader({ images = [], onChange, maxImages = 10 }) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = (files) => {
    const newFiles = Array.from(files).filter((f) => f.type.startsWith('image/'))
    const total = [...images, ...newFiles].slice(0, maxImages)
    onChange(total)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
          transition-all duration-200
          ${
            dragActive
              ? 'border-primary bg-primary/5 scale-[1.01]'
              : 'border-primary/30 hover:border-primary hover:bg-primary/5'
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Icon
          name="cloud_upload"
          size="text-4xl"
          className={`block mx-auto mb-3 transition-colors ${dragActive ? 'text-primary' : 'text-primary/60'}`}
        />
        <p className="text-sm font-semibold text-text mb-1">
          Fotoğraf sürükleyin veya tıklayarak seçin
        </p>
        <p className="text-xs text-text-secondary">
          Maks. {maxImages} fotoğraf
        </p>
      </div>

      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-3 sm:grid-cols-4 gap-3"
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <img
                  src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(i)
                  }}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Icon name="close" size="text-sm" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
