<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
    <defs>
        <!-- Hacim veren Pembe Gradient -->
        <linearGradient id="yarnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F9A8D4" /> <!-- Açık Pembe -->
            <stop offset="100%" stop-color="#EC4899" /> <!-- Ana Pembe -->
        </linearGradient>

        <!-- Kalbin Tığ Üzerindeki Hafif Gölgesi -->
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#BE185D" flood-opacity="0.25" />
        </filter>

        <!-- Yün sarımlarını kalp formunun içinde tutmak için maske (clip-path) -->
        <clipPath id="heartClip">
            <path d="M 60 30 C 60 10, 30 10, 20 30 C 10 50, 30 75, 60 95 C 90 75, 110 50, 100 30 C 90 10, 60 10, 60 30 Z" />
        </clipPath>
    </defs>

    <!-- ================= 1. TIĞ (Crochet Hook) ================= -->
    <!-- Kalbin arkasında çapraz (45 derece) duran tığ -->
    <g transform="rotate(45 60 60)">
        <!-- Metal Gövde -->
        <rect x="56" y="20" width="8" height="50" fill="#E5E7EB" />
        <!-- Kusursuz Tığ Ucu ve Çentiği -->
        <path d="M 56 20 L 56 12 C 56 6, 64 6, 64 12 L 64 13 C 61 13, 59 14, 59 16 C 59 18, 61 19, 64 20 Z" fill="#D1D5DB" />
        
        <!-- Silikon Sap (Mint Yeşili) -->
        <rect x="54" y="70" width="12" height="35" rx="5" fill="#34D399" />
        <!-- Sap Üzerindeki Tutuş Tırtıkları -->
        <rect x="54" y="78" width="12" height="3" fill="#10B981" opacity="0.4" />
        <rect x="54" y="86" width="12" height="3" fill="#10B981" opacity="0.4" />
        <rect x="54" y="94" width="12" height="3" fill="#10B981" opacity="0.4" />
    </g>

    <!-- ================= 2. KALP YÜN YUMAĞI ================= -->
    <!-- Kusursuz oranlara sahip, pofuduk kalp bazı -->
    <path d="M 60 30 C 60 10, 30 10, 20 30 C 10 50, 30 75, 60 95 C 90 75, 110 50, 100 30 C 90 10, 60 10, 60 30 Z" fill="url(#yarnGrad)" filter="url(#shadow)" />

    <!-- Yün Sarım Çizgileri (Kalp sınırları içine hapsedilmiş) -->
    <g clip-path="url(#heartClip)">
        <!-- Işık/Hacim veren beyaz ipler -->
        <path d="M 5 35 Q 60 15 115 45" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.5" />
        <path d="M 10 55 Q 60 35 110 70" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity="0.4" />
        <path d="M 20 75 Q 60 55 100 90" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.5" />
        
        <!-- Derinlik veren koyu pembe ipler -->
        <path d="M 35 5 Q 15 55 55 105" fill="none" stroke="#BE185D" stroke-width="5" stroke-linecap="round" opacity="0.3" />
        <path d="M 60 5 Q 40 55 80 105" fill="none" stroke="#BE185D" stroke-width="4" stroke-linecap="round" opacity="0.4" />
        <path d="M 85 5 Q 65 55 105 105" fill="none" stroke="#BE185D" stroke-width="5" stroke-linecap="round" opacity="0.3" />
    </g>

    <!-- ================= 3. SONSUZLUK İLMEĞİ (Düğüm) ================= -->
    <!-- Kalbin altından zarifçe sarkıp sonsuzluk düğümü oluşturan serbest ip -->
    <path d="M 60 95 C 60 110, 45 110, 45 102 C 45 95, 75 95, 75 102 C 75 110, 60 110, 60 116" fill="none" stroke="url(#yarnGrad)" stroke-width="4.5" stroke-linecap="round" />
</svg>