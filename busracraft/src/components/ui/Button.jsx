import { motion } from 'framer-motion'
import Icon from './Icon'

const variants = {
  primary:
    'bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/20',
  secondary:
    'bg-white border-2 border-primary/20 hover:border-primary text-slate-700 font-bold',
  danger: 'bg-error hover:opacity-90 text-white font-bold',
  ghost: 'bg-primary/5 text-primary hover:bg-primary/10 font-bold',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon,
  onClick,
  ...rest
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <Icon name="progress_activity" size="text-base" className="animate-spin" />
      ) : icon ? (
        <Icon name={icon} size="text-base" />
      ) : null}
      {children}
    </motion.button>
  )
}
