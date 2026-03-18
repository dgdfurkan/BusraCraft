<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="100%">
    <defs>
        <!-- Yün ipi için hacim veren Premium Pembe Gradient -->
        <linearGradient id="yarnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F9A8D4" /> <!-- Açık Pembe (Işık) -->
            <stop offset="50%" stop-color="#EC4899" /> <!-- Ana Pembe -->
            <stop offset="100%" stop-color="#BE185D" /> <!-- Derin Pembe (Gölge) -->
        </linearGradient>

        <!-- Örgü şişi için Gümüş/Metal Gradient -->
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#D1D5DB" />
            <stop offset="40%" stop-color="#F9FAFB" /> <!-- Parlama noktası -->
            <stop offset="100%" stop-color="#9CA3AF" />
        </linearGradient>

        <!-- Derinlik yaratan yumuşak, sıcak gölge (Siyah yerine Koyu Pembe kullanıldı) -->
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="3" stdDeviation="3" flood-color="#9D174D" flood-opacity="0.35" />
        </filter>

        <!-- Ortak Yün Yolları (Kod tekrarını ve karmaşayı önlemek için) -->
        <!-- KATMAN 1: Şişin arkasından dolanan yün parçaları -->
        <path id="back-yarn" d="
            M 20 40 C 15 25, 25 25, 35 25 
            M 35 65 C 15 65, 15 75, 35 75 
            M 35 105 C 15 100, 10 115, 25 115
        " />

        <!-- KATMAN 3: Şişin önünden geçip B harfinin kavislerini oluşturan ana yün -->
        <path id="front-yarn" d="
            M 35 25 C 65 25, 90 25, 90 45 C 90 65, 65 65, 35 65 
            M 35 75 C 65 75, 105 75, 105 95 C 105 115, 65 115, 35 105
        " />
    </defs>

    <!-- ================= KATMAN 1: ARKA YÜN (Şişin arkasından dolaşan kısımlar) ================= -->
    <g stroke-linecap="round" fill="none">
        <!-- Zemin/Derinlik Gölgesi -->
        <use href="#back-yarn" stroke="#9D174D" stroke-width="14" opacity="0.4" transform="translate(1, 2)" />
        
        <!-- Yün Ana Gövde -->
        <use href="#back-yarn" stroke="url(#yarnGrad)" stroke-width="14" />
        
        <!-- Yün Burgu Dokusu (Gerçekçi iplik kıvrımları) -->
        <use href="#back-yarn" stroke="#BE185D" stroke-width="14" stroke-dasharray="2 5" opacity="0.4" />
        
        <!-- 3D Tepe Işığı -->
        <use href="#back-yarn" stroke="#FFFFFF" stroke-width="4" opacity="0.3" transform="translate(-1, -1)" />
    </g>

    <!-- ================= KATMAN 2: GÜMÜŞ ÖRGÜ ŞİŞİ (B Harfinin Omurgası) ================= -->
    <g filter="url(#dropShadow)">
        <!-- Şişin Metal Gövdesi -->
        <rect x="31" y="10" width="8" height="90" fill="url(#metalGrad)" />
        
        <!-- Şişin Sivri Ucu (Alt kısım) -->
        <path d="M 31 100 L 31 108 C 31 113, 34 116, 35 116 C 36 116, 39 113, 39 108 L 39 100 Z" fill="url(#metalGrad)" />
        
        <!-- Şişin Topuzu (Üst kısımdaki tutucu inci) -->
        <circle cx="35" cy="10" r="7" fill="url(#metalGrad)" />
        <!-- İnci Parlaması -->
        <circle cx="33" cy="8" r="2.5" fill="#FFFFFF" opacity="0.8"/>
        
        <!-- Şiş Gövdesi Boyunca İnce Metalik Işık Yansıması -->
        <rect x="33" y="15" width="2" height="85" fill="#FFFFFF" opacity="0.6" />
    </g>

    <!-- ================= KATMAN 3: ÖN YÜN (B Harfinin Kavisleri / Ön Planda) ================= -->
    <!-- Bu katmana dropShadow uygulayarak şişin ve arka katmanın üzerine gölge düşmesini sağlıyoruz -->
    <g stroke-linecap="round" fill="none" filter="url(#dropShadow)">
        <!-- Yün Ana Gövde -->
        <use href="#front-yarn" stroke="url(#yarnGrad)" stroke-width="14" />
        
        <!-- Yün Burgu Dokusu (İplik hissiyatı veren sarmallar) -->
        <use href="#front-yarn" stroke="#BE185D" stroke-width="14" stroke-dasharray="2 5" opacity="0.4" />
        
        <!-- 3D Tepe Işığı (Hacim ve Parlaklık) -->
        <use href="#front-yarn" stroke="#FFFFFF" stroke-width="4" opacity="0.4" transform="translate(-1, -1)" />
    </g>

</svg>