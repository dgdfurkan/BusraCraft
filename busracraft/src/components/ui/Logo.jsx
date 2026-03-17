export default function Logo({ size = 40, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="BüşraCraft logosu"
    >
      <defs>
        <linearGradient id="yarnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9A8D4" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#BE185D" />
        </linearGradient>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E5E7EB" />
          <stop offset="50%" stopColor="#F9FAFB" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>
        <linearGradient id="mintGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="50%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      <g transform="translate(3, 2) scale(0.95)">
        <g filter="url(#logoShadow)">
          <rect x="28" y="24" width="8" height="42" fill="url(#metalGrad)" />
          <path d="M 28 24 L 28 12 C 28 4, 36 4, 36 12 L 36 15 C 32 15, 30 17, 34 19 L 36 21 L 36 24 Z" fill="url(#metalGrad)" />
          <rect x="26" y="66" width="12" height="44" rx="6" fill="url(#mintGrad)" />
          <rect x="26" y="76" width="12" height="2" fill="#064E3B" opacity="0.2" />
          <rect x="26" y="82" width="12" height="2" fill="#064E3B" opacity="0.2" />
          <rect x="26" y="88" width="12" height="2" fill="#064E3B" opacity="0.2" />
          <rect x="28" y="68" width="2" height="40" rx="1" fill="#FFFFFF" opacity="0.5" />
          <rect x="29" y="10" width="1.5" height="56" fill="#FFFFFF" opacity="0.7" />
        </g>

        <g filter="url(#logoShadow)">
          <path
            d="M 18 28 C 32 24, 71 24, 86 35 C 96 45, 80 66, 42 66 C 38 66, 38 68, 42 68 C 80 68, 114 80, 102 100 C 92 116, 56 118, 32 116 C 26 115, 18 112, 18 112"
            fill="none"
            stroke="url(#yarnGrad)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 18 28 C 32 24, 71 24, 86 35 C 96 45, 80 66, 42 66 C 38 66, 38 68, 42 68 C 80 68, 114 80, 102 100 C 92 116, 56 118, 32 116 C 26 115, 18 112, 18 112"
            fill="none"
            stroke="#831843"
            strokeWidth="16"
            strokeDasharray="1 6"
            strokeLinecap="round"
            opacity="0.15"
          />
          <path
            d="M 18 28 C 32 24, 71 24, 86 35 C 96 45, 80 66, 42 66 C 38 66, 38 68, 42 68 C 80 68, 114 80, 102 100 C 92 116, 56 118, 32 116 C 26 115, 18 112, 18 112"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.4"
            transform="translate(-1.5, -1.5)"
          />
        </g>
      </g>
    </svg>
  )
}
