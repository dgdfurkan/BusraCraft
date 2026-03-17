export default function CatYarnAnimation({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 350"
      className={className}
      role="img"
      aria-label="Kedi ve yumak animasyonu"
    >
      <defs>
        <style>{`
          @keyframes cy-rollYarn {
            0% { transform: translateX(0) rotate(0deg); }
            100% { transform: translateX(-35px) rotate(-45deg); }
          }
          .cy-yarn-roll { transform-origin: 150px 250px; animation: cy-rollYarn 1.5s ease-in-out infinite alternate; }

          @keyframes cy-swipePaw {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-35deg) translateY(10px); }
          }
          .cy-paw-swipe { transform-origin: 270px 230px; animation: cy-swipePaw 1.5s ease-in-out infinite alternate; }

          @keyframes cy-wagTail {
            0% { transform: rotate(-10deg); }
            100% { transform: rotate(20deg); }
          }
          .cy-tail-wag { transform-origin: 410px 230px; animation: cy-wagTail 2s ease-in-out infinite alternate; }

          @keyframes cy-bobHead {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-3deg) translateX(-2px); }
          }
          .cy-head-bob { transform-origin: 290px 180px; animation: cy-bobHead 1.5s ease-in-out infinite alternate; }

          @keyframes cy-floatHeart {
            0% { transform: translateY(0) scale(0.5); opacity: 0; }
            50% { opacity: 0.6; }
            100% { transform: translateY(-40px) scale(1); opacity: 0; }
          }
          .cy-floating-heart { animation: cy-floatHeart 3s ease-in infinite; opacity: 0; }
          .cy-delay-1 { animation-delay: 1s; }
          .cy-delay-2 { animation-delay: 2s; }
        `}</style>
      </defs>

      <line x1="50" y1="285" x2="450" y2="285" stroke="#FCE7F3" strokeWidth="6" strokeLinecap="round" />
      <line x1="100" y1="295" x2="400" y2="295" stroke="#FCE7F3" strokeWidth="4" strokeLinecap="round" opacity="0.5" />

      <g className="cy-floating-heart" transform="translate(180, 120)">
        <path d="M10,3 C5,-2 0,2 0,8 C0,15 10,22 10,22 C10,22 20,15 20,8 C20,2 15,-2 10,3 Z" fill="#F472B6" />
      </g>
      <g className="cy-floating-heart cy-delay-1" transform="translate(320, 80) scale(0.8)">
        <path d="M10,3 C5,-2 0,2 0,8 C0,15 10,22 10,22 C10,22 20,15 20,8 C20,2 15,-2 10,3 Z" fill="#F472B6" />
      </g>
      <g className="cy-floating-heart cy-delay-2" transform="translate(230, 90) scale(0.6)">
        <path d="M10,3 C5,-2 0,2 0,8 C0,15 10,22 10,22 C10,22 20,15 20,8 C20,2 15,-2 10,3 Z" fill="#F472B6" />
      </g>

      {/* Cat body & back legs */}
      <g>
        <g className="cy-tail-wag">
          <path d="M 410 230 Q 460 180 440 120 Q 430 90 410 100 Q 420 160 395 210" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="2" />
          <path d="M 440 120 Q 430 90 410 100 Q 413 120 425 130 Z" fill="#9CA3AF" />
        </g>
        <ellipse cx="380" cy="255" rx="25" ry="18" fill="#D1D5DB" />
        <ellipse cx="395" cy="275" rx="15" ry="10" fill="#E5E7EB" />
        <ellipse cx="340" cy="240" rx="75" ry="45" fill="#E5E7EB" />
        <path d="M 330 195 C 370 195 400 210 410 230 C 380 235 340 215 330 195 Z" fill="#9CA3AF" opacity="0.5" />
        <path d="M 280 230 Q 270 280 285 280 Q 300 280 310 240" fill="#D1D5DB" />
      </g>

      {/* Cat head */}
      <g className="cy-head-bob">
        <polygon points="255,150 240,90 290,125" fill="#E5E7EB" />
        <polygon points="258,140 248,105 280,128" fill="#FCE7F3" />
        <polygon points="305,120 340,75 335,135" fill="#E5E7EB" />
        <polygon points="312,125 332,90 328,130" fill="#FCE7F3" />
        <circle cx="290" cy="165" r="45" fill="#E5E7EB" />
        <path d="M 260 140 Q 290 150 320 135 Q 330 160 290 190 Q 250 160 260 140 Z" fill="#F3F4F6" />
        <path d="M 265 160 Q 272 155 278 160" fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
        <path d="M 298 160 Q 305 155 312 160" fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
        <polygon points="285,172 292,172 288.5,176" fill="#F472B6" />
        <path d="M 280 182 Q 284 186 288.5 176 Q 293 186 297 182" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
        <line x1="255" y1="165" x2="235" y2="160" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="255" y1="172" x2="232" y2="172" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="322" y1="165" x2="342" y2="160" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="322" y1="172" x2="345" y2="172" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Front paw (animated) */}
      <g className="cy-paw-swipe">
        <path d="M 280 230 Q 240 235 230 265 Q 260 270 290 240" fill="#E5E7EB" />
        <ellipse cx="228" cy="265" rx="12" ry="9" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" transform="rotate(-15, 228, 265)" />
        <line x1="222" y1="262" x2="225" y2="267" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="226" y1="260" x2="229" y2="268" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Yarn string */}
      <path fill="none" stroke="#F472B6" strokeWidth="3" strokeLinecap="round">
        <animate
          attributeName="d"
          values="M 150 250 Q 180 285 228 265;M 115 250 Q 160 270 215 275;M 150 250 Q 180 285 228 265"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      {/* Yarn ball */}
      <g className="cy-yarn-roll">
        <circle cx="150" cy="250" r="30" fill="#F472B6" />
        <path d="M 130 230 Q 150 220 170 240" fill="none" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
        <path d="M 125 245 Q 150 235 175 255" fill="none" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
        <path d="M 130 265 Q 150 250 165 270" fill="none" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
        <path d="M 140 225 Q 135 250 155 275" fill="none" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" />
        <path d="M 160 225 Q 155 250 170 265" fill="none" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  )
}
