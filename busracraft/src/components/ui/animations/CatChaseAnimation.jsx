export default function CatChaseAnimation({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 320"
      className={className}
      role="img"
      aria-label="Koşan kedi animasyonu"
    >
      <defs>
        <style>{`
          @keyframes cc-moveGround { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 150; } }
          .cc-ground { stroke-dasharray: 40 80; animation: cc-moveGround 0.3s infinite linear; }
          .cc-ground-fast { stroke-dasharray: 20 100; animation: cc-moveGround 0.2s infinite linear; }

          @keyframes cc-wind {
            0% { transform: translateX(100px); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateX(-700px); opacity: 0; }
          }
          .cc-wind-line { animation: cc-wind infinite linear; }

          @keyframes cc-dustCloud {
            0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
            100% { transform: translate(-80px, -15px) scale(3); opacity: 0; }
          }
          .cc-dust { animation: cc-dustCloud 0.4s infinite ease-out; transform-origin: center; }

          @keyframes cc-catBody {
            0%, 100% { transform: translateY(8px) rotate(-3deg) scale(0.9, 1.1); }
            25% { transform: translateY(-10px) rotate(5deg) scale(1.0, 1.0); }
            50% { transform: translateY(-22px) rotate(0deg) scale(1.15, 0.85); }
            75% { transform: translateY(-5px) rotate(-8deg) scale(1.05, 0.95); }
          }
          .cc-cat-wrapper { animation: cc-catBody 0.4s infinite cubic-bezier(0.4, 0.0, 0.6, 1); transform-origin: 250px 190px; }

          @keyframes cc-shoulder {
            0%, 100% { transform: rotate(-30deg); }
            25% { transform: rotate(45deg); }
            50% { transform: rotate(15deg); }
            75% { transform: rotate(-45deg); }
          }
          @keyframes cc-elbow {
            0%, 100% { transform: rotate(-50deg); }
            25% { transform: rotate(-5deg); }
            50% { transform: rotate(10deg); }
            75% { transform: rotate(-20deg); }
          }
          @keyframes cc-hip {
            0%, 100% { transform: rotate(45deg); }
            25% { transform: rotate(10deg); }
            50% { transform: rotate(-50deg); }
            75% { transform: rotate(-10deg); }
          }
          @keyframes cc-knee {
            0%, 100% { transform: rotate(70deg); }
            25% { transform: rotate(20deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(50deg); }
          }
          .cc-f-shoulder { animation: cc-shoulder 0.4s infinite linear; }
          .cc-f-elbow { animation: cc-elbow 0.4s infinite linear; }
          .cc-b-hip { animation: cc-hip 0.4s infinite linear; }
          .cc-b-knee { animation: cc-knee 0.4s infinite linear; }

          @keyframes cc-headBalance {
            0%, 100% { transform: rotate(-6deg) translateY(2px); }
            50% { transform: rotate(4deg) translateY(-2px); }
          }
          .cc-head-bob { animation: cc-headBalance 0.4s infinite ease-in-out; transform-origin: 320px 160px; }

          @keyframes cc-tailWhip {
            0%, 100% { transform: rotate(35deg); }
            50% { transform: rotate(-10deg); }
          }
          .cc-tail-whip { animation: cc-tailWhip 0.4s infinite ease-in-out; transform-origin: 180px 180px; }

          @keyframes cc-yarnRoll {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-2px) rotate(180deg); }
            100% { transform: translateY(0) rotate(360deg); }
          }
          .cc-yarn-roll { animation: cc-yarnRoll 0.3s infinite linear; transform-origin: 480px 263px; }

          @keyframes cc-catShadow {
            0%, 100% { transform: scaleX(1) scaleY(1); opacity: 0.7; }
            50% { transform: scaleX(1.3) scaleY(0.7); opacity: 0.2; }
          }
          .cc-cat-shadow { animation: cc-catShadow 0.4s infinite cubic-bezier(0.4, 0.0, 0.6, 1); transform-origin: 250px 285px; }
        `}</style>
      </defs>

      <rect width="100%" height="100%" fill="transparent" />

      <line x1="0" y1="285" x2="600" y2="285" stroke="#FCE7F3" strokeWidth="5" strokeLinecap="round" className="cc-ground" />
      <line x1="0" y1="295" x2="600" y2="295" stroke="#FCE7F3" strokeWidth="3" strokeLinecap="round" opacity="0.6" className="cc-ground-fast" />

      <g fill="#F3F4F6">
        <circle cx="200" cy="280" r="4" className="cc-dust" style={{ animationDelay: '0s' }} />
        <circle cx="290" cy="285" r="3" className="cc-dust" style={{ animationDelay: '0.1s' }} />
        <circle cx="230" cy="275" r="5" className="cc-dust" style={{ animationDelay: '0.2s' }} />
        <circle cx="310" cy="280" r="4" className="cc-dust" style={{ animationDelay: '0.3s' }} />
      </g>

      <g stroke="#FBCFE8" strokeLinecap="round" opacity="0.7">
        <line x1="550" y1="90" x2="650" y2="90" strokeWidth="3" className="cc-wind-line" style={{ animationDuration: '0.4s', animationDelay: '0.1s' }} />
        <line x1="600" y1="160" x2="720" y2="160" strokeWidth="4" className="cc-wind-line" style={{ animationDuration: '0.3s', animationDelay: '0.3s' }} />
        <line x1="480" y1="220" x2="560" y2="220" strokeWidth="5" className="cc-wind-line" style={{ animationDuration: '0.25s', animationDelay: '0.5s' }} />
      </g>

      <ellipse cx="250" cy="285" rx="50" ry="6" fill="#E5E7EB" className="cc-cat-shadow" />
      <ellipse cx="480" cy="285" rx="22" ry="4" fill="#E5E7EB" opacity="0.8" />

      <path fill="none" stroke="#F472B6" strokeWidth="3" strokeLinecap="round">
        <animate
          attributeName="d"
          values="M 330 200 Q 380 285 430 282 L 480 282;M 330 215 Q 360 270 410 285 L 480 285;M 330 200 Q 380 285 430 282 L 480 282"
          dur="0.4s"
          repeatCount="indefinite"
        />
      </path>

      <g className="cc-yarn-roll">
        <circle cx="480" cy="263" r="22" fill="#F472B6" />
        <path d="M 465 248 Q 480 238 495 258" fill="none" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
        <path d="M 460 258 Q 480 253 500 268" fill="none" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
        <path d="M 470 278 Q 485 263 495 278" fill="none" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" />
      </g>

      <g className="cc-cat-wrapper">
        {/* Back legs (background) */}
        <g className="cc-b-hip" style={{ transformOrigin: '210px 190px', animationDelay: '-0.05s' }}>
          <path d="M 210 190 Q 220 210 215 235" fill="none" stroke="#D1D5DB" strokeWidth="20" strokeLinecap="round" />
          <g className="cc-b-knee" style={{ transformOrigin: '215px 235px', animationDelay: '-0.05s' }}>
            <path d="M 215 235 L 208 275" fill="none" stroke="#D1D5DB" strokeWidth="12" strokeLinecap="round" />
            <ellipse cx="206" cy="275" rx="8" ry="6" fill="#9CA3AF" />
          </g>
        </g>

        <g className="cc-f-shoulder" style={{ transformOrigin: '290px 190px', animationDelay: '-0.05s' }}>
          <path d="M 290 190 L 285 235" fill="none" stroke="#D1D5DB" strokeWidth="14" strokeLinecap="round" />
          <g className="cc-f-elbow" style={{ transformOrigin: '285px 235px', animationDelay: '-0.05s' }}>
            <path d="M 285 235 L 275 270" fill="none" stroke="#D1D5DB" strokeWidth="12" strokeLinecap="round" />
            <ellipse cx="273" cy="270" rx="8" ry="6" fill="#9CA3AF" />
          </g>
        </g>

        {/* Tail */}
        <g className="cc-tail-whip">
          <path d="M 180 180 C 130 160 100 150 70 190" fill="none" stroke="#D1D5DB" strokeWidth="14" strokeLinecap="round" />
        </g>

        {/* Body */}
        <ellipse cx="250" cy="190" rx="72" ry="36" fill="#E5E7EB" />
        <path d="M 185 175 C 220 160 270 160 315 180 C 280 205 220 205 185 175 Z" fill="#9CA3AF" opacity="0.2" />

        {/* Front legs (foreground) */}
        <g className="cc-b-hip" style={{ transformOrigin: '210px 190px' }}>
          <path d="M 210 190 Q 225 210 220 235" fill="none" stroke="#E5E7EB" strokeWidth="22" strokeLinecap="round" />
          <g className="cc-b-knee" style={{ transformOrigin: '220px 235px' }}>
            <path d="M 220 235 L 210 280" fill="none" stroke="#E5E7EB" strokeWidth="14" strokeLinecap="round" />
            <ellipse cx="208" cy="280" rx="9" ry="7" fill="#F3F4F6" />
          </g>
        </g>

        <g className="cc-f-shoulder" style={{ transformOrigin: '290px 190px' }}>
          <path d="M 290 190 L 285 240" fill="none" stroke="#E5E7EB" strokeWidth="16" strokeLinecap="round" />
          <g className="cc-f-elbow" style={{ transformOrigin: '285px 240px' }}>
            <path d="M 285 240 L 280 275" fill="none" stroke="#E5E7EB" strokeWidth="14" strokeLinecap="round" />
            <ellipse cx="278" cy="275" rx="9" ry="7" fill="#F3F4F6" />
          </g>
        </g>

        {/* Head */}
        <g className="cc-head-bob">
          <polygon points="310,135 280,110 325,115" fill="#D1D5DB" />
          <polygon points="330,130 310,95 350,120" fill="#E5E7EB" />
          <polygon points="332,125 315,105 345,120" fill="#FCE7F3" />
          <circle cx="330" cy="160" r="38" fill="#E5E7EB" />
          <path d="M 310 130 Q 340 120 365 145 Q 360 175 330 190 Q 300 165 310 130 Z" fill="#F3F4F6" />
          <ellipse cx="342" cy="152" rx="4" ry="7" fill="#374151" transform="rotate(15 342 152)" />
          <ellipse cx="367" cy="152" rx="4" ry="7" fill="#374151" transform="rotate(15 367 152)" />
          <circle cx="343" cy="150" r="1.5" fill="white" />
          <circle cx="368" cy="150" r="1.5" fill="white" />
          <polygon points="360,165 366,165 363,169" fill="#F472B6" />
          <path d="M 356,172 Q 360,175 363,169 Q 366,175 370,172" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
          <line x1="345" y1="165" x2="305" y2="155" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="345" y1="171" x2="305" y2="175" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}
