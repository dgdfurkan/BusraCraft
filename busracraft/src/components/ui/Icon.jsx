export default function Icon({ name, className = '', size = 'text-xl', fill = false }) {
  return (
    <span
      className={`material-symbols-outlined ${size} ${className}`}
      style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  )
}
