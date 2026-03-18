import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import Dropdown from '../ui/Dropdown'
import StepEditor from './StepEditor'
import ImageUploader from '../ui/ImageUploader'
import Icon from '../ui/Icon'
import { DIFFICULTIES } from '../../utils/constants'
import { useAuth } from '../../context/AuthContext'

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-primary/10 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm'

const difficultyStyles = {
  easy: {
    active: 'bg-green-500 text-white shadow-md shadow-green-500/20',
    inactive: 'bg-green-50 text-green-600 border border-green-200 hover:bg-green-100',
  },
  medium: {
    active: 'bg-amber-500 text-white shadow-md shadow-amber-500/20',
    inactive: 'bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100',
  },
  hard: {
    active: 'bg-red-500 text-white shadow-md shadow-red-500/20',
    inactive: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100',
  },
}

function SectionLabel({ icon, children }) {
  return (
    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
      <Icon name={icon} size="text-lg" className="text-primary" />
      {children}
    </label>
  )
}

export default function RecipeForm({
  initialData = {},
  categories = [],
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = 'Kaydet',
}) {
  const { isMember } = useAuth()
  const [form, setForm] = useState({
    title: '',
    category: '',
    difficulty: 'easy',
    yarnInfo: { brand: '', color: '', thickness: '' },
    needleSize: '',
    steps: [{ order: 1, text: '', imageUrl: '' }],
    photos: [],
    notes: '',
    tags: [],
    isPublic: false,
    ...initialData,
  })
  const [tagInput, setTagInput] = useState('')
  const [newPhotos, setNewPhotos] = useState([])

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm((prev) => ({ ...prev, ...initialData }))
    }
  }, [initialData])

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const updateYarnInfo = (field, value) => {
    setForm((prev) => ({
      ...prev,
      yarnInfo: { ...prev.yarnInfo, [field]: value },
    }))
  }

  const addTag = () => {
    const tag = tagInput.trim().replace(/^#/, '')
    if (tag && !form.tags.includes(tag)) {
      updateField('tags', [...form.tags, tag])
    }
    setTagInput('')
  }

  const removeTag = (tag) => {
    updateField('tags', form.tags.filter((t) => t !== tag))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onSubmit({ ...form, newPhotos })
  }

  const categoryOptions = categories.map((cat) => ({
    value: cat.id || cat.name,
    label: `${cat.emoji} ${cat.name}`,
    icon: cat.emoji,
  }))

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="bg-white border border-primary/10 rounded-xl p-5 shadow-sm space-y-4">
        <SectionLabel icon="edit">Tarif Adı</SectionLabel>
        <input
          type="text"
          value={form.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Amigurumi Ayıcık"
          required
          className={inputClass}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
              <Icon name="category" size="text-lg" className="text-primary" />
              Kategori
            </label>
            <Dropdown
              value={form.category}
              onChange={(val) => updateField('category', val)}
              options={categoryOptions}
              placeholder="Kategori seçin..."
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
              <Icon name="signal_cellular_alt" size="text-lg" className="text-primary" />
              Zorluk
            </label>
            <div className="flex gap-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => updateField('difficulty', d.id)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    form.difficulty === d.id
                      ? difficultyStyles[d.id].active
                      : difficultyStyles[d.id].inactive
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-primary/10 rounded-xl p-5 shadow-sm space-y-3">
        <SectionLabel icon="inventory_2">İp / Yün Bilgileri</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={form.yarnInfo.brand}
            onChange={(e) => updateYarnInfo('brand', e.target.value)}
            placeholder="Marka (Alize...)"
            className={inputClass}
          />
          <input
            type="text"
            value={form.yarnInfo.color}
            onChange={(e) => updateYarnInfo('color', e.target.value)}
            placeholder="Renk"
            className={inputClass}
          />
          <input
            type="text"
            value={form.yarnInfo.thickness}
            onChange={(e) => updateYarnInfo('thickness', e.target.value)}
            placeholder="Kalınlık"
            className={inputClass}
          />
        </div>
      </div>

      <div className="bg-white border border-primary/10 rounded-xl p-5 shadow-sm">
        <SectionLabel icon="hardware">Tığ / Şiş Numarası</SectionLabel>
        <input
          type="text"
          value={form.needleSize}
          onChange={(e) => updateField('needleSize', e.target.value)}
          placeholder="3.5mm Tığ"
          className={inputClass}
        />
      </div>

      <div className="bg-white border border-primary/10 rounded-xl p-5 shadow-sm">
        <StepEditor steps={form.steps} onChange={(steps) => updateField('steps', steps)} />
      </div>

      <div className="bg-white border border-primary/10 rounded-xl p-5 shadow-sm">
        <SectionLabel icon="photo_camera">Fotoğraflar</SectionLabel>
        <ImageUploader
          images={[...(form.photos || []), ...newPhotos]}
          onChange={(all) => {
            const existingUrls = (form.photos || []).filter((p) => typeof p === 'string')
            const files = all.filter((p) => typeof p !== 'string')
            updateField('photos', existingUrls)
            setNewPhotos(files)
          }}
        />
      </div>

      <div className="bg-white border border-primary/10 rounded-xl p-5 shadow-sm space-y-3">
        <SectionLabel icon="sell">Etiketler</SectionLabel>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="#hediye, #kolay"
            className={`flex-1 ${inputClass}`}
          />
          <Button type="button" variant="secondary" size="md" onClick={addTag}>
            <Icon name="add" size="text-base" />
            Ekle
          </Button>
        </div>
        {form.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-500 transition-colors"
                >
                  <Icon name="close" size="text-sm" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border border-primary/10 rounded-xl p-5 shadow-sm">
        <SectionLabel icon="description">Notlar</SectionLabel>
        <textarea
          value={form.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Serbest notlar..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {isMember && (
        <div className="bg-white border border-primary/10 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="public" size="text-xl" className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">Herkese Açık Paylaş</p>
                <p className="text-xs text-slate-400">Keşfet sayfasında görünsün</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => updateField('isPublic', !form.isPublic)}
              className={`relative w-12 h-7 rounded-full transition-colors duration-200 cursor-pointer ${
                form.isPublic ? 'bg-primary' : 'bg-slate-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  form.isPublic ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={loading} className="flex-1">
          <Icon name="check" size="text-base" />
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            <Icon name="close" size="text-base" />
            İptal
          </Button>
        )}
      </div>
    </motion.form>
  )
}
