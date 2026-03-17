import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../ui/Icon'

export default function PhotoGallery({ photos = [], title, category, difficulty }) {
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  if (photos.length === 0) return null

  const prev = (e) => {
    e.stopPropagation()
    setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1))
  }
  const next = (e) => {
    e.stopPropagation()
    setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1))
  }

  const difficultyLabels = { easy: 'Kolay', medium: 'Orta', hard: 'Zor' }

  return (
    <>
      <div className="relative group w-full aspect-[16/10] rounded-xl overflow-hidden bg-primary/5 shadow-sm border border-primary/10">
        <div
          className="w-full h-full cursor-pointer"
          onClick={() => setFullscreen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={photos[current]}
              alt={title || ''}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>
        </div>

        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
            >
              <Icon name="chevron_left" size="text-2xl" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
            >
              <Icon name="chevron_right" size="text-2xl" />
            </button>
          </>
        )}

        {title && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-lg border border-primary/10 shadow-lg">
            <h2 className="text-lg font-bold text-slate-800 leading-tight">{title}</h2>
            <div className="flex items-center gap-2 mt-1.5">
              {category && (
                <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                  <Icon name="category" size="text-sm" />
                  {category}
                </span>
              )}
              {difficulty && (
                <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Icon name="signal_cellular_alt" size="text-sm" />
                  {difficultyLabels[difficulty] || difficulty}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {photos.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 mt-4 scrollbar-hide">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all cursor-pointer ${
                i === current
                  ? 'border-2 border-primary shadow-md'
                  : 'border border-primary/10 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
          >
            <img
              src={photos[current]}
              alt=""
              className="max-w-full max-h-full object-contain"
            />

            <button
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              onClick={() => setFullscreen(false)}
            >
              <Icon name="close" size="text-2xl" />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <Icon name="chevron_left" size="text-3xl" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <Icon name="chevron_right" size="text-3xl" />
                </button>
              </>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    i === current ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
