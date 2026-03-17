import { useRef, useEffect } from 'react'
import Icon from '../ui/Icon'

export default function SearchBar({ value, onChange, autoFocus = false, placeholder = 'Tarif ara...' }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  return (
    <div className="flex items-center bg-white border border-primary/10 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
      <Icon name="search" className="text-primary" size="text-xl" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm flex-1 ml-3 placeholder:text-slate-400 text-slate-900"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Icon name="close" size="text-sm" className="text-slate-500" />
        </button>
      )}
    </div>
  )
}
