import { useState, useRef } from 'react'
import Icon from '../ui/Icon'

const MAX_LENGTH = 500

export default function CommentInput({ onSubmit, sending, disabled }) {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() || sending) return
    onSubmit(text.trim())
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-1 relative">
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))}
          onKeyDown={handleKeyDown}
          placeholder="Yorum yaz..."
          rows={1}
          disabled={disabled}
          className="w-full px-3 py-2.5 rounded-xl border border-primary/10 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none disabled:opacity-50"
          onInput={(e) => {
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
          }}
        />
        {text.length > MAX_LENGTH * 0.8 && (
          <span className="absolute bottom-1 right-2 text-[10px] text-slate-400">
            {text.length}/{MAX_LENGTH}
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={!text.trim() || sending || disabled}
        className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 disabled:opacity-40 hover:brightness-110 transition-all cursor-pointer"
      >
        <Icon name={sending ? 'hourglass_empty' : 'send'} size="text-lg" />
      </button>
    </form>
  )
}
