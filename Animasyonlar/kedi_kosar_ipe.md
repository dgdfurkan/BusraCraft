<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%">
    <defs>
        <style>
            /* --- 1. ÇEVRE VE FİZİK EFEKTLERİ --- */
            @keyframes moveGround {
                from { stroke-dashoffset: 0; }
                to { stroke-dashoffset: 150; }
            }
            .ground {
                stroke-dasharray: 40 80;
                animation: moveGround 0.3s infinite linear;
            }
            .ground-fast {
                stroke-dasharray: 20 100;
                animation: moveGround 0.2s infinite linear;
            }

            @keyframes wind {
                0% { transform: translateX(100px); opacity: 0; }
                20% { opacity: 1; }
                80% { opacity: 1; }
                100% { transform: translateX(-700px); opacity: 0; }
            }
            .wind-line { animation: wind infinite linear; }

            @keyframes dustCloud {
                0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
                100% { transform: translate(-80px, -15px) scale(3); opacity: 0; }
            }
            .dust { animation: dustCloud 0.4s infinite ease-out; transform-origin: center; }

            /* --- 2. KEDİ GÖVDE FİZİĞİ (SQUASH & STRETCH) --- */
            /* Gerçekçi koşu döngüsü: Toparlanma, Sıçrama, Esneme, İniş */
            @keyframes catBodyPhysics {
                0%, 100% { transform: translateY(8px) rotate(-3deg) scale(0.9, 1.1); } /* Yere basma, toparlanma */
                25% { transform: translateY(-10px) rotate(5deg) scale(1.0, 1.0); } /* İleri atılma */
                50% { transform: translateY(-22px) rotate(0deg) scale(1.15, 0.85); } /* Havada tam esneme */
                75% { transform: translateY(-5px) rotate(-8deg) scale(1.05, 0.95); } /* Ön patilerle iniş */
            }
            .cat-wrapper {
                animation: catBodyPhysics 0.4s infinite cubic-bezier(0.4, 0.0, 0.6, 1);
                transform-origin: 250px 190px;
            }

            /* --- 3. EKLEMLİ BACAK FİZİĞİ (OMUZ, DİRSEK, KALÇA, DİZ) --- */
            /* Ön Bacak (Omuz) */
            @keyframes shoulderSwing {
                0%, 100% { transform: rotate(-30deg); } /* Geri itiş bitti, kalkıyor */
                25% { transform: rotate(45deg); } /* İleri uzanma */
                50% { transform: rotate(15deg); } /* Yere basma ve ağırlık alma */
                75% { transform: rotate(-45deg); } /* Yeri geriye itme */
            }
            /* Ön Bacak (Dirsek) */
            @keyframes elbowBend {
                0%, 100% { transform: rotate(-50deg); } /* Havada bükük */
                25% { transform: rotate(-5deg); } /* İleri uzanırken düz */
                50% { transform: rotate(10deg); } /* Yere basınca esneme */
                75% { transform: rotate(-20deg); } /* İterken hafif bükük */
            }
            /* Arka Bacak (Kalça) */
            @keyframes hipSwing {
                0%, 100% { transform: rotate(45deg); } /* Gövde altına çekilmiş */
                25% { transform: rotate(10deg); } /* Yere basma */
                50% { transform: rotate(-50deg); } /* Tam güç geriye itme */
                75% { transform: rotate(-10deg); } /* Havaya kalkış */
            }
            /* Arka Bacak (Diz) */
            @keyframes kneeBend {
                0%, 100% { transform: rotate(70deg); } /* İleri çekerken dar açı */
                25% { transform: rotate(20deg); } /* Yere basarken esneme */
                50% { transform: rotate(0deg); } /* İterken tam düz */
                75% { transform: rotate(50deg); } /* Kalkarken bükülme */
            }

            .f-shoulder { animation: shoulderSwing 0.4s infinite linear; }
            .f-elbow { animation: elbowBend 0.4s infinite linear; }
            .b-hip { animation: hipSwing 0.4s infinite linear; }
            .b-knee { animation: kneeBend 0.4s infinite linear; }

            /* --- 4. İKİNCİL HAREKETLER (KAFA VE KUYRUK) --- */
            @keyframes headBalance {
                0%, 100% { transform: rotate(-6deg) translateY(2px); }
                50% { transform: rotate(4deg) translateY(-2px); }
            }
            .head-bob { animation: headBalance 0.4s infinite ease-in-out; transform-origin: 320px 160px; }

            @keyframes tailWhipPhysics {
                0%, 100% { transform: rotate(35deg); } /* Gövde inik, kuyruk kalkık (denge) */
                50% { transform: rotate(-10deg); } /* Gövde havadayken rüzgarda geriye dümdüz */
            }
            .tail-whip { animation: tailWhipPhysics 0.4s infinite ease-in-out; transform-origin: 180px 180px; }

            /* --- 5. İP YUMAĞI VE GÖLGELER --- */
            /* Yumak artık havaya sekmeyip yerde gerçekçi bir şekilde sürüklenip yuvarlanıyor */
            @keyframes yarnRollOnFloor {
                0% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-2px) rotate(180deg); } /* Yerdeki hafif tümsek zıplaması */
                100% { transform: translateY(0) rotate(360deg); }
            }
            .yarn-roll { animation: yarnRollOnFloor 0.3s infinite linear; transform-origin: 480px 263px; }

            @keyframes catShadowPhysics {
                0%, 100% { transform: scaleX(1) scaleY(1); opacity: 0.7; }
                50% { transform: scaleX(1.3) scaleY(0.7); opacity: 0.2; } /* Havadayken gölge yayılır ve silikleşir */
            }
            .cat-shadow { animation: catShadowPhysics 0.4s infinite cubic-bezier(0.4, 0.0, 0.6, 1); transform-origin: 250px 285px; }

        </style>
    </defs>

    <!-- Transparan Arka Plan -->
    <rect width="100%" height="100%" fill="transparent" />

    <!-- Dinamik Zemin ve Toz Efektleri -->
    <line x1="0" y1="285" x2="600" y2="285" stroke="#FCE7F3" stroke-width="5" stroke-linecap="round" class="ground" />
    <line x1="0" y1="295" x2="600" y2="295" stroke="#FCE7F3" stroke-width="3" stroke-linecap="round" opacity="0.6" class="ground-fast" />

    <!-- Koşu Tozu (Particle System) -->
    <g fill="#F3F4F6">
        <circle cx="200" cy="280" r="4" class="dust" style="animation-delay: 0s;" />
        <circle cx="290" cy="285" r="3" class="dust" style="animation-delay: 0.1s;" />
        <circle cx="230" cy="275" r="5" class="dust" style="animation-delay: 0.2s;" />
        <circle cx="310" cy="280" r="4" class="dust" style="animation-delay: 0.3s;" />
    </g>

    <!-- Rüzgar Çizgileri -->
    <g stroke="#FBCFE8" stroke-linecap="round" opacity="0.7">
        <line x1="550" y1="90" x2="650" y2="90" stroke-width="3" class="wind-line" style="animation-duration: 0.4s; animation-delay: 0.1s;" />
        <line x1="600" y1="160" x2="720" y2="160" stroke-width="4" class="wind-line" style="animation-duration: 0.3s; animation-delay: 0.3s;" />
        <line x1="480" y1="220" x2="560" y2="220" stroke-width="5" class="wind-line" style="animation-duration: 0.25s; animation-delay: 0.5s;" />
    </g>

    <!-- Gölgeler -->
    <ellipse cx="250" cy="285" rx="50" ry="6" fill="#E5E7EB" class="cat-shadow" />
    <ellipse cx="480" cy="285" rx="22" ry="4" fill="#E5E7EB" opacity="0.8" /> <!-- Yumağın sabit gölgesi -->

    <!-- İP YUMAĞI VE YERDE SÜRÜKLENEN İPLİK FİZİĞİ -->
    <!-- İplik: Kedinin ağzından başlayıp yere düşen ve yumağa kadar yerde sürüklenen SMIL animasyonlu doğal bezier eğrisi -->
    <path fill="none" stroke="#F472B6" stroke-width="3" stroke-linecap="round">
        <animate attributeName="d" 
                 values="M 330 200 Q 380 285 430 282 L 480 282; 
                         M 330 215 Q 360 270 410 285 L 480 285; 
                         M 330 200 Q 380 285 430 282 L 480 282" 
                 dur="0.4s" repeatCount="indefinite" />
    </path>

    <!-- Yerde Yuvarlanan Yumak (Merkezi tam yere oturur) -->
    <g class="yarn-roll">
        <circle cx="480" cy="263" r="22" fill="#F472B6" />
        <path d="M 465 248 Q 480 238 495 258" fill="none" stroke="#EC4899" stroke-width="3" stroke-linecap="round" />
        <path d="M 460 258 Q 480 253 500 268" fill="none" stroke="#EC4899" stroke-width="3" stroke-linecap="round" />
        <path d="M 470 278 Q 485 263 495 278" fill="none" stroke="#DB2777" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- KEDİ (Fizik tabanlı, eklemli ve esneyen gövde) -->
    <g class="cat-wrapper">
        
        <!-- ================= SOL BACAKLAR (Arka Plan - Zamanlaması hafif kaydırılmış organik görünüm) ================= -->
        <!-- Sol Arka Bacak (Eklemli) -->
        <g class="b-hip" style="transform-origin: 210px 190px; animation-delay: -0.05s;">
            <!-- Kalça/Üst Bacak -->
            <path d="M 210 190 Q 220 210 215 235" fill="none" stroke="#D1D5DB" stroke-width="20" stroke-linecap="round" />
            <g class="b-knee" style="transform-origin: 215px 235px; animation-delay: -0.05s;">
                <!-- Alt Bacak ve Pati -->
                <path d="M 215 235 L 208 275" fill="none" stroke="#D1D5DB" stroke-width="12" stroke-linecap="round" />
                <ellipse cx="206" cy="275" rx="8" ry="6" fill="#9CA3AF" />
            </g>
        </g>
        
        <!-- Sol Ön Bacak (Eklemli) -->
        <g class="f-shoulder" style="transform-origin: 290px 190px; animation-delay: -0.05s;">
            <!-- Omuz/Üst Kol -->
            <path d="M 290 190 L 285 235" fill="none" stroke="#D1D5DB" stroke-width="14" stroke-linecap="round" />
            <g class="f-elbow" style="transform-origin: 285px 235px; animation-delay: -0.05s;">
                <!-- Alt Kol ve Pati -->
                <path d="M 285 235 L 275 270" fill="none" stroke="#D1D5DB" stroke-width="12" stroke-linecap="round" />
                <ellipse cx="273" cy="270" rx="8" ry="6" fill="#9CA3AF" />
            </g>
        </g>

        <!-- ================= KUYRUK VE ANA GÖVDE ================= -->
        <g class="tail-whip">
            <path d="M 180 180 C 130 160 100 150 70 190" fill="none" stroke="#D1D5DB" stroke-width="14" stroke-linecap="round" />
        </g>

        <!-- Ana Gövde -->
        <g id="cat-body">
            <ellipse cx="250" cy="190" rx="72" ry="36" fill="#E5E7EB" />
            <!-- Hız hissini artıran dinamik yan leke -->
            <path d="M 185 175 C 220 160 270 160 315 180 C 280 205 220 205 185 175 Z" fill="#9CA3AF" opacity="0.2" />
        </g>

        <!-- ================= SAĞ BACAKLAR (Ön Plan) ================= -->
        <!-- Sağ Arka Bacak (Eklemli) -->
        <g class="b-hip" style="transform-origin: 210px 190px;">
            <!-- Kalça/Üst Bacak -->
            <path d="M 210 190 Q 225 210 220 235" fill="none" stroke="#E5E7EB" stroke-width="22" stroke-linecap="round" />
            <g class="b-knee" style="transform-origin: 220px 235px;">
                <!-- Alt Bacak ve Pati -->
                <path d="M 220 235 L 210 280" fill="none" stroke="#E5E7EB" stroke-width="14" stroke-linecap="round" />
                <ellipse cx="208" cy="280" rx="9" ry="7" fill="#F3F4F6" />
            </g>
        </g>

        <!-- Sağ Ön Bacak (Eklemli) -->
        <g class="f-shoulder" style="transform-origin: 290px 190px;">
            <!-- Omuz/Üst Kol -->
            <path d="M 290 190 L 285 240" fill="none" stroke="#E5E7EB" stroke-width="16" stroke-linecap="round" />
            <g class="f-elbow" style="transform-origin: 285px 240px;">
                <!-- Alt Kol ve Pati -->
                <path d="M 285 240 L 280 275" fill="none" stroke="#E5E7EB" stroke-width="14" stroke-linecap="round" />
                <ellipse cx="278" cy="275" rx="9" ry="7" fill="#F3F4F6" />
            </g>
        </g>

        <!-- ================= KAFA VE İFADE ================= -->
        <g class="head-bob">
            <!-- Rüzgarda Geri Yatan Aerodinamik Kulaklar -->
            <polygon points="310,135 280,110 325,115" fill="#D1D5DB" />
            <polygon points="330,130 310,95 350,120" fill="#E5E7EB" />
            <polygon points="332,125 315,105 345,120" fill="#FCE7F3" />
            
            <circle cx="330" cy="160" r="38" fill="#E5E7EB" />
            
            <!-- Yüz Lekesi -->
            <path d="M 310 130 Q 340 120 365 145 Q 360 175 330 190 Q 300 165 310 130 Z" fill="#F3F4F6" />
            
            <!-- Avcı Odağındaki Gözler -->
            <ellipse cx="342" cy="152" rx="4" ry="7" fill="#374151" transform="rotate(15 342 152)" />
            <ellipse cx="367" cy="152" rx="4" ry="7" fill="#374151" transform="rotate(15 367 152)" />
            <circle cx="343" cy="150" r="1.5" fill="white" />
            <circle cx="368" cy="150" r="1.5" fill="white" />
            
            <polygon points="360,165 366,165 363,169" fill="#F472B6" />
            <path d="M 356,172 Q 360,175 363,169 Q 366,175 370,172" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round" />
            
            <!-- Rüzgarda Savrulan Bıyıklar -->
            <line x1="345" y1="165" x2="305" y2="155" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" />
            <line x1="345" y1="171" x2="305" y2="175" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" />
        </g>

    </g>

</svg>