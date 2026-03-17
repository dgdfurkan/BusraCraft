<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%">
    <defs>
        <style>
            /* --- 1. ŞİŞ HAREKETLERİ VE FİZİĞİ --- */
            /* Sol Şiş (Sabit Tutan Şiş - Sadece esner ve karşılar) */
            @keyframes leftNeedleYield {
                0%, 100% { transform: rotate(0deg) translate(0, 0); }
                30% { transform: rotate(2deg) translate(-2px, 2px); } /* Sağ şiş girerken hafif esner */
                70% { transform: rotate(-1deg) translate(1px, -1px); } /* İlmek çıkarken yukarı esner */
            }
            .needle-left {
                animation: leftNeedleYield 1.2s infinite ease-in-out;
                transform-origin: 180px 250px;
            }

            /* Sağ Şiş (Aktif Ören Şiş - Dairesel ilmek atma döngüsü) */
            @keyframes rightNeedleKnit {
                0%, 100% { transform: translate(0, 0) rotate(0deg); } /* Başlangıç bekleme */
                20% { transform: translate(-25px, -15px) rotate(-8deg); } /* İlmeğin içine girme */
                40% { transform: translate(-30px, -5px) rotate(-4deg); } /* İpi dolama hareketi */
                70% { transform: translate(15px, 20px) rotate(5deg); } /* Yeni ilmeği çekip çıkarma */
                85% { transform: translate(5px, 10px) rotate(2deg); } /* Geri toparlanma */
            }
            .needle-right {
                animation: rightNeedleKnit 1.2s infinite cubic-bezier(0.4, 0.0, 0.2, 1);
                transform-origin: 420px 250px;
            }

            /* --- 2. ÖRÜLEN KUMAŞIN ESNEKLİĞİ --- */
            /* Kumaş aşağı doğru yerçekimiyle sarkar ve ilmek çekildikçe esner */
            @keyframes fabricBounce {
                0%, 100% { transform: translateY(0) scaleY(1); }
                30% { transform: translateY(-2px) scaleY(0.98); } /* Şiş yukarı kalkarken kumaş toplanır */
                70% { transform: translateY(8px) scaleY(1.05); } /* Yeni ilmek çekilirken aşağı uzar (Stretch) */
            }
            .fabric-group {
                animation: fabricBounce 1.2s infinite ease-in-out;
                transform-origin: 280px 100px;
            }

            /* Kumaşın sağ alt ucu (sağ şişe bağlı olduğu için sağa doğru çekiştirilir) */
            @keyframes fabricPullRight {
                0%, 100% { transform: skewX(0deg); }
                70% { transform: skewX(-5deg); }
            }
            .fabric-mesh {
                animation: fabricPullRight 1.2s infinite ease-in-out;
                transform-origin: 280px 100px;
            }

            /* --- 3. YUMAK FİZİĞİ VE İP GERİLİMİ --- */
            /* Sağ şiş ipi çektiğinde yumak hafifçe zıplar ve döner */
            @keyframes yarnBallTug {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                60% { transform: translateY(0) rotate(0deg); }
                70% { transform: translateY(-8px) translateX(-5px) rotate(-15deg); } /* Temsili ip çekilmesi */
                85% { transform: translateY(2px) translateX(0px) rotate(5deg); } /* Yere düşüş sekmesi */
            }
            .yarn-ball-group {
                animation: yarnBallTug 1.2s infinite cubic-bezier(0.3, 0.8, 0.4, 1);
                transform-origin: 480px 240px;
            }

            /* Yumak zıpladığında altındaki gölge küçülür */
            @keyframes yarnShadowTug {
                0%, 100% { transform: scaleX(1); opacity: 0.8; }
                60% { transform: scaleX(1); opacity: 0.8; }
                70% { transform: scaleX(0.6); opacity: 0.3; }
                85% { transform: scaleX(1.1); opacity: 0.9; }
            }
            .yarn-shadow {
                animation: yarnShadowTug 1.2s infinite cubic-bezier(0.3, 0.8, 0.4, 1);
                transform-origin: 480px 265px;
            }

            /* Sihirli Parıltılar (Üretkenlik / AI İşlemi hissi vermek için) */
            @keyframes sparkleFloat {
                0% { transform: translateY(0) scale(0); opacity: 0; }
                50% { opacity: 1; transform: translateY(-20px) scale(1) rotate(15deg); }
                100% { transform: translateY(-40px) scale(0); opacity: 0; }
            }
            .sparkle { animation: sparkleFloat 2s infinite ease-in; transform-origin: center; }
            .delay-1 { animation-delay: 0.6s; }
            .delay-2 { animation-delay: 1.2s; }
        </style>
    </defs>

    <!-- Şeffaf Arka Plan -->
    <rect width="100%" height="100%" fill="transparent" />

    <!-- Zemin Gölgeleri -->
    <ellipse cx="300" cy="270" rx="140" ry="12" fill="#E5E7EB" opacity="0.6" />
    <ellipse cx="480" cy="265" rx="25" ry="6" fill="#E5E7EB" class="yarn-shadow" />

    <!-- Sihirli Parıltılar (İlmeklerin atıldığı yerin etrafında) -->
    <g fill="#FBCFE8">
        <path d="M 240 70 Q 245 60 255 55 Q 245 50 240 40 Q 235 50 225 55 Q 235 60 240 70 Z" class="sparkle" />
        <path d="M 350 90 Q 353 85 360 82 Q 353 79 350 74 Q 347 79 340 82 Q 347 85 350 90 Z" class="sparkle delay-1" />
        <path d="M 270 40 Q 272 35 277 32 Q 272 29 270 24 Q 268 29 263 32 Q 268 35 270 40 Z" class="sparkle delay-2" />
    </g>

    <!-- ================= İP FİZİĞİ (SMIL Animasyonu) ================= -->
    <!-- Şişten yumağa giden ana iplik. Sağ şişin pozisyonuna göre gerilir veya gevşer. -->
    <path fill="none" stroke="#F472B6" stroke-width="4" stroke-linecap="round">
        <animate attributeName="d" 
                 values="
                    M 310 110 Q 380 200 470 240;  /* 0% - Bekleme: İp kavisli (gevşek) */
                    M 285 95 Q 350 210 470 240;   /* 20% - İleri giriş: Daha da gevşek */
                    M 280 105 Q 360 190 470 240;  /* 40% - Dolama */
                    M 325 130 Q 390 185 465 232;  /* 70% - Çekme! İp tam gergin (düzleşmeye yakın), yumak noktası da kalkıyor */
                    M 310 110 Q 380 200 470 240   /* 100% - Başa dönüş */
                 " 
                 dur="1.2s" repeatCount="indefinite" />
    </path>

    <!-- ================= SOL ŞİŞ (Sabit) VE KUMAŞ ================= -->
    <g class="needle-left">
        <!-- Sol Şiş Gövdesi (Ahşap) -->
        <line x1="180" y1="260" x2="290" y2="100" stroke="#D4A373" stroke-width="8" stroke-linecap="round" />
        <line x1="285" y1="107" x2="300" y2="85" stroke="#D4A373" stroke-width="6" stroke-linecap="round" />
        <!-- Şiş Ucu Parlaması -->
        <line x1="190" y1="245" x2="280" y2="114" stroke="#E6CCB2" stroke-width="2" stroke-linecap="round" />
        <!-- Şiş Topuzu (Pembe) -->
        <circle cx="178" cy="263" r="12" fill="#EC4899" />
        <circle cx="175" cy="260" r="4" fill="#FBCFE8" />

        <!-- Örülen Kumaş (Şişe asılı duruyor) -->
        <g class="fabric-group">
            <g class="fabric-mesh">
                <!-- Kumaş Arka Plan Bloğu -->
                <path d="M 230 140 L 290 100 L 310 170 L 260 210 Z" fill="#FBCFE8" stroke="#F472B6" stroke-width="4" stroke-linejoin="round" />
                
                <!-- İlmek / Örgü Dokusu (Zikzaklar) -->
                <g fill="none" stroke="#EC4899" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                    <!-- Satır 1 (Şişteki aktif ilmekler) -->
                    <path d="M 235 145 L 245 155 L 255 135 L 265 145 L 275 125 L 285 135 L 295 115" />
                    <!-- Satır 2 -->
                    <path d="M 245 165 L 255 175 L 265 155 L 275 165 L 285 145 L 295 155 L 305 135" />
                    <!-- Satır 3 -->
                    <path d="M 255 185 L 265 195 L 275 175 L 285 185 L 295 165 L 305 175 L 315 155" />
                </g>
                
                <!-- Kumaşın Püskülleri / Alt Kenarı -->
                <line x1="260" y1="210" x2="255" y2="225" stroke="#F472B6" stroke-width="4" stroke-linecap="round" />
                <line x1="275" y1="200" x2="270" y2="215" stroke="#F472B6" stroke-width="4" stroke-linecap="round" />
                <line x1="290" y1="190" x2="285" y2="205" stroke="#F472B6" stroke-width="4" stroke-linecap="round" />
                <line x1="305" y1="180" x2="300" y2="195" stroke="#F472B6" stroke-width="4" stroke-linecap="round" />
            </g>
        </g>
    </g>

    <!-- ================= SAĞ ŞİŞ (Hareketli Ören Şiş) ================= -->
    <g class="needle-right">
        <!-- Sağ Şiş Gövdesi (Ahşap) -->
        <line x1="420" y1="260" x2="305" y2="105" stroke="#D4A373" stroke-width="8" stroke-linecap="round" />
        <line x1="310" y1="112" x2="295" y2="92" stroke="#D4A373" stroke-width="6" stroke-linecap="round" />
        <!-- Şiş Ucu Parlaması -->
        <line x1="410" y1="246" x2="310" y2="112" stroke="#E6CCB2" stroke-width="2" stroke-linecap="round" />
        <!-- Şiş Topuzu (Pembe) -->
        <circle cx="422" cy="263" r="12" fill="#EC4899" />
        <circle cx="419" cy="260" r="4" fill="#FBCFE8" />

        <!-- Sağ şişin ucundaki aktif/çekilen ilmek -->
        <path d="M 295 92 Q 315 110 325 105" fill="none" stroke="#F472B6" stroke-width="5" stroke-linecap="round" />
    </g>

    <!-- ================= YUMAK (Sağ Altta) ================= -->
    <g class="yarn-ball-group">
        <!-- Yumağın Kendisi -->
        <circle cx="480" cy="240" r="28" fill="#F472B6" />
        <!-- İp Dokusu (Sarmal Çizgiler) -->
        <path d="M 460 220 Q 480 205 500 230" fill="none" stroke="#EC4899" stroke-width="4" stroke-linecap="round" />
        <path d="M 455 235 Q 480 225 505 245" fill="none" stroke="#EC4899" stroke-width="4" stroke-linecap="round" />
        <path d="M 460 255 Q 480 245 495 260" fill="none" stroke="#EC4899" stroke-width="4" stroke-linecap="round" />
        <path d="M 470 215 Q 460 240 480 265" fill="none" stroke="#DB2777" stroke-width="3" stroke-linecap="round" />
        <path d="M 490 220 Q 480 245 495 260" fill="none" stroke="#DB2777" stroke-width="3" stroke-linecap="round" />
        <!-- Işık/Parlaklık efekti -->
        <path d="M 465 220 Q 475 215 485 218" fill="none" stroke="#FBCFE8" stroke-width="2" stroke-linecap="round" />
    </g>

</svg>