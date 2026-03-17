export default function KnittingAnimation({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 320"
      className={className}
      role="img"
      aria-label="Örgü animasyonu"
    >
      <defs>
        <style>{`
          @keyframes leftNeedleYield {
            0%, 100% { transform: rotate(0deg) translate(0, 0); }
            30% { transform: rotate(2deg) translate(-2px, 2px); }
            70% { transform: rotate(-1deg) translate(1px, -1px); }
          }
          .ka-needle-left { animation: leftNeedleYield 1.2s infinite ease-in-out; transform-origin: 180px 250px; }

          @keyframes rightNeedleKnit {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            20% { transform: translate(-25px, -15px) rotate(-8deg); }
            40% { transform: translate(-30px, -5px) rotate(-4deg); }
            70% { transform: translate(15px, 20px) rotate(5deg); }
            85% { transform: translate(5px, 10px) rotate(2deg); }
          }
          .ka-needle-right { animation: rightNeedleKnit 1.2s infinite cubic-bezier(0.4, 0.0, 0.2, 1); transform-origin: 420px 250px; }

          @keyframes fabricBounce {
            0%, 100% { transform: translateY(0) scaleY(1); }
            30% { transform: translateY(-2px) scaleY(0.98); }
            70% { transform: translateY(8px) scaleY(1.05); }
          }
          .ka-fabric-group { animation: fabricBounce 1.2s infinite ease-in-out; transform-origin: 280px 100px; }

          @keyframes fabricPullRight {
            0%, 100% { transform: skewX(0deg); }
            70% { transform: skewX(-5deg); }
          }
          .ka-fabric-mesh { animation: fabricPullRight 1.2s infinite ease-in-out; transform-origin: 280px 100px; }

          @keyframes yarnBallTug {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            60% { transform: translateY(0) rotate(0deg); }
            70% { transform: translateY(-8px) translateX(-5px) rotate(-15deg); }
            85% { transform: translateY(2px) translateX(0px) rotate(5deg); }
          }
          .ka-yarn-ball-group { animation: yarnBallTug 1.2s infinite cubic-bezier(0.3, 0.8, 0.4, 1); transform-origin: 480px 240px; }

          @keyframes yarnShadowTug {
            0%, 100% { transform: scaleX(1); opacity: 0.8; }
            60% { transform: scaleX(1); opacity: 0.8; }
            70% { transform: scaleX(0.6); opacity: 0.3; }
            85% { transform: scaleX(1.1); opacity: 0.9; }
          }
          .ka-yarn-shadow { animation: yarnShadowTug 1.2s infinite cubic-bezier(0.3, 0.8, 0.4, 1); transform-origin: 480px 265px; }

          @keyframes sparkleFloat {
            0% { transform: translateY(0) scale(0); opacity: 0; }
            50% { opacity: 1; transform: translateY(-20px) scale(1) rotate(15deg); }
            100% { transform: translateY(-40px) scale(0); opacity: 0; }
          }
          .ka-sparkle { animation: sparkleFloat 2s infinite ease-in; transform-origin: center; }
          .ka-delay-1 { animation-delay: 0.6s; }
          .ka-delay-2 { animation-delay: 1.2s; }
        `}</style>
      </defs>

      <rect width="100%" height="100%" fill="transparent" />

      <ellipse cx="300" cy="270" rx="140" ry="12" fill="#E5E7EB" opacity="0.6" />
      <ellipse cx="480" cy="265" rx="25" ry="6" fill="#E5E7EB" className="ka-yarn-shadow" />

      <g fill="#FBCFE8">
        <path d="M 240 70 Q 245 60 255 55 Q 245 50 240 40 Q 235 50 225 55 Q 235 60 240 70 Z" className="ka-sparkle" />
        <path d="M 350 90 Q 353 85 360 82 Q 353 79 350 74 Q 347 79 340 82 Q 347 85 350 90 Z" className="ka-sparkle ka-delay-1" />
        <path d="M 270 40 Q 272 35 277 32 Q 272 29 270 24 Q 268 29 263 32 Q 268 35 270 40 Z" className="ka-sparkle ka-delay-2" />
      </g>

      <path fill="none" stroke="#F472B6" strokeWidth="4" strokeLinecap="round">
        <animate
          attributeName="d"
          values="M 310 110 Q 380 200 470 240;M 285 95 Q 350 210 470 240;M 280 105 Q 360 190 470 240;M 325 130 Q 390 185 465 232;M 310 110 Q 380 200 470 240"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </path>

      <g className="ka-needle-left">
        <line x1="180" y1="260" x2="290" y2="100" stroke="#D4A373" strokeWidth="8" strokeLinecap="round" />
        <line x1="285" y1="107" x2="300" y2="85" stroke="#D4A373" strokeWidth="6" strokeLinecap="round" />
        <line x1="190" y1="245" x2="280" y2="114" stroke="#E6CCB2" strokeWidth="2" strokeLinecap="round" />
        <circle cx="178" cy="263" r="12" fill="#EC4899" />
        <circle cx="175" cy="260" r="4" fill="#FBCFE8" />

        <g className="ka-fabric-group">
          <g className="ka-fabric-mesh">
            <path d="M 230 140 L 290 100 L 310 170 L 260 210 Z" fill="#FBCFE8" stroke="#F472B6" strokeWidth="4" strokeLinejoin="round" />
            <g fill="none" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 235 145 L 245 155 L 255 135 L 265 145 L 275 125 L 285 135 L 295 115" />
              <path d="M 245 165 L 255 175 L 265 155 L 275 165 L 285 145 L 295 155 L 305 135" />
              <path d="M 255 185 L 265 195 L 275 175 L 285 185 L 295 165 L 305 175 L 315 155" />
            </g>
            <line x1="260" y1="210" x2="255" y2="225" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" />
            <line x1="275" y1="200" x2="270" y2="215" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" />
            <line x1="290" y1="190" x2="285" y2="205" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" />
            <line x1="305" y1="180" x2="300" y2="195" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" />
          </g>
        </g>
      </g>

      <g className="ka-needle-right">
        <line x1="420" y1="260" x2="305" y2="105" stroke="#D4A373" strokeWidth="8" strokeLinecap="round" />
        <line x1="310" y1="112" x2="295" y2="92" stroke="#D4A373" strokeWidth="6" strokeLinecap="round" />
        <line x1="410" y1="246" x2="310" y2="112" stroke="#E6CCB2" strokeWidth="2" strokeLinecap="round" />
        <circle cx="422" cy="263" r="12" fill="#EC4899" />
        <circle cx="419" cy="260" r="4" fill="#FBCFE8" />
        <path d="M 295 92 Q 315 110 325 105" fill="none" stroke="#F472B6" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g className="ka-yarn-ball-group">
        <circle cx="480" cy="240" r="28" fill="#F472B6" />
        <path d="M 460 220 Q 480 205 500 230" fill="none" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
        <path d="M 455 235 Q 480 225 505 245" fill="none" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
        <path d="M 460 255 Q 480 245 495 260" fill="none" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
        <path d="M 470 215 Q 460 240 480 265" fill="none" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" />
        <path d="M 490 220 Q 480 245 495 260" fill="none" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" />
        <path d="M 465 220 Q 475 215 485 218" fill="none" stroke="#FBCFE8" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}
