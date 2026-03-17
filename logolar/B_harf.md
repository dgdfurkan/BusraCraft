<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
    <defs>
        <!-- Yün ipi için hacim veren Premium Pembe Gradient -->
        <linearGradient id="yarnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F9A8D4" /> <!-- Açık Pembe -->
            <stop offset="50%" stop-color="#EC4899" /> <!-- Ana Pembe -->
            <stop offset="100%" stop-color="#BE185D" /> <!-- Derin Pembe -->
        </linearGradient>

        <!-- Tığ metal gövdesi için Gümüş Gradient -->
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#E5E7EB" />
            <stop offset="50%" stop-color="#F9FAFB" />
            <stop offset="100%" stop-color="#9CA3AF" />
        </linearGradient>

        <!-- Tığ sapı için Mint Gradient -->
        <linearGradient id="mintGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#6EE7B7" />
            <stop offset="50%" stop-color="#34D399" />
            <stop offset="100%" stop-color="#059669" />
        </linearGradient>

        <!-- Derinlik yaratan yumuşak gölge -->
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.15" />
        </filter>
    </defs>

    <!-- Güvenli Alan (Favicon kesilmelerini önlemek için %95 küçültüp merkeze aldık) -->
    <g transform="translate(3, 2) scale(0.95)">

        <!-- ================= 1. TIĞ (B Harfinin Omurgası) ================= -->
        <g filter="url(#dropShadow)">
            <!-- Metal Şaft -->
            <rect x="28" y="24" width="8" height="42" fill="url(#metalGrad)" />
            
            <!-- Tığın Kusursuz Ucu (Çentik detayı ile) -->
            <path d="M 28 24 L 28 12 C 28 4, 36 4, 36 12 L 36 15 C 32 15, 30 17, 34 19 L 36 21 L 36 24 Z" fill="url(#metalGrad)" />
            
            <!-- Silikon Sap (Mint Yeşili) -->
            <rect x="26" y="66" width="12" height="44" rx="6" fill="url(#mintGrad)" />
            
            <!-- Tığ Sapı Tutuş Dokuları (Grip) -->
            <rect x="26" y="76" width="12" height="2" fill="#064E3B" opacity="0.2" />
            <rect x="26" y="82" width="12" height="2" fill="#064E3B" opacity="0.2" />
            <rect x="26" y="88" width="12" height="2" fill="#064E3B" opacity="0.2" />
            
            <!-- 3D Silindir Parlaması (Tığın sol kenarındaki beyaz yansıma) -->
            <rect x="28" y="68" width="2" height="40" rx="1" fill="#FFFFFF" opacity="0.5" />
            <rect x="29" y="10" width="1.5" height="56" fill="#FFFFFF" opacity="0.7" />
        </g>

        <!-- ================= 2. YÜN İPİ (B Harfinin Kıvrımları) ================= -->
        <g filter="url(#dropShadow)">
            <!-- 
                Kusursuz B Formu:
                Tek bir SVG 'path'i ile oluşturulmuş, matematiksel olarak dengeli Bezier eğrileri.
                Pinch (düğüm noktası) tam olarak tığın üzerine (x=42) oturarak formun bütünlüğünü sağlar.
            -->
            <path id="b-yarn" 
                  d="M 18 28 
                     C 32 24, 71 24, 86 35 
                     C 96 45, 80 66, 42 66 
                     C 38 66, 38 68, 42 68 
                     C 80 68, 114 80, 102 100 
                     C 92 116, 56 118, 32 116 
                     C 26 115, 18 112, 18 112" 
                  fill="none" 
                  stroke="url(#yarnGrad)" 
                  stroke-width="16" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" />

            <!-- ================= 3. YÜN DOKUSU VE 3D IŞIK ================= -->
            <!-- 
                Favicon boyutunda kaybolan ama logo boyutunda ipe gerçekçi bir "yün/iplik" 
                hissi veren zarif sarmal çizgiler (dasharray ile yapıldı).
            -->
            <path d="M 18 28 C 32 24, 71 24, 86 35 C 96 45, 80 66, 42 66 C 38 66, 38 68, 42 68 C 80 68, 114 80, 102 100 C 92 116, 56 118, 32 116 C 26 115, 18 112, 18 112" 
                  fill="none" 
                  stroke="#831843" 
                  stroke-width="16" 
                  stroke-dasharray="1 6" 
                  stroke-linecap="round" 
                  opacity="0.15" />

            <!-- İpin tepe kısmına vuran ince, zarif beyaz ışık (Premium hissiyat için) -->
            <path d="M 18 28 C 32 24, 71 24, 86 35 C 96 45, 80 66, 42 66 C 38 66, 38 68, 42 68 C 80 68, 114 80, 102 100 C 92 116, 56 118, 32 116 C 26 115, 18 112, 18 112" 
                  fill="none" 
                  stroke="#FFFFFF" 
                  stroke-width="4" 
                  stroke-linecap="round" 
                  opacity="0.4" 
                  transform="translate(-1.5, -1.5)" />
        </g>
        
    </g>
</svg>